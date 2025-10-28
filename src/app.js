import express from 'express'

import authRoute from './routes/auth.route.js'
import createHttpError from 'http-errors'
import errorMiddleware from './middlewares/error.middleware.js'
import notFoundMiddleware from './middlewares/notFound.middleware.js'
import shutdown from './utils/shutdown.util.js'

const app = express()

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/post', (req, res)=>{ res.send('post service')})
app.use('/api/comment',(req, res)=>{ res.send('comment service')})
app.use('/api/like',(req, res)=>{ res.send('like service')})
app.use('/api/shutdown', (req, res)=> { 
    res.json({msg: 'ok, shutdown server'})    
    shutdown('SIGTERM')
})

app.use( notFoundMiddleware)

app.use(errorMiddleware)

// Listen for termination signals
process.on('SIGINT', () => shutdown('SIGINT'));   // Ctrl+C
process.on('SIGTERM', () => shutdown('SIGTERM')); // kill command or Docker stop
// Catch unhandled errors
process.on("uncaughtException", ()=>  shutdown('uncaughtException'))
process.on("unhandledRejection", ()=> shutdown('unhandledRejection'))

export default app