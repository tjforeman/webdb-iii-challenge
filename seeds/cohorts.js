
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Web-17'},
        {name: 'Web-18'},
        {name: 'Web-19'}
      ]);
    });
};
