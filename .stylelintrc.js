module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  'plugins': [
    'stylelint-scss'
  ],
  rules: {
    'at-rule-no-vendor-prefix': null,
    'media-feature-name-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'selector-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'function-url-no-scheme-relative': null,
    'number-leading-zero': 'never',
    'selector-list-comma-newline-after': 'always-multi-line',
    'max-nesting-depth': null,
    'selector-max-compound-selectors': null,
    'selector-no-qualifying-type': null,
    'selector-max-id': null,
    'selector-class-pattern': null,
    'scss/at-rule-no-unknown': [
      true,
      { 'ignoreAtRules': ['import-normalize'] }
    ],
    'function-url-quotes': [
      'always',
      { 'except': ['empty'] }
    ],
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        {
          'type': 'at-rule',
          'name': 'extend'
        },
        'declarations',
        'rules'
      ]
    ],
  }
}
