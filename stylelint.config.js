module.exports = {
  // stylelint-order：对css属性进行排序的插件工具,先写定位，再写盒模型，再写内容区样式，最后写 CSS3 相关属性
  plugins: ['stylelint-order'],
  // stylelint-config-standard：关于规范、风格约束的规则集
  // stylelint-config-recess-order：社区提供的属性排序的规则集
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  // processors只能作为命令行和Node API使用，PostCss的插件会忽略它们
  processors: [],
  // 定制规则,遇到extends引入的工具包中相同的规则时，它将对其进行覆盖
  rules: {
    'no-empty-source': null,
    'at-rule-name-case': 'lower',
    'at-rule-empty-line-before': 'never',
    'comment-empty-line-before': 'never',
    'selector-combinator-space-before': null,
    'selector-combinator-space-after': null,
    'rule-empty-line-before': null,
    'value-list-comma-newline-before': null,
    'value-list-comma-newline-after': null,
    'block-no-empty': true,
    'no-duplicate-selectors': true,
    'selector-descendant-combinator-no-non-space': null,
    'declaration-colon-space-after': 'always-single-line',
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': null,
    'declaration-colon-newline-after': null,
    'declaration-block-trailing-semicolon': null,
    'declaration-empty-line-before': null,
    'no-eol-whitespace': null,
    indentation: null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'include', 'if', 'else', 'extend', 'for']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          '/^menu/',
          '/^submenu/',
          'theme',
          'childmenubg',
          'sidebarwidth'
        ]
      }
    ]
  }
}
