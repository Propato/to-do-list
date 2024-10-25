import { Login } from "../components"
import { Header } from "../components/header/Header"

export const LoggedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Login>
            <Header />
            {children}
        </Login>
    )
}