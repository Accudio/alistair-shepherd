module.exports = {
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
}
