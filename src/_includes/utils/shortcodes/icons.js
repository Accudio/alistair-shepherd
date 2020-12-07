const TYPES = {
  paint: 'f'
}

// icon formatter
module.exports = function icon(icon, className = '', width = 16, height = 16) {
  const classes = className ? ` ${className}` : ''

  return `
    <div class="b-icon${classes}">
      <svg class="b-icon__svg b-icon__svg--${type(icon)}" width="${width}" height="${height}" role="img">
        <use xlink:href="#${icon}" />
      </svg>
    </div>
  `
}

function type(icon) {
  if (TYPES[icon]) return TYPES[icon]
  return 's'
}
