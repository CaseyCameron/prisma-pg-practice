import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import heartbeat from './heartbeat'
import { modesRouter, scalesRouter } from './routes/'
import { handleErrors } from '../utils/handlers/catchErrors';

const routePrefix = '/api/v1'

const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get(routePrefix, heartbeat)
app.use(routePrefix + '/modes', modesRouter)
app.use(routePrefix + '/scales', scalesRouter)
app.use(handleErrors)

export default app
