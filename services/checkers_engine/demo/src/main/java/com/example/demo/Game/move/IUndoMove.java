package com.example.demo.Game.move;

/**
 * This interface encapsulates a command that can undo a move performed by IBoardModel.makeMove().
 */
public interface IUndoMove {

    /**
     * @param undoVisitor : Variant behavior for valid and invalid undo's.
     */
    void apply(IUndoVisitor undoVisitor);

}
