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
        res.status(400).json({message:'A name is required to add a Student'})
    }else{
    db('students')
    .insert(req.body,'id')
    .then(newStudent =>{
      res.status(200).json(newStudent)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
}
  });

 router.get('/', (req, res) => {
    db('students')
    .then(students=>{
      res.status(200).json(students)
    }).catch(err =>{
      console.log(err)
    })
  });
  router.get('/:id', (req, res) => {
      const id =req.params.id
    db('students')
    .join('cohorts','students.cohort_id','cohorts.id',)
    .select('students.id','students.name', {cohort:'cohorts.name'})
    .where('students.id', id)
    .then(student=>{
      if(student){
      res.status(200).json(student)
      }else{
        res.status(404).json({message:'the specified Student does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  });

  router.put('/:id', (req, res) => {
    if (!req.body.name){
        res.status(400).json({message:'A name is required to edit a Student'})
    }else{
    db('students')
    .where({id:req.params.id})
    .update(req.body)
    .then(count=>{
      if (count>0) {
        res.status(200).json({message:`${count} record was updated`})
      }else{
        res.status(404).json({message:'the specified Student does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
}
  });

   router.delete('/:id', (req, res) => {
    db('students')
    .where({id:req.params.id})
    .del()
    .then(count =>{
      if (count>0){
        res.status(200).json({message:`${count} Student was deleted`})
      }else{
        res.status(400).json({message:'the specified Student does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  });


 module.exports=router