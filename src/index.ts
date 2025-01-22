import app from "./config/app";
import { PORT } from "./constant";
import { getUserAgent } from "./utils";
import { getIpAddress } from "./utils/getIpAddress";

app.get("/", (req, res) => {
  // In localhost, it will return ::1
  const ip = getIpAddress(req);
  const userAgent = getUserAgent(req);
  const message = "Welcome to the Express TypeScript";

  const data = {
    userAgent,
    message,
    ip,
  };

  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
