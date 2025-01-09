import express from 'express';
import cors from 'cors';
import notificationsRouter from './routes/notifications';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', notificationsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
