const express = require("express");
require("dotenv").config();

const goalRoutes = require("./routes/goalRoutes");
const { errorHandler } = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/api/goals", goalRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));