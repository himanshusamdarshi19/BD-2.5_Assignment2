const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('static'));

let stocks = [
  {
    title: 'Stock A',
    price: 56000,
    growthRate: 2.4,
    exchange: 'NSE',
    industry: 'Finance',
  },
  {
    title: 'Stock B',
    price: 40000,
    growthRate: 1.4,
    exchange: 'BSE',
    industry: 'Pharma',
  },
  {
    title: 'Stock C',
    price: 97000,
    growthRate: 3.2,
    exchange: 'NSE',
    industry: 'Power',
  },
  {
    title: 'Stock D',
    price: 34000,
    growthRate: 4.11,
    exchange: 'NSE',
    industry: 'Power',
  },
];

function sortLowToHigh(stock1, stock2) {
  return stock1.price - stock2.price;
}

app.get('/stocks/sort/pricing', (req, res) => {
  let stocksCopy = stocks.slice();
  stocksCopy.sort(sortLowToHigh);
  res.json({ stocks: stocksCopy });
});

function sortByRateHighToLow(stock1, stock2) {
  return stock2.growthRate - stock1.growthRate;
}

app.get('/stocks/sort/growth', (req, res) => {
  let stocksCopy = stocks.slice();
  stocksCopy.sort(sortByRateHighToLow);
  res.json({ stocks: stocksCopy });
});

function filterByExchange(stock, exchange) {
  return stock.exchange.toLowerCase() == exchange;
}

app.get('/stocks/filter/exchange', (req, res) => {
  let exchange = req.query.exchange.toLowerCase();
  let result = stocks.filter((stock) => filterByExchange(stock, exchange));
  res.json({ stocks: result });
});

function filterByIndustry(stock, industry) {
  return stock.industry.toLowerCase() == industry.toLowerCase();
}

app.get('/stocks/filter/industry', (req, res) => {
  let industry = req.query.industry.toLowerCase();
  let result = stocks.filter((stock) => filterByIndustry(stock, industry));
  res.json({ stocks: result });
});

app.get('/stocks', (req, res) => {
  res.json({ stocks: stocks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
