const FALLBACK_WIDTHS = [ 400, 600, 800, 1077, 1500, 2154 ]
const FALLBACK_WIDTH = 1077
const SIZES_PROFILES = {
  full: [
    '(min-width: 70rem) 67.34rem',
    'calc(100vw - 2.66rem)'
  ]
}

const isProd = process.env.ELEVENTY_ENV === 'production'

/**
 * getSrcset
 *
 * take image name and array of widths to generte srcset
 *
 * @param {string}          file
 * @param {array}           widths
 * @param {boolean, number} ratio
 */
function getSrcset(file, widths, ratio = false) {
  const widthsSet = widths || FALLBACK_WIDTHS
  return widthsSet.map(width => {
    return `${formatUrl(file, width, ratio)} ${width}w`
  }).join(', ')
}

/**
 * getSrc
 *
 * take image name and optional width, return URL for use with src
 *
 * @param {string}          file
 * @param {array}           width
 * @param {boolean, number} ratio
 */
function getSrc(file, width = FALLBACK_WIDTH, ratio = false) {
  return formatUrl(file, width, ratio)
}

/**
 * getSizes
 *
 * format sizes array as string for attribute
 *
 * @param {array, string} sizes
 */
function getSizes(sizes) {
  if (typeof sizes === 'string') {
    sizes = SIZES_PROFILES[sizes] || SIZES_PROFILES.full
  }
  return sizes.join(', ')
}

/**
 * formatUrl
 *
 * with image name and image width generate url with image cdn
 *
 * @param {string}          file
 * @param {array}           width
 * @param {boolean, number} ratio
 */
function formatUrl(file, width, ratio) {
  const params = {
    org_if_sml: 1,
    w: width
  }

  // if aspect ratio has been set, add the height based on width
  if (ratio) {
    params.h = width * ratio
  }

  const paramStr = Object.keys(params).map(function(key) {
    return key + '=' + params[key];
  }).join('&');

  // if this is production, use Netlify proxying for
  if (isProd) {
    return `/images/${file}?${paramStr}`
  }

  // in dev, use cloudimage with surge dev url
  return `https://ahqwbmhykq.cloudimg.io/v7/_dev_/${file}?${paramStr}`
}

module.exports = {
  srcset: (file, widths, ratio) => getSrcset(file, widths, ratio),
  src:     (file, width, ratio) => getSrc(file, width, ratio),
  sizes:                (sizes) => getSizes(sizes)
}
