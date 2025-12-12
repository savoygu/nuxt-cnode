/**
 * @type {import('stylelint').Config}
 * Stylelint configuration for Vue projects.
 * Extends the recommended rules for Vue from 'stylelint-config-recommended-vue'.
 */
export default {
  extends: ['stylelint-config-recommended-vue'],
  rules: {
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
  },
}
