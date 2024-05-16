import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
 import { Server } from 'socket.io';

  @WebSocketGateway(8001, {
    cors: '*:*',
 })
  export class EventsGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
   afterInit(server: any) {
      this.server.on('connection', (socket) => {
        console.log(socket.id);
        console.log('connected')
      })
   };;
    
 
     handleConnection(client: any, ...args: any[]) {
       console.log('Client connected:', client.id);
     }
   
     handleDisconnect(client: any) {
       console.log('Client disconnected:', client.id);
     }
 
    @WebSocketServer()
     server: Server;
  
 
     @SubscribeMessage('messages')
     handleEvent(@MessageBody() data: string): void {
       this.server.emit('messages', data);
       console.log("data socket" ,data)
    }
    
 }
