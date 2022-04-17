module.exports = {
  "habitapp-file": {
    input: "../backend/open-api.yaml",
    output: {
      target: "./src/generated/api.ts",
      client: "react-query",
      mock: true,
    },
  },
};
