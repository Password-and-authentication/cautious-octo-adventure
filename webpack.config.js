const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        ships: "./src/ships.js",
        board: "./src/board.js",
        player: "./src/Player.js",
        UI: "./src/UI.js",
        game: "./src/game.js"
      },
    output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};