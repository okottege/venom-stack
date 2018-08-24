import express from 'express'
import api from './api'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()
app.set('port', (process.env.PORT || 8081))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', api)
app.use(express.static('static'))

app.use(morgan('dev'))

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  res.json(err)
})

mongoose.connect('mongodb://localhost:27017/global-mantics')
