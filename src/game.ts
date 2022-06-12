/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
import type { Game as GameInterface, Move } from "boardgame.io";

export interface State {
  cells: Array<number>
}

function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const isRowComplete = row => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

const clickCell:Move<State> = (G:State, ctx, id:number) => {
  if (G.cells[id] === null) {
    G.cells[id] = ctx.currentPlayer;
  }
}

export const Game: GameInterface<State> = {
  name: "our-adventure",

  setup: () => ({
    cells: Array(9).fill(null)
  }),

  moves: {
    clickCell
  },

  turn: { moveLimit: 1 },

  endIf: (G:State, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (G.cells.filter(c => c === null).length === 0) {
      return { draw: true };
    }
  }
};
