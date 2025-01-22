import app from "./config/app";
import { PORT } from "./constant";

app.get("/", (req, res) => {
  res.send("Welcome to NodeJs App");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
