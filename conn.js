
const mongoose = require("mongoose");

const dbPass = process.env.MONGODB_PASSWORD
const dbUser = process.env.MONGODB_USERNAME
const dbName = process.env.MONGODB_NAME


const remoteDbURL = `mongodb+srv://${dbUser}:${dbPass}@cluster0.gqtmu.mongodb.net/${dbName}?retryWrites=true&w=majority`


module.exports = (app)=>{
    
    mongoose.connect("mongodb://localhost/voting-system",{useNewUrlParser:true,useUnifiedTopology:true})

    .then(()=>{
        app.listen(5000,()=> console.log("Serving at port : 5000"))
    })
    .catch(err=>{
       
        console.log(err)
    });
}



