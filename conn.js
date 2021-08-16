
const mongoose = require("mongoose");

const dbPass = process.env.MONGODB_PASSWORD
const dbUser = process.env.MONGODB_USERNAME
const dbName = process.env.MONGODB_NAME

const PORT = process.env.PORT || 5000

const localDbURL = "mongodb://localhost/voting-system"

const remoteDbURL = `mongodb+srv://${dbUser}:${dbPass}@cluster0.gqtmu.mongodb.net/${dbName}?retryWrites=true&w=majority`


module.exports = (app)=>{
    
    mongoose.connect(remoteDbURL,{useNewUrlParser:true,useUnifiedTopology:true})

    .then(()=>{
        app.listen(PORT,()=> console.log("Serving at port : 5000"))
    })
    .catch(err=>{
       
        console.log(err)
    });
}



