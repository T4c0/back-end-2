const express = require("express");
const cors = require("cors");
const controller = require("./controller");
const {getHouses, createHouse, updateHouse, deleteHouse} = controller
const app = express();
const port = 4004; 

//middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all houses
app.get("/api/houses", getHouses);

// Create a house
app.post("/api/houses", createHouse);

// Update a house by ID
app.put("/api/houses/:id", updateHouse);

// Delete a house by ID
app.delete("/api/houses/:id", deleteHouse);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
