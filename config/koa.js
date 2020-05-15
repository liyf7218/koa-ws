/**
 * Koa config
 */
import config from './environment'
import fs from 'fs'
// koa-morgan === logger
import morgan from 'koa-morgan'

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + '/access.log',{ flags: 'a' })

export default function(app) {

   // setup the logger
   app.use(morgan('combined', { stream: accessLogStream }))
  
};