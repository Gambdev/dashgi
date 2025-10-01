import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employees.js';
import userRoutes from './routes/userRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import sprintRoutes from './routes/sprintRoutes.js';

dotenv.config();
const app= express();
const PORT = process.env.PORT || 5000; //Will accesss the enviromental variable "PORT"
const URI = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/dashgi';
app.use(express.json());
app.use(cors());

mongoose.connect(URI)
.then(() => console.log('Conectado a la base de datos Dashgi'))
.catch(err => console.error('Error al conectar a MongoDB', err));


// Aquí van tus rutas
app.get('/', (req, res) => {
  res.send('Yeah, the API is working!');
});


app.get('/index', (req, res) => {
  res.send('Yeah, the API is Indexed');
});


app.use('/api/employees', employeeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sprints', sprintRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});