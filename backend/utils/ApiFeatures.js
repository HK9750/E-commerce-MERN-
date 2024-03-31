class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  getFilteredProductsCount() {
    const countQuery = this.query.model.countDocuments(this.query._conditions);
    return countQuery.exec();
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };

    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((key) => delete queryStrCopy[key]);

    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(productsPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = productsPerPage * (currentPage - 1);
    this.query = this.query.limit(productsPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
