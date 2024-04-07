import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const dbConnection = async () => {
    try {
        const{ connection } = await mongoose.connect(
            process.env.MONGO_URI || "mongodb://localhost:27017"
        );
        if(connection){
            console.log(`connected to MongoDB at ${connection.host}`);
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default dbConnection;