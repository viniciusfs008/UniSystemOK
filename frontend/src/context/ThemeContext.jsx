import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react'

// parte do tema do site
// essa função é responsável por criar o contexto do tema do site
// ela recebe o children, que são os componentes filhos que vão ser renderizados
// ela mantem em cache o tema do site, para que quando a página seja recarregada, o tema continue o mesmo

// cria o contexto do tema
const ThemeContext = createContext({})

export const CustomThemeProvider = ({ children }) => {
    // cria um estado para o tema
    const [theme, setTheme] = useState('dark')

    // função que seta o tema
    const setMode = (mode) => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    }

    // função que alterna o tema
    const toggleTheme = useCallback(() => {
        theme === 'dark' ? setMode('light') : setMode('dark')
    }, [theme])

    // verifica se o tema foi alterado
    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme')
        localTheme && setTheme(localTheme)
    }, [])
    
    return (
        <ThemeContext.Provider value={{theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => useContext(ThemeContext)