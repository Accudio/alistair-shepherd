const SVGO = require('svgo')
const svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true
  }, {
    removeDoctype: true
  }, {
    removeXMLProcInst: true
  }, {
    removeComments: true
  }, {
    removeMetadata: true
  }, {
    removeTitle: true
  }, {
    removeDesc: true
  }, {
    removeUselessDefs: true
  }, {
    removeEditorsNSData: true
  }, {
    removeEmptyAttrs: true
  }, {
    removeHiddenElems: true
  }, {
    removeEmptyText: true
  }, {
    removeEmptyContainers: true
  }, {
    removeViewBox: false
  }, {
    cleanupEnableBackground: true
  }, {
    convertStyleToAttrs: true
  }, {
    convertColors: true
  }, {
    convertPathData: {
      floatPrecision: 1
    }
  }, {
    convertTransform: {
      floatPrecision: 1
    }
  }, {
    removeUnknownsAndDefaults: true
  }, {
    removeNonInheritableGroupAttrs: true
  }, {
    removeUselessStrokeAndFill: true
  }, {
    removeUnusedNS: true
  }, {
    cleanupIDs: true
  }, {
    cleanupNumericValues: {
      floatPrecision: 1
    }
  }, {
    moveElemsAttrsToGroup: true
  }, {
    moveGroupAttrsToElems: true
  }, {
    collapseGroups: true
  }, {
    removeRasterImages: false
  }, {
    mergePaths: true
  }, {
    convertShapeToPath: true
  }, {
    sortAttrs: true
  }, {
    removeDimensions: true
  }, {
    removeAttrs: false
  }, {
    transformsWithOnePath: {
      floatPrecision: 1
    }
  }, {
    cleanupListOfValues: {
      floatPrecision: 1
    }
  }]
})

const WIDTH = 2000
const HEIGHT = 50
const ITERATIONS = 7
const ROUGHNESS = 0.8

// mountain divider
module.exports = async function divider(classes) {
  const segments = Math.pow(2, ITERATIONS)
  const points = line(WIDTH, displaceMap(HEIGHT, HEIGHT / 4, ROUGHNESS, segments))
  const path = convertPath(WIDTH, HEIGHT, points)
  const svg = genSvg(WIDTH, HEIGHT, path)

  const result = await svgo.optimize(svg)

  return `
    <div class="b-divider ${classes}" role="img" aria-hidden="true">
      ${result.data}
    </div>
  `
}

// generate midpoint displacement points
function displaceMap(height, displace, roughness, power) {
  const points = []

  // set initial left point
  points[0] = height / 2 + (Math.random() * displace * 2) - displace

  // set initial right point
  points[power] = height / 2 + (Math.random() * displace * 2) - displace
  displace *= roughness

  // increase number of segments to maximum
  for (let i = 1; i < power; i *= 2) {
    // for each segment, find centre point
    for (let j = (power / i) / 2; j < power; j += power / i) {
      points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2)
      points[j] += (Math.random() * displace * 2) - displace
    }

    // reduce random range
    displace *= roughness
  }

  return points
}

// format points in [x, y] array
function line(width, points) {
  const sep = width / (points.length - 1)
  return points.map((val, i) => ([
    i * sep,
    val
  ]))
}

// convert points into SVG path
function convertPath(width, height, points) {
  // add first M (move) command
  const first = points.shift()
  let path = `M ${first[0]} ${first[1]}`

  // iterate through points adding L (line) commands to path
  points.forEach(val => {
    path += ` L ${val[0]} ${val[1]}`
  })

  // close path
  path += ` L ${width} ${height} L 0 ${height} Z`

  return path
}

// generate SVG from path
function genSvg(width, height, path) {
  return `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="${path}"></path>
    </svg>
  `
}
