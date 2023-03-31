const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/TravelSwift');
  }

  main().catch(err => console.log(err));
  main().then(()=>{
      console.log("mongo connected")
  })