const queryWithRegex = (req, queryParam, queryValue) => ({
  ...req.query,
  [queryParam]: {
    $regex: new RegExp(queryValue, 'i')
  }
});

module.exports = async(req, res, next) => {
  const { 
    name,
    species,
    personality
  } = req.query;

  if(name) req.query = queryWithRegex(req, 'name', name);
  if(species) req.query = queryWithRegex(req, 'species', species);
  if(personality) req.query = queryWithRegex(req, 'personality', personality);


  next();
};
