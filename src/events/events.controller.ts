// import { Controller, Post, Body } from '@nestjs/common';
// import { EventsGateway } from './events.gateway';

// @Controller('messages')
// export class EventsController {
//   constructor(private eventsGateway: EventsGateway) {}

//   @Post('messages')
//   sendMessage(@Body() data: { message: string }) {
//     this.eventsGateway.server.emit('messages', data.message);
//   }
// }