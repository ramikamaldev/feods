import mongoose from "mongoose";

export function connectToFeodsMongodb() {
   return new Promise(async function (resolve, reject) { 
       console.log("Awaiting MongoDB connection")
        await mongoose.connect(process.env.FEODS_MONGODB_DEV as string, { useNewUrlParser: true, useUnifiedTopology: true }, function (mongooseConnectionErr) {
            let mongooseApi = mongoose.connection;
            if (!mongooseConnectionErr) {
                console.log("Connected to MongoDB through Mongoose!");
                return resolve("connected");
            }
            console.log(mongooseConnectionErr);
            return reject("Failed to to connect to MongoDB through Mongoose!");
        });

    })
}