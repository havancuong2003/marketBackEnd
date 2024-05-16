import {
  WebSocketGateway,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  handleDisconnect(client: Socket) {
    //console.log('Disconnect', 'Client disconnected ' + client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    //console.log('Connect', 'Client connected ' + client.id);
  }
  // @WebSocketServer() wss: Server;

  afterInit(server: any) {
    this.server.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
    });
  }

  @SubscribeMessage('msgToServer')
  onNewMessage(@MessageBody() body: string) {
    console.log(body);
    this.server.emit('msgToClient', body);
  }
}
