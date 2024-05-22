const { client, createTables } = require("./database/db");
const ideaRoutes = require("./routes/ideaRoutes");
const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(
    cors({
        origin: "*", // Allow all origins
        methods: ["GET", "POST", "PUT", "DELETE"], // Allow all methods
        allowedHeaders: "Content-Type, Authorization",
    })
);
// // Use routes
// app.use("/", (req, res) => {
//     res.send("Hello, World!");
// });

// Mount routes
app.use("/api", ideaRoutes);
app.use("/api/auth", userRoutes);

const init = async () => {
    try {
        console.log("connecting to database");
        await client.connect();
        console.log("connected to database");
        // await createTables();
        // console.log("tables created");
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (error) {
        console.error("Error creating tables:", error);
    }
};
init();

//for deployment only
// const path = require("path");
// app.get("/", (req, res) =>
//     res.sendFile(path.join(__dirname, "../client/dist/index.html"))
// );
// app.use(
//     "/assets",
//     express.static(path.join(__dirname, "../client/dist/assets"))
// );
