const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");

const mongourl="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongourl);
}

const initdb=async()=>{
await listing.deleteMany({});
initdata.data = initdata.data.map((obj)=> ({...obj, owner: "65f8a7c2f9a3f49276b60b88"}));
await listing.insertMany(initdata.data);
console.log("data was initialized");
};
initdb();

// const initdb=async()=>{
//     try{
//         await listing.deleteMany({});
//         await listing.insertMany();
//         console.log("data was initialized");
//     }catch(err){
//         console.error("error initializing data:",err);
//     }
// };