
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'John Doe',cohort_id:1},
        {name: 'Jane Doe',cohort_id:2},
        {name: 'Jim smith',cohort_id:3},
        {name: 'Susan smith',cohort_id:3},
        {name: 'Sally Johnson',cohort_id:2},
        {name: 'Frodo Baggins',cohort_id:1}
      ]);
    });
};
