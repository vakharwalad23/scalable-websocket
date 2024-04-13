import { Server } from 'socket.io'

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
    }

    public intitListeners() {
        const io = this.io;
        console.log('Socket server listening for connections');
        io.on('connect', (socket) => {
            console.log('New Client connected', socket.id);

            socket.on('event:message', async( { message }: { message: string }) => {
                console.log('New Message received', message);
            })
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