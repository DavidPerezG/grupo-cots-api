import express from 'express'
import UsersRoutes from './routes/users.route.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

//Settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/', (req, res) => {
    res.json({ message: "Bienvenido a la aplicacion" })
})

app.use('/api/users', UsersRoutes)

export default app;