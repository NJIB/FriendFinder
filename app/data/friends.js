// ============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ============================================================================

const friendDetails = [
  {
    your_name: 'Adam',
    photo_link: '#',
    q1: '0',
    q2: '0',
    q3: '0',
    q4: '0',
    q5: '0',
    q6: '0',
    q7: '0',
    q8: '0',
    q9: '0',
    q10: '0',
  },
];

/**
 * @module tableData
 * Note how we export the array.
 * This makes it accessible to other files using require.
 */
module.exports = friendDetails;
