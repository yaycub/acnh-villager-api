const Villager = require('../models/Villager.js');

const queryWithRegex = (queryObj, queryParam, queryValue) => ({
  ...queryObj,
  [queryParam]: {
    $regex: new RegExp(queryValue, 'i')
  }
});

const sanitizeSearchQueries = queryObj => {
  let queries = {};
  Object.entries(queryObj).forEach(queryParam => {
    const [key, value] = queryParam;
    if(key === 'gender') queries = { ...queries, [key]: value };
    else queries = queryWithRegex(queries, key, value);
  });

  return queries;
};

const villagerResolver = args => {
  const queries = sanitizeSearchQueries(args);
  return Villager.find(queries).lean();
};

const villagerByIdResolver = ({ _id }) => {
  return Villager.findById(_id).lean();
};

module.exports = {
  villagerResolver,
  villagerByIdResolver
};
