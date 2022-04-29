import { connect, connection } from 'mongoose';

const conn = {
    isConnected: false
}

// MONGODB_URL=mongodb://<username>:<password>@localhost:27017/<dbname>?authSource=admin
export async function dbConnect() {
    if (conn.isConnected) return;

    const db = await connect(process.env.MONGODB_URL);

    conn.isConnected = db.connections[0].readyState;

    console.log(db.connection.db.databaseName);
}

connection.on("connected", () => {
    console.log("Mongodb is connected");
})
connection.on("error", err => {
    console.log(err)
});
