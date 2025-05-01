export class ApiFeature {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  filter() {
    let filterObj = structuredClone(this.searchQuery);
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (value) => `$${value}`);
    filterObj = JSON.parse(filterObj);
    const excludeFields = ["page", "sort", "fields", "search"];
    excludeFields.forEach((field) => delete filterObj[field]);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    if (this.searchQuery.sort) {
      let sortedBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);

    }
    return this;
  }

  search() {
    if (this.searchQuery.search) {
      this.mongooseQuery.find({
        title: { $regex: this.searchQuery.search, $options: "i" },
      });
    }
    return this;
  }
}
