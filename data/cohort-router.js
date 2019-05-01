const knex=require('knex');
const router = require('express').Router();

 const knexConfig={
client:'sqlite3',
connection:{
filename:'./data/lambda.db3'
},
useNullAsDefault:true,
}

 const db =knex(knexConfig);
 
 router.post('/', (req, res) => {
    if (!req.body.name){
        res.status(400).json({message:'A name is required to add a Cohort'})
    }else{
    db('cohorts')
    .insert(req.body,'id')
    .then(cohort =>{
      res.status(200).json(cohort)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
}
  });

 router.get('/', (req, res) => {
    db('cohorts')
    .then(cohorts=>{
      res.status(200).json(cohorts)
    }).catch(err =>{
      console.log(err)
    })
  });

  router.get('/:id', (req, res) => {
    db('cohorts')
    .where({id:req.params.id})
    .first()
    .then(cohort=>{
      if(cohort){
      res.status(200).json(cohort)
      }else{
        res.status(404).json({message:'the specified Cohort does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  });
  router.get('/:id/students', (req, res) => {
    const cohort_id =req.params.id;
    db('cohorts')
    .join('students','students.cohort_id','cohorts.id')
    .select('students.name')
    .where('cohorts.id', cohort_id)
    .then(students => {
    if (students.length>0) {
       res.status(200).json(students);
    } else {
       res.status(404).json({message:'The specified Cohort does not exist or has no Students'});
        }
      })
    .catch(err => {
      res.status(500).json(err);
      });
  });

   router.put('/:id', (req, res) => {
    if (!req.body.name){
        res.status(400).json({message:'A name is required to edit a Cohort'})
    }else{
    db('cohorts')
    .where({id:req.params.id})
    .update(req.body)
    .then(count=>{
      if (count>0) {
        res.status(200).json({message:`${count} record was updated`})
      }else{
        res.status(404).json({message:'the specified Cohort does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}
  });

   router.delete('/:id', (req, res) => {
    db('cohorts')
    .where({id:req.params.id})
    .del()
    .then(count =>{
      if (count>0){
        res.status(200).json({message:`${count} Cohort was deleted`})
      }else{
        res.status(400).json({message:'the specified Cohort does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  });

 module.exports=router