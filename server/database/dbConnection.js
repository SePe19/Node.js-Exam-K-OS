import mongoose from "mongoose";

function mongooseConnectDB(uri) {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        
      })
      .then((_) =>
        console.log(" connected to db "))
      .catch((err) => console.log("error connecting to the database", err));
  }
  
  export default mongooseConnectDB;