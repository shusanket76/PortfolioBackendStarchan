const express = require("express");
const app = express();
const userRoute = require("./routes/user/userRoute.js");
const clothesRoute = require("./routes/clothes/clotheRoute.js");
const designRoute = require("./routes/clothes/designName.js");
const modelingRoute = require("./routes/modeling/modelingRoute.js");
const poetryRoute = require("./routes/poetry/poetry.js");
const natureRoute = require("./routes/nature/natureRoute.js");
const corsOptions = require("./config/corsOptions.js");
const connectdb = require("./config/dbConnect.js");
const cors = require("cors");
// ========================================================================================================

connectdb();
app.use(express.json());
app.use(cors(corsOptions));

// =================================================================================================

app.use("/users", userRoute);
app.use("/clothes", clothesRoute);
app.use("/modeling", modelingRoute);
app.use("/nature", natureRoute);
app.use("/designame", designRoute);
app.use("/poetry", poetryRoute);

// ==========================================================================================================
app.listen(3500, () => {
  console.log("SERVER LISTENING TO 3500");
});

// =================================================================================================
