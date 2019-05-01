const express= require('express');
const helmet=require('helmet');
const server = express();

const cohortRouter=require('./cohort-router.js')


server.use(helmet());
server.use(express.json());

server.use('/api/cohorts',cohortRouter)

module.exports=server