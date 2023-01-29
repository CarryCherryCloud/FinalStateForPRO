import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "@solidjs/router";

import { signup } from "../../services/auth.service";

export default function useSignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = createSignal(false);
    const [form, setForm] = createStore({
        username: "abc",
        email: "a@a.com",
        password: "aA345678",
    });

    const handleInput = (ev) => {
        setForm([ev.currentTarget.name], ev.currentTarget.value);
    };

    const handlePassword = (ev) => {
        let str = ev.currentTarget.value;
        let upValidation = /[A-Z]/g;
        let digValidation = /\d/g;
        let validPassword = false;

        const validation = (msg, testVal) => {
            if (testVal.test(str)) {
                validPassword = true;
                ev.currentTarget.setCustomValidity("");
            } else ev.currentTarget.setCustomValidity(msg);
        };

        validation("Password must contain at least 1 uppercase", upValidation);

        if (validPassword) {
            validPassword = false;
            validation(
                "Password must contain at least 1 numerical value",
                digValidation
            );
        }
        if (validPassword) {
            if (str.length >= 8) {
                validPassword = true;
                ev.currentTarget.setCustomValidity("");
            } else ev.currentTarget.setCustomValidity();
        }

        if (validPassword) {
            setForm([ev.currentTarget.name], ev.currentTarget.value);
        }
    };

    const handleSignUp = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        try {
            const res = await signup(form); 
            console.log(res);
            console.log({ type: "success", message: res.message });
            navigate("/auth/login");
        } catch (error) {
            console.log({ type: "error", message: error });
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        form,
        handleSignUp,
        handleInput,
        handlePassword,
    };
}
