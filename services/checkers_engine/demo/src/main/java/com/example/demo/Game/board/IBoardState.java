package com.example.demo.Game.board;


import com.example.demo.Game.move.IBoardLambada;
import com.example.demo.Game.move.IBoardStatusVisitor;

public interface IBoardState {

    void map(int i, IBoardLambada iboardlambda, Object obj, IBoardModel iboardmodel);

    Object execute(IBoardStatusVisitor iboardstatusvisitor, Object obj, IBoardModel iboardmodel);
}
