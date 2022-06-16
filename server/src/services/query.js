const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 0;

function getPagination(query) {
  const page = Math.abs(query.pageNumber) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.pageSize) || DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
