import { Server } from 'socket.io'
import { Publisher, Subscriber } from '../config/Redis';

class Socket {
    private _io: Server;
    constructor() {
        this._io = new Server({
            cors:{
                origin: '*',
                allowedHeaders: ['*']
            }
        });
        console.log('Socket server initialized');
        Subscriber.subscribe("MESSAGE");
    }

    public intitListeners() {
        const io = this.io;
        console.log('Socket server listening for connections');
        io.on('connect', (socket) => {
            console.log('New Client connected', socket.id);

            socket.on('event:message', async( { message }: { message: string }) => {
                console.log('New Message received', message);

                //Publish the message to the redis channel
                await Publisher.publish('MESSAGE', JSON.stringify({ message }));
            })
        })

        //Listen for messages from the redis channel
        Subscriber.on('message', async (channel, message) => {
            if(channel === 'MESSAGE') {
                console.log('New Message received from redis', message);
                io.emit('message', message);
            }
        })

        io.on('disconnect', (socket) => {
            console.log('Client disconnected', socket.id);
        })
    }

    get io() {
        return this._io;
    }
}

export default Socket;