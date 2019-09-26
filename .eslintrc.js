module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "parser": "babel-eslint",
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": false,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  }
}
