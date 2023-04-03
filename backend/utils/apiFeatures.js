class APIFeatures {
    constructor(query,queryStr){
    this.query = query;
    this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {}
        this.query = this.query.find({...keyword})
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr};
        const removefields = ['keyword', 'limit' ,'page']
        removefields.forEach(el => delete queryCopy[el]);
        this.query = this.query.find(queryCopy)
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }

    populate(args){
        this.query = this.query.populate(args)
    }

}
module.exports = APIFeatures;