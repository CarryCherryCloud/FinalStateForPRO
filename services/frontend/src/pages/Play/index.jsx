import { Match, Switch } from "solid-js";
import { useGameState } from "../../context/GameProvider";

import { JoinGame } from "./JoinGame";
import { Game } from "./Game";

export default function index() {
    const gameState = useGameState();
    return (
        <div>
            <Switch>
                <Match when={!gameState.inGame}>
                    <JoinGame></JoinGame>
                </Match>
                <Match when={gameState.inGame}>
                    <Game></Game>
                </Match>
            </Switch>
        </div>
    );
}

