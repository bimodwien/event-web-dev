// import app from "./app";
// import { PORT } from "./config";

// app.listen(PORT, () => {
//   console.log(`app listen on port ${PORT}`);
// });

import { App } from "./app";

const app = new App();

const main = () => app.start();

main();
