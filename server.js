import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

// Static stock data
const manualStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries" },
  { symbol: "TCS", name: "Tata Consultancy Services" },
  { symbol: "INFY", name: "Infosys" },
  { symbol: "HDFCBANK", name: "HDFC Bank" },
  { symbol: "ITC", name: "ITC Limited" },
];

// Helper: Generate historical data up to today's date
const generateHistoricalData = () => {
  const today = new Date();
  const data = [];

  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const price = (Math.random() * (3000 - 2000) + 2000).toFixed(2);

    data.push({ date: date.toISOString().split("T")[0], close: parseFloat(price) });
  }

  return data;
};

// Endpoint to fetch stock symbols
app.get("/api/stocks", (req, res) => {
  res.json(manualStocks);
});

// Endpoint to fetch historical data for a specific stock
app.get("/api/stocks/:symbol/history", (req, res) => {
  const historicalData = generateHistoricalData();
  res.json(historicalData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
