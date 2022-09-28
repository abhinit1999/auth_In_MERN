const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("./config/conndb")
const userRoutes = require("./routes/userRoutes")



dotenv.config();

const app = express();
// cors
app.use(cors());
// json
app.use(express.json());


// Load Routes

app.use("/api/user",userRoutes)


// 
const port = process.env.PORT || 4200;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`server runing at: ${port}`));
