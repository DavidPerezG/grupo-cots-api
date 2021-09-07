import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import pkg from '../package.json'

import UsersRoutes from './routes/users.routes'
import DoctorsRoutes from './routes/doctors.routes'
import AuthRoutes from './routes/auth.routes'

import InitialSetup, { createRoles } from './libs/initialSetup'


const app = express();
createRoles();

//Settings
app.set('pkg', pkg);
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/', (req, res) => {
    res.json({ 
        author: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
        message: "Bienvenido a la aplicacion" })
})

app.use('/api/users', UsersRoutes)
app.use('/api/doctors', DoctorsRoutes)
app.use('/api/auth', AuthRoutes)


export default app;