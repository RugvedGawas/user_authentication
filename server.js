const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`) );

