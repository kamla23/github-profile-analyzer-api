import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api', profileRoutes);

app.get('/', (req, res) => {
    res.send('GitHub Profile Analyzer API is running (ES Modules)...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});