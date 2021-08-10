
const mongoose = require("mongoose");



module.exports = (app)=>{
    
    mongoose.connect("mongodb://localhost/voting-system",{useNewUrlParser:true,useUnifiedTopology:true})

    .then(()=>{
        app.listen(5000,()=> console.log("Serving at port : 5000"))
    })
    .catch(err=>{
       
        console.log(err)
    });
}



