import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Estilos do componente
const styles = {
  container: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    zIndex: 50,
  },
  expandedContent: {
    backgroundColor: '#274972',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderBottom: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  chatArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    color: 'white',
  },
  message: {
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '4px',
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf: 'flex-start',
  },
  inputArea: {
    display: 'flex',
    padding: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    border: 'none',
    borderRadius: '4px',
    padding: '8px',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  sendButton: {
    marginLeft: '8px',
    padding: '8px 16px',
    backgroundColor: '#1a365d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  button: (isExpanded) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#274972',
    color: 'white',
    transition: 'all 0.3s',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    outline: 'none',
    ...(isExpanded
      ? {
          width: '100%',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          padding: '14px 18px',
          fontSize: '18px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }
      : {
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }),
  }),
};

// Tipo para as mensagens
export default function ChatExpandableTextbox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatAreaRef = useRef(null);

  // Efeito para rolar para o final do chat quando novas mensagens são adicionadas
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Função para enviar mensagem
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setInputValue('');
      // Simular resposta do bot
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Obrigado pela sua mensagem!', isUser: false }]);
      }, 1000);
    }
  };

  return (
    <motion.div
      style={styles.container}
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={{
              expanded: { opacity: 1, height: "400px", width: "300px" },
              collapsed: { opacity: 0, height: 0, width: "76px" }
            }}
            transition={{ duration: 0.3 }}
            style={styles.expandedContent}
          >
            <div ref={chatAreaRef} style={styles.chatArea}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.message,
                    ...(message.isUser ? styles.userMessage : styles.botMessage),
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div style={styles.inputArea}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                style={styles.input}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={styles.button(isExpanded)}
      >
        {isExpanded ? (
          <>
            <span style={{ marginRight: '8px' }}>Fechar</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </motion.div>
  );
}
