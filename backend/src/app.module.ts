/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/productsModule';

@Module({
  imports: [
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
