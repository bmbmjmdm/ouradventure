/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { ReactElement } from 'react';
import './board.css';
import type { BoardProps } from 'boardgame.io/react';
import type { State } from './game'

export const Board = ({
  G,
  ctx,
  moves,
  playerID,
  isActive,
  isMultiplayer,
}:BoardProps<State>) => {

  const onClick = (id:number) => {
    if (isIdActive(id)) {
      moves.clickCell(id);
    }
  };

  const isIdActive = (id:number) => {
    if (!isActive) return false;
    if (G.cells[id] !== null) return false;
    return true;
  }

    let tbody:ReactElement[] = [];
    for (let i = 0; i < 3; i++) {
      let cells:ReactElement[] = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td
            key={id}
            className={isIdActive(id) ? 'active' : ''}
            onClick={() => onClick(id)}
          >
            {G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    let winner:ReactElement|null = null;
    if (ctx.gameover) {
      winner =
        ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {ctx.gameover.winner}</div>
        ) : (
            <div id="winner">Draw!</div>
          );
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
}