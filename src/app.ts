import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Importa ruas
import authRoutes from './routes/auth';
import mascotaRoutes from './routes/mascota';

// Inicializar Variables
const app: Application = express();

// Body parser
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );

//settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/mascota/', mascotaRoutes);
app.use('/auth/', authRoutes);

export default app;