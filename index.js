const server= require('./data/server.js')



const port = process.env.PORT || 8000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);