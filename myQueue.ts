import Queue from 'bull';

const redisConfig = {
    redis: {
        host: 'localhost',
        port: 6379
    }
};

const myQueue = new Queue('myQueue', redisConfig);

myQueue.process('test-bull', async (job: Queue.Job<any>, done: Queue.DoneCallback) => {
    const { payload } = job.data;
    switch (payload.num % 2) {
        case 0:
            return done(null, `Even ${payload.num}`);
        case 1:
            return done(new Error(`Odd ${payload.num}`));
    }
    done();
});
myQueue.on('completed', (_, result: string) => {
    console.log({ completed: result });
});

myQueue.on('failed', (_, err: Error) => {
    console.log({ failed: err.message });
});

export default myQueue;
