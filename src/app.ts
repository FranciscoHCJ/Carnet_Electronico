import express, { Application } from 'express';
import authRoutes from './routes/auth';
import mascotaRoutes from './routes/mascota';
import morgan from 'morgan';

const app: Application = express();

//settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/mascota/', mascotaRoutes);
app.use('/auth/', authRoutes);

export default app;