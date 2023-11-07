import { GET, POST } from "./src/app/api/posts/route";

const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
