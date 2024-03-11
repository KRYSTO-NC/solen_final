import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import simulationRoutes from './routes/simulationRoutes.js'

const port = process.env.PORT || 5000

const app = express()
connectDB()

// Enable CORS
app.use(cors())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())

// Utilisez process.cwd() pour obtenir le répertoire de travail actuel
const __dirname = process.cwd()

if (process.env.NODE_ENV === 'production') {
  // set static folder
  const buildPath = path.join(__dirname, 'frontend', 'build')
  app.use(express.static(buildPath))

  // Utilisez path.resolve pour construire le chemin complet
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(buildPath, 'index.html')),
  )
} else {
  app.get('/', (req, res) => {
    res.send('SOLEN API is running...')
  })
}

app.use('/api/users', userRoutes)
app.use('/api/simulations', simulationRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
