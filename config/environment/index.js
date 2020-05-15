import path from 'path'
import _ from 'lodash'

// Base config
let base = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  ip: 'localhost',
  port: process.env.PORT || 9001,
  logType : 'dev'
};


// Overide base config with environment
export default _.merge(base, require('./' + (process.env.NODE_ENV || 'development') + '.js') || {});