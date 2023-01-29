package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Arrays;
import java.util.Map;

@Controller
public class MockController {



    int[][] cells = new int[6][8];
    String player = "red";

//localhost:9001/initialize
    @PostMapping(value = "/initialize", produces = "application/json")
    public ResponseEntity<Map<String,int[][]>> initialize() {
        for (int[] cell : cells) {
            Arrays.fill(cell, 0);
        }

        cells[2][3] = 1;
        cells[3][3] = -1;
        cells[3][4] = 1;
        cells[4][4] = -1;

        return ResponseEntity.ok(Map.of(player, cells));
    }
//localhost:9001/move/1/1/2/2/3
    @PostMapping("/move/{x_from}/{y_from}/{x_to}/{y_to}/{sessionID}")
    public ResponseEntity<Map<String, int[][]>> move(@PathVariable int x_from,
                                                     @PathVariable int y_from, @PathVariable int x_to,
                                                     @PathVariable int y_to, @PathVariable int sessionID) {
        cells[x_to][y_to] = cells[x_from][y_from];
        cells[x_from][y_from] = 0;
        player = player.equals("red") ? "blue" : "red";
        return ResponseEntity.ok(Map.of(player, cells));
    }

}
