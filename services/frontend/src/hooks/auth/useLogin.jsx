import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";

import { login } from "../../services/auth.service";
import { useAuthDispatch } from "../../context/AuthProvider";

export default function useLogin() {
    const [loading, setLoading] = createSignal(false);
    const [form, setForm] = createStore({
        email: "a@a.com",
        password: "aA345678",
    });

    const { setCurrentUser } = useAuthDispatch();
    const channel = new BroadcastChannel("auth");
    const navigate = useNavigate();

    const handleInput = (ev) => {
        setForm([ev.currentTarget.name], ev.currentTarget.value);
    };

    const handleForm = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        try {
            const { data } = await login(form);
            setCurrentUser(data.data.username);
            //console.log({ type: "success", message: data.message });
            navigate("/", { replace: true, });
        } catch (error) {
            console.log({ type: "error", message: error.message });
        } finally {
            setLoading(false);
            channel.postMessage("login_success");
        }
    };
    return {
        loading,
        form,
        handleInput,
        handleForm,
    };
}
