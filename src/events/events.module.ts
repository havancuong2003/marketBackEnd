import { EventsGateway } from './events.gateway';
import { Module } from "@nestjs/common";

@Module({
    providers: [EventsGateway],
})

export class EventsGatewayModule {
    // static register() {
    //     return {
    //         module: EventsGatewayModule,
    //         providers: [EventsGateway],
    //     };
    // }
}