const CatchAsyncError = (fxn) => (req,res,next)=>{
    Promise.resolve(fxn(req,res,next)).catch(next)
}
module.exports = CatchAsyncError;