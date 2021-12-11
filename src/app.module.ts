import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST') ?? 'localhost',
        port: configService.get('POSTGRES_PORT') ?? 5432,
        username: configService.get('POSTGRES_USER') ?? 'username',
        password: configService.get('POSTGRES_PASSWORD') ?? 'password',
        database: configService.get('POSTGRES_DATABASE') ?? 'txdx',
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: configService.get('ENV') === 'dev',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
