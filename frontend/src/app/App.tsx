import { Router } from "./routes";
import { AuthProvider } from "./shared/context";

export const App = () => {
  	return (
        <AuthProvider>
        	<Router />
        </AuthProvider>
  	);
}