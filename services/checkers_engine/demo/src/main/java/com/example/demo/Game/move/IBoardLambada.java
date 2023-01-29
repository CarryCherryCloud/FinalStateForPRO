package com.example.demo.Game.move;


import com.example.demo.Game.board.IBoardModel;

public interface IBoardLambada {

    boolean apply(int i, IBoardModel iboardmodel, Object obj, int j, int k, int l);

    void noApply(int i, IBoardModel iboardmodel, Object obj);
}
