module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  plugins: [
    "html"
  ],
  extends: 'standard',
  rules: {
    "indent": [2, 2],
    "no-tabs": 2,
    "no-new": 0,
    "space-before-function-paren": [2, "never"]
  }
}
