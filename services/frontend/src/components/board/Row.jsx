import { For } from 'solid-js'

import { Cell } from "./Cell";

export function Row(data) {
    const {row, cells} = data;
    console
    return (
        <div class="row">
            <For each={cells}>
                {(cell, i) => (
                    <Cell piece={cell} row={row} column={i()} />
                )}
            </For>
        </div>
    );
  }