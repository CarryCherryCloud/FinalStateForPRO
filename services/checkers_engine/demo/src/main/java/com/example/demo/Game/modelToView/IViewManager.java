package com.example.demo.Game.modelToView;

/**
 * Management interface for the view
 */
public interface IViewManager {

    void draw();

    void win(int player);

    /**
     * Resets the view.
     */
    void reset();
}
