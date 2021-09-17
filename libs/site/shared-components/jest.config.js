module.exports = {
  displayName: "site-shared-components",
  preset: "../../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../../coverage/libs/site/shared-components",
};
