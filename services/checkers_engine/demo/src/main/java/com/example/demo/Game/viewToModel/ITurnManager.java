package com.example.demo.Game.viewToModel;

/**
 * The interface used to tell the view that the user needs to try a move.
 */
public interface ITurnManager {

    /**
     * @param requestor: The requester used by the view to communicate which move it wishes to try
     */
    void takeTurn(IViewRequestor requestor);

}
