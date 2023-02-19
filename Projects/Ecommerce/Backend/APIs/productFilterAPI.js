class FilterProductBy{
    constructor(mongooseModel,requestParams){
        this.mongooseModel = mongooseModel;
        this.requestParams = requestParams;
    }

    search(){
        const productName = this.requestParams.name ? {
            name:{
                $regex:this.requestParams.name,
                $options:"i"
            }
        }:{};
        this.mongooseModel = this.mongooseModel.find({...productName});
        return this;
    }

    filter(){
        const queryCopy = {...this.requestParams};
        const filterQuerys = ["name","page","limit"]
        filterQuerys.forEach(key=> delete queryCopy[key])
        if(queryCopy.price != undefined || queryCopy.category != undefined){
            let stringQueries = JSON.stringify(queryCopy);
            stringQueries = stringQueries.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
            this.mongooseModel = this.mongooseModel.find(JSON.parse(stringQueries));
        }
       return this; 
    }

    pagention(itemsPerPage){
        let pageNum = Number(this.requestParams.page) || 1;
        const skipItems = itemsPerPage * (pageNum - 1);
        this.mongooseModel = this.mongooseModel.limit(itemsPerPage).skip(skipItems);
        return this;
    }

}

module.exports = FilterProductBy;