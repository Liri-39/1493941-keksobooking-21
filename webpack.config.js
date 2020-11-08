const path = require(`path`);

module.exports = {
  entry: [
  `./js/utils.js`,
  `./js/filter.js`,
  `./js/load.js`,
  `./js/pin.js`,
  `./js/card.js`,
  `./js/move.js`,
  `./js/map.js`,
  `./js/form.js`,
  `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
