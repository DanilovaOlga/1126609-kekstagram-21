const path = require(`path`);

module.exports = {
  entry: [
    `./js/helpers.js`,
    `./js/backend.js`,
    `./js/hashtags-validity.js`,
    `./js/comment-validity.js`,
    `./js/filters.js`,
    `./js/gallery.js`,
    `./js/preview.js`,
    `./js/slider.js`,
    `./js/edit-form.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
