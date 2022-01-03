// http://eslint.org/docs/user-guide/configuring

module.exports = {
  globals: {
    $: true,
    jQuery: true,
    Signature: true,
    $workflow: true
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    jquery: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    indent: ['off', 2],
    semi: ['error', 'never'], //语句强制分号结尾
    'array-bracket-spacing': ['error', 'never'], //是否允许非空数组里面有多余的空格
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    'no-trailing-spaces': 1, //一行结束后面不要有空格
    'spaced-comment': 0, //注释风格要不要有空格什么的
    eqeqeq: [2, 'allow-null'], // 使用 === 替代 == allow-null允许null和undefined==
    'no-unused-vars': 0 //不能有声明后未被使用的变量或参数
  },

  settings: {
    'eslint-plugin-disable': {
      paths: {
        angular: ['**/libs/**/*.js', '**/libs/**/*.jsx']
      }
    }
  }
};
