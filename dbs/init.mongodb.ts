import mongoose from 'mongoose';
import config from './mongo.config';

const { username, password } = config;

const connectString: string = `mongodb+srv://${username}:${password}@cluster-hdws.05nxugs.mongodb.net/`;

class Database {
    private static instance: Database;

    private constructor() {
        this.connect();
    }

    private connect(): void {
        // mongoose.set('debug', true);
        // mongoose.set('debug', { color: true });
        mongoose
            .connect(connectString)
            .then(() => console.log(`Connected to MongoDB ${username} successfully`, mongoose.connections.length))
            .catch(err => console.error('Error', err));
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const mongoDbInstance: Database = Database.getInstance();

export default mongoDbInstance;
