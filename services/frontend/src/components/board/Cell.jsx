import { useGameDispatch } from "../../context/GameProvider";

export function Cell(data) {
    const { handlePieceClick } = useGameDispatch();
    const {piece, row, column} = data;
    return (
        <div class={`cell cell-${piece}`} >
            <div row={row} column={column} data={piece} onClick={handlePieceClick} class="gamePiece"></div>
        </div>
    );
}