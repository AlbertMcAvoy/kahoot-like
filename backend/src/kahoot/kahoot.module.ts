import { Module } from '@nestjs/common';
import { KahootGateway } from "./kahoot.gateway";

@Module({
    providers: [KahootGateway]
})
export class KahootModule {}
