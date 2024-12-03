import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { FeedModule } from './feed/feed.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './feed/entities/feed.entity';

@Module({
  imports: [
    LoggerModule.forRoot(),
    FeedModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: '1221',
      database: 'dev_db',
      synchronize: true, // dev mode에서만 true
      entities: [Feed],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
