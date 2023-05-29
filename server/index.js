const express = require("express");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

app.put('/api/humidity/:id', async (req, res) => {
  const { id } = req.params;
  const { hum } = req.body;
  const humidity = await prisma.humidity.update({
    where: { id: Number(id) },
    data: { hum },
  });
  res.json(humidity);
});

app.put('/api/temperature/:id', async (req, res) => {
  const { id } = req.params;
  const { temp } = req.body;
  const temperature = await prisma.temperature.update({
    where: { id: Number(id) },
    data: { temp },
  });
  res.json(temperature);
});

app.get('/api/humidity/:id', async (req, res) => {
  const { id } = req.params;
  const humidity = await prisma.humidity.findUnique({
    where: { id: Number(id) },
  });
  res.json(humidity);
});

app.get('/api/temperature/:id', async (req, res) => {
  const { id } = req.params;
  const temperature = await prisma.temperature.findUnique({
    where: { id: Number(id) },
  });
  res.json(temperature);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});