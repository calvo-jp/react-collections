module.exports = {
  client: {
    service: {
      name: "graphql-app",
      url: "http://localhost:8000/graphql",
    },
    includes: ["./src/**/*.{ts,tsx}"],
    skipSSLValidation: true,
  },
};
