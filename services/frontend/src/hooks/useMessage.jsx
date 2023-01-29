import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useGameDispatch } from "../context/GameProvider";

export default function useMessage() {
    const { sendMessage } = useGameDispatch();
    const [loading, setLoading] = createSignal(false);
    const [form, setForm] = createStore({
        message: "",
    });

    const handleInput = (ev) => {
        setForm([ev.currentTarget.name], ev.currentTarget.value);
    };

    const handleForm = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        try {
            sendMessage(form);
            setForm("message", "");
        } catch (error) {
            console.log({ type: "error", message: error });
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        handleInput,
        handleForm,
    };
}
