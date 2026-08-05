/**
 * Minimal backend entry point for development
 * Bypasses heavy TypeScript compilation for faster startup
 *
 * Sales Agent chat/voice uses publishable keys from the frontend
 * (NEXT_PUBLIC_SALES_AGENT_*) — no proxy routes needed here.
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'https://alpha-devs-frontend.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
