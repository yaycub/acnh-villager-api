const queryWithRegex = (req, queryParam, queryValue) => ({
  ...req.query,
  [queryParam]: {
    $regex: new RegExp(queryValue, 'i')
  }
});

module.exports = async(req, res, next) => {
  Object.entries(req.query).forEach(queryParam => {
    if(queryParam[0] === 'page' || queryParam[0] === 'perPage' || queryParam[0] === 'gender') return;
    req.query = queryWithRegex(req, queryParam[0], queryParam[1]);
  });

  next();
};
