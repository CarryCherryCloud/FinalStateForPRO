import { For } from 'solid-js'

import { useGameState } from "../../context/GameProvider";
import { Row } from "./Row";

export default function index() {
    const gameState = useGameState();
    return (
        <div class="game-board">
            <div class={gameState.activePlayer}>
                <For each={gameState.board}>
                    {(row, i) => (
                        <Row cells={row} row={i()}/>
                    )}
                </For>
            </div>
            {/* <button onClick={reset}>Reset</button> */}
        </div>
    );
}
