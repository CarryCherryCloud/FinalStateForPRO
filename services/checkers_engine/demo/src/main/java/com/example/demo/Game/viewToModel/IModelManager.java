package com.example.demo.Game.viewToModel;

import java.util.List;

/**
 * Management interface for the model
 */
public interface IModelManager {

    /**
     * Resets the model to its startup defaults.
     */
    void reset();

    /**
     * Halts the game after the current turn is completed.
     */
    void exit();

    /**
     * @return Returns a list of Objects that the view can use for selecting which type of player to be used.
     * The toString() methods of the Objects will return a String description of the type of player.
     */
    List<Object> getPlayers();

    /**
     * Used by the view's adapter to inform the model
     * which players were selected from the set of
     * possible players supplied by the getPlayers() method.
     *
     * @param player1 :  The player that plays first.
     * @param player2 : The player that plays second.
     */
    void setPlayers(Object player1, Object player2);
}
