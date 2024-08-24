import express from 'express';
import cors from 'cors';
import db from './lib/database.js';
import algoR from './routes/algo.route.js';
import relicR from './routes/relic.route.js';
import collectorR from './routes/collectors.route.js';
import { isAdmin } from './middleware/auth.middleware.js';
import authR from './routes/auth.route.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: ["https://relics.engelfinedesign.com", "http://localhost:3000"]
}));

app.use('/api/v1/algo', algoR);
app.use('/api/v1/collectors', collectorR);
app.use('/api/v1/relics', isAdmin, relicR);
app.use('/api/v1/auth', authR);

// TODO: Environment based configs
const config = {
    url: process.env.ATLAS_URL,
    database: '[efd]',
    minPoolSize: 3,
    maxPoolSize: 10,
};

db.init(config);

app.listen(port, () => {
   
    console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});