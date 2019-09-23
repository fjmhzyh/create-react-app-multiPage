// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
 "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    "eqeqeq": 0,  // 不允许使用2个等号
    'semi': 0,
    'space-infix-ops': 0,
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid':'off',

  }
}
