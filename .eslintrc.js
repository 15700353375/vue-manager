module.exports = {
  root: true,
  env: {
      "browser": true,
      "commonjs": true,
      "es6": true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  plugins: [
    'html'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
      // ECMAScript 版本
      // "ecmaVersion": 6,
      // "sourceType":"script",//module
      // // 想使用的额外的语言特性:
      // "ecmaFeatures":  {
      // // 允许在全局作用域下使用 return 语句
      // "globalReturn":true,
      // // impliedStric
      // "impliedStrict":true,
      // // 启用 JSX
      // "jsx":true
      // }
  },
  // off或0–关闭规则
  // warn或1–开启规则，警告级别(不会导致程序退出)
  // error或2–开启规则，错误级别(当被触发的时候，程序会退出)
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 禁止在计算属性中对属性修改, 是具体情况而定，有时候可能会用到，列为warn；
    'vue/no-side-effects-in-computed-properties': 'off',

    // 计算属性必须有返回值
    'vue/return-in-computed-property': 'off',

    "eol-last": "off",

    // 始终使用 === 替代 ==
    'eqeqeq': 'off',

    // 对于变量和函数名统一使用驼峰命名法。
    'camelcase': 'off',

    // 使用浏览器全局变量时加上 window. 前缀
    'no-undef': 'off',

    // 禁止不必要的转义
    'no-useless-escape': 'off',

    'no-trailing-spaces': 'off',

    // 忽略某些不常规的闭合标签报错
    "vue/no-parsing-error":
    [
        2,
        { "x-invalid-end-tag": false }
    ]

      // "indent": [
      //     "error",
      //     "tab"
      // ],
      // "linebreak-style": [
      //     "error",
      //     "unix"
      // ],
      // "quotes": [
      //     "error",
      //     "double"
      // ],
      // "semi": [
      //     "error",
      //     "always"
      // ],

  }
};
