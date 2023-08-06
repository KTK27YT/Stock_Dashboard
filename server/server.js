const express = require('express');
const app = express();


app.get("/api", (req, res) => {
    res.json({ "users": ["user1", "user2"] });
})

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});