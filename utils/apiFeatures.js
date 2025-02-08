const generateQuery = (queryString) => {
  //1. Excluding
  const queryObj = { ...queryString };

  const excludedField = ["page", "limit", "sort"];
  excludedField.forEach((el) => delete queryObj[el]);

  //2. Generate Query
  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  return JSON.parse(queryStr);
};

class APIFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }

  filter() {
    this.query = this.query.find(generateQuery(this.queryString));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
