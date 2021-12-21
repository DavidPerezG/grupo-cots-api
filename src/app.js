import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import pkg from '../package.json'
import cloudinary from 'cloudinary'
import multer from 'multer'
import path from 'path'

import UsersRoutes from './routes/users.routes'
import PatientRoutes from './routes/patients.routes'
import DoctorRoutes from './routes/doctors.routes'
import AdminRoutes from './routes/admins.routes'
import SecretaryRoutes from './routes/secretaries.routes'

import AuthRoutes from './routes/auth.routes'
import CompaniesRoutes from './routes/companies.routes'

import InitialSetup, { createRoles } from './libs/initialSetup'


const app = express();
createRoles();

//Settings
app.set('pkg', pkg);
app.set('port', process.env.PORT || 3000);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename: function(req, file, cb){
        cb(null, Date.now() + file.mimetype.split('/')[1])
    }
})

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(multer({storage: storage}).single('file'));

//Routes
app.get('/', (req, res) => {
    res.json({ 
        author: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
        message: "Bienvenido a la aplicacion" })
})

app.use('/api/users', UsersRoutes)
app.use('/api/users/patients', PatientRoutes)
app.use('/api/users/doctors', DoctorRoutes)
app.use('/api/users/admins', AdminRoutes)
app.use('/api/users/secretaries', SecretaryRoutes)

app.use('/api/auth', AuthRoutes)
app.use('/api/companies', CompaniesRoutes)
//app.use('/api/doctors', DoctorsRoutes)


export default app;