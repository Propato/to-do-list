import { Login } from "../components"
import { AuthProvider } from "../context"

export const LoggedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            <Login>
                {/* <Navbar /> */}
                    {children}
                {/* <Footer /> */}
            </Login>
        </AuthProvider>
    )
}