import express from 'express';
import cors from 'cors';
import healthRoute from './routes/health.js';
import apiRoute from './routes/api.js';
import agentRoute from './routes/agent.js'; // 👈 New import

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/health', healthRoute);
app.use('/api', apiRoute);
app.use('/agent', agentRoute); // 👈 New route

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
