import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`app listen on port ${PORT}`);
});
