import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  // cros:{
  //   origin: '*',
  //   methods: ['GET', 'POST']
  // }
})
export class EventsGateway implements OnModuleInit {
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected')
    })
  }
  // handleConnection(client: any, ...args: any[]) {
  //   console.log('Client connected:', client.id);
  // }

  // handleDisconnect(client: any) {
  //   console.log('Client disconnected:', client.id);
  // }
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
  @WebSocketServer()
  server : Server;

  @SubscribeMessage('event')
  onNewMassage(@MessageBody() data: any) {
    this.server.emit('message', {
        msg: 'message',
        content: data ,
    })
  }
}
