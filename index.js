const server = require("./api/server.js");

const PORT = process.env.NODE_ENV || 5678;

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
