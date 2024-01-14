import { Module } from '@nestjs/common';
import {KahootModule} from "./kahoot/kahoot.module";

@Module({
  imports: [KahootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
