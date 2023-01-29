import { onMount } from "solid-js";
import { Outlet, useNavigate } from "@solidjs/router";
import { useAuthState } from "../context/AuthProvider";

export default function AuthLayout() {
    const authState = useAuthState();
    const navigate = useNavigate();

    onMount(() => {
        if (authState.isAuthenticated) {
            navigate("/");
        }
    });

    return (
        <div class="container-auth">
            <main class="wrap-auth">
                <Outlet />
            </main>
        </div>
    );
}
