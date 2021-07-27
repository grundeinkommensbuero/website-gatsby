module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/__jest__/jest-preprocess.js`,
    '^.+\\.svg$': '<rootDir>/__jest__/svgTransform.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/__jest__/loadershim.js`],
};
