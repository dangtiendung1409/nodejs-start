const express = require('express');
const songRouter = require("./routes/SongRoutes"); 
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use("/api/songs", songRouter); 
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Song" 

).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

module.exports = app;
