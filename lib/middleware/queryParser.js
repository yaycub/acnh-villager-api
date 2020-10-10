const queryWithRegex = (req, queryParam, queryValue) => ({
  ...req.query,
  [queryParam]: {
    $regex: new RegExp(queryValue, 'i')
  }
});

module.exports = async(req, res, next) => {
  Object.entries(req.query).forEach(queryParam => {
    const [key, value] = queryParam;
    if(key === 'page' || key === 'perPage' || key === 'gender') return;
    req.query = queryWithRegex(req, key, value);
  });

  next();
};
