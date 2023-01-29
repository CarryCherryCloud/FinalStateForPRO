import useCreateGame from "../../hooks/useCreateGame";

export function JoinGame() {
    const {
        form,
        handleInput,
        handleForm,
        loading,
    } = useCreateGame();

    return (
        <section>
            <form onSubmit={handleForm}>
                <div>
                    <label>roomID:</label>
                    <input
                        name="id"
                        type="text"
                        value={form.id}
                        onInput={[handleInput]}
                        required
                    />
                </div>
                <button type="submit" disabled={loading()}>
                <Show when={!loading()} fallback={<span>Pleace wait..</span>}>
                    Join Game
                </Show>
                </button>
            </form>
        </section>
    );
}

