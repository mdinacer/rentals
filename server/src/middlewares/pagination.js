const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

module.exports = function (req, res, next) {
  const currentPage = Math.abs(req.query.pageNumber) || DEFAULT_PAGE_NUMBER;
  const pageSize = Math.abs(req.query.pageSize) || DEFAULT_PAGE_SIZE;
  //const skipIndex = (currentPage - 1) * pageSize;
  const totalCount = res.count || 10;
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log('Middleware First');
  res.setHeader(
    'Pagination',
    JSON.stringify({
      currentPage,
      pageSize,
      totalCount,
      totalPages,
    })
  );

  next();
};
