import http from 'http'
import Socket from './services/socket';
import { config } from 'dotenv';
config();

async function startServer() {
    const socket = new Socket();
    
    const server = http.createServer();
    const PORT = process.env.PORT ?? 8000;

    //Server attached to socket.io
    socket.io.attach(server);

    socket.intitListeners();

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

startServer();