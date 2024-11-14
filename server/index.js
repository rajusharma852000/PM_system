const express = require('express');
const cors = require('cors');
const db = require('./DBconnect');
const userRoute = require('./routes/userRoute.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
// Define your routes here

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
