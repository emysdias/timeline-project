module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleFileExtensions: ["js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/tests/__mocks__/styleMock.js"
  },
  testMatch: ["**/?(*.)+(test).[jt]s"],
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", {
      presets: [["@babel/preset-env", { targets: { node: "current" } }], ["@babel/preset-react", { runtime: "automatic" }]]
    }]
  }
};
