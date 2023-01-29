import { useGameState, useGameDispatch } from "../../context/GameProvider";
import useMessage from "../../hooks/useMessage";

import Board from "../../components/board";

export function Game() {
    const gameState = useGameState();
    const { leaveRoom } = useGameDispatch();
    const { form, handleInput, handleForm } = useMessage();

    return (
        <section>
            <div>
                <h1>Room {gameState.roomID}</h1>
                <button onClick={leaveRoom}>
                    <span>Leave room</span>
                </button>
            </div>
            <div class="game-container">
                <Board/>
                <div class="game-chat">
                    <div class="game-messages">
                        <For each={gameState.messages}>{(message, i) =>
                            <div>
                                <span class={message.oponent ? "game-message-oponent" : "game-message"}>{message.username}:</span> {message.message}
                            </div>
                        }
                        </For>
                    </div>
                    <div class="game-message-input">
                        <form onSubmit={handleForm}>
                            <input
                                name="message"
                                type="text"
                                value={form.message}
                                onInput={[handleInput]}
                                required
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>

            </div>


        </section>
    );
}

