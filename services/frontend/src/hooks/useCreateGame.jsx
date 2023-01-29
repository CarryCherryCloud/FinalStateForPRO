import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useGameDispatch } from "../context/GameProvider";

export default function useCreateGame() {
    const [loading, setLoading] = createSignal(false);
    const { joinRoom } = useGameDispatch();
    const [form, setForm] = createStore({
        id: "",
    });

    const handleInput = (ev) => {
        setForm([ev.currentTarget.name], ev.currentTarget.value);
    };

    const handleForm = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        try {
            await joinRoom(form);
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
