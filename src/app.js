import express from 'express';
import { connectDatabase } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import './config/env.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase();
});