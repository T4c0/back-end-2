/// Variables ///
const houses = require("./db.json");
let id = 4;

// Function to get all houses
function getHouses(req, res) {
  res.send(houses);
  console.log("hit server");
}

// Function to delete a house by ID
const deleteHouse = (req, res) => {
  const { id } = req.params;
  console.log(id);

  const i = houses.findIndex((house) => house.id === +id);
  if (i >= 0) {
    houses.splice(i, 1);
    res.status(200).send(houses);
    console.log(`house id:${id} deleted`);
    return;
  }
  res.status(404).send("house not found");
  console.log(`house id:${id} requested deletion failed: house not found`);
};

// Function to create a new house
function createHouse(req, res) {
  const { address, price, imageURL } = req.body;
  const newHouse = {
    id: id,
    address: address,
    price: price,
    imageURL: imageURL,
  };
  houses.push(newHouse);
  res.status(200).send(houses);
  id++;
}

// Function to update a house by ID
function updateHouse(req, res) {
  let { id } = req.params;
  let { type } = req.body;
  let index = houses.findIndex((house) => +house.id === +id);

  if (houses[index].price <= 10000 && type === "minus") {
    houses[index].price = 0;
    res.status(200).send(houses);
  } else if (type === "plus") {
    houses[index].price += 10000;
    res.status(200).send(houses);
  } else if (type === "minus") {
    houses[index].price -= 10000;
    res.status(200).send(houses);
  } else {
    res.sendStatus(400);
  }
}

module.exports = {
  getHouses,
  deleteHouse,
  createHouse,
  updateHouse,
};
