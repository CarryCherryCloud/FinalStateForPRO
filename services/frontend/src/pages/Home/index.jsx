import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import { useAuthState } from "../../context/AuthProvider";

export default function index() {
    const authState = useAuthState();
    return (
        <div>
            {
                authState.isAuthenticated ? (<p>Logged in</p>) :
                (<p>Not logged in</p>)
            }
        </div>
    );
}

