// icon formatter
module.exports = function icon(icon, className = '', width = 16, height = 16) {
  const classes = className ? ` ${className}` : ''

  return `
    <span class="b-icon${classes}" aria-hidden="true">
      <svg class="b-icon__svg" width="${width}" height="${height}">
        <use xlink:href="#${icon}" />
      </svg>
    </span>
  `
}
