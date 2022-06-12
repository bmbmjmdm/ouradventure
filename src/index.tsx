/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import { render } from "react-dom";
import { Client as ClientInterface } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Game } from "./game";
import { Board } from "./board";

const Client = ClientInterface({
  game: Game,
  board: Board,
  debug: false,
  multiplayer: SocketIO({ server: "localhost:8000" })
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <Client playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
