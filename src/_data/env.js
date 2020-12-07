module.exports = {
  IS_DEV: process.env.ELEVENTY_ENV !== 'production',
  year: new Date().getFullYear()
}
