import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js',
  output: {
    file: 'dist/natures-law.universal.js',
    format: 'umd',
    name: 'naturesLaw',
    sourcemap: true
  },
  plugins: [babel({
    exclude: 'node_modules/**'
  })]
};
