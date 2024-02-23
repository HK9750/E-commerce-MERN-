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
  filter() {
    const queryStrCopy = { ...this.queryStr };

    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((key) => delete queryStrCopy[key]);
    this.query = this.query.find(queryStrCopy);
    return this;
  }
  pagination() {}
}

export default ApiFeatures;
