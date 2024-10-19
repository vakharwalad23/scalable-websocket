import Redis from "ioredis";
import { config } from 'dotenv';
config();

const Publisher = new Redis(process.env.REDIS_URL as string);
const Subscriber = new Redis(process.env.REDIS_URL as string);

export { Publisher, Subscriber };

Publisher.on('connect', () => {
    console.log('Publisher connected');
})

Subscriber.on('connect', () => {
    console.log('Subscriber connected');
})