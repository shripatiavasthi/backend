class APIFeatures {
    constructor(query , queryStr){
        this.query= query,
        this.querystr= queryStr
    }
    serch(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {}
        console.log(keyword)
        this.query = this.query.finf({...keyword});
        return this;
    }
}

module.exports = APIFeatures