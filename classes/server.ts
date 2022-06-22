import express from 'express'
import { SERVER_PORT } from '../global/environment';
import  SocketIO from 'socket.io';
import http from 'http';


export default class Server 


{   
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    
    public io: SocketIO.Server;
    private httpServer: http.Server;

    constructor()
{
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = new SocketIO.Server( this.httpServer );

    this.escucharSockets();
}
 
public static get instance (){
    return this._instance || (this._instance = new this());
}
private escucharSockets(){
    console.log('Escuchando conexiones - sockets');
    this.io.on('conection', cliente => {
        console.log('cliente conectado');
    })
}
 start(callback: () => void) {
    this.httpServer.listen(this.port, callback);
 }

}