module.exports = {
  mount: {
    src: '/dist',
    public: '/'
  },
  alias: {
    '@': './src',
    'tempe': './src/tempe.js'
  },
  plugins: [
    ['@snowpack/plugin-babel'],
    ['@snowpack/plugin-webpack']
  ]
}