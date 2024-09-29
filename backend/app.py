import os
import openai
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api_key = os.getenv("OPENAI_API_KEY")

# Configure sua chave de API da OpenAI
openai.api_key = api_key

# Função para enviar prompts para o ChatGPT em português
def chatgpt_query(prompt):
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

# Função para gerar insights com base no dataframe
def generate_insights(df):
    prompt = f"Aqui estão os dados da planilha sobre as despesas dos postos de saúde do município: {df.head().to_string()}\n\nForneça insights valiosos sobre esses dados e pontue o que você achar importante. Remova a primeira frase onde voçê diz que vai fazer o que eu pedi. Nos titulos dos tópicos coloque markdowns menores."
    insights = chatgpt_query(prompt)
    return insights

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     os.makedirs('uploads', exist_ok=True)  # Cria o diretório uploads se não existir

#     if 'file' not in request.files:
#         return jsonify({'error': 'Nenhum arquivo enviado'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'Nome de arquivo inválido'}), 400

#     if file:
#         file_path = os.path.join('uploads', file.filename)
#         file.save(file_path)

#         # Chama as funções de geração de insights
#         if file_path.endswith('.csv'):
#             dataSet = pd.read_csv(file_path)
#         elif file_path.endswith('.xlsx'):
#             dataSet = pd.read_excel(file_path)
#         else:
#             return jsonify({'error': 'Formato de arquivo inválido'}), 400
        
#         insights = generate_insights(dataSet)
        
#         return jsonify({'message': 'Arquivo enviado com sucesso', 'insights': insights}), 200

# @app.route('/question', methods=['POST'])
# def question():
    # query = request.get_json()
    # pergunta = query.get('question', '')

    # if rag_chain is None:
    #     return jsonify({"error": "RAG chain not initialized"}), 500

    # if pergunta:
    #     with open("pergunta.txt", "w") as text_file:
    #         text_file.write(pergunta)
    #     try:
    #         response = rag_chain.invoke(pergunta)
    #     except Exception as e:
    #         return jsonify({"error": f"Erro ao invocar RAG chain: {str(e)}"}), 500
    #     return jsonify(response)
    # else:
    #     return jsonify({"error": "Pergunta não fornecida"}), 400

@app.route("/dashboard/<tipo>", methods=["GET"])
def dashboard(tipo):
    if tipo == "almoxarifado":
        data = pd.read_csv("dados/Almoxarifado.csv")
        data = data.where(pd.notnull(data), "N/A")
        insights = generate_insights(data)
    elif tipo == "despesas":
        data = pd.read_csv("dados/Despesas.csv")
        data = data.where(pd.notnull(data), "N/A")
        insights = generate_insights(data)
    elif tipo == "rh":
        data = pd.read_csv("dados/Rh.csv")
        data = data.where(pd.notnull(data), "N/A")
        insights = generate_insights(data)
    else:
        return jsonify({"error": "Tipo inválido"}), 400
    
    return jsonify({
        "data": data.to_dict(orient="records"),
        "insight": insights,
    })

if __name__ == '__main__':
    app.run(debug=True)