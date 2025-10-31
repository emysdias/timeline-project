module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleFileExtensions: ["js", "json"],
  testMatch: ["**/?(*.)+(test).[jt]s"],
  transform: {
    "^.+\\.[jt]s$": ["babel-jest", {
      presets: [["@babel/preset-env", { targets: { node: "current" } }]]
    }]
  }
};
