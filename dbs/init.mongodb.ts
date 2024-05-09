import mongoose from 'mongoose';
import config from './mongo.config';
import { MongoClient, Db } from 'mongodb';
import Agenda, { Job } from 'agenda';
const { username, password } = config;

const connectString: string = `mongodb+srv://${username}:${password}@cluster-hdws.05nxugs.mongodb.net/`;

class Database {
    private static instance: Database;
    private agenda: Agenda;

    private constructor() {
        this.agenda = new Agenda({ db: { address: connectString } });
        this.connect();
        this.initAgenda();
    }

    private connect(): void {
        // mongoose.set('debug', true);
        // mongoose.set('debug', { color: true });
        mongoose
            .connect(connectString)
            .then(() => console.log(`Connected to MongoDB ${username} successfully`, mongoose.connections.length))
            .catch(err => console.error('Error', err));
    }

    private async initAgenda(): Promise<void> {
        // Start Agenda instance
        await this.agenda.start();
        console.log('Agenda initialized');
        this.defineDatabaseCheckJob();

    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    private defineDatabaseCheckJob = async (): Promise<void> => {
        // Define job
        this.agenda?.define('check-database-connection', async () => {
            console.log('Checking database connection...');
            // Perform database connection check here
            // For example, you can use Mongoose's connection.readyState
            // to check the database connection status
            const connectionState = mongoose.connection.readyState;
            console.log('Database connection state:', connectionState ? 'OK' : 'BAD');
        });

        // Define job frequency (every minute)
        await this.agenda?.every('10 seconds', 'check-database-connection');
    };
}

const mongoDbInstance: Database = Database.getInstance();

export default mongoDbInstance;
