const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const products = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 1299,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 1099,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "MacBook Air M2",
    price: 1899,
    image: "https://via.placeholder.com/150"
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
