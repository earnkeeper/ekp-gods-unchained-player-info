import { SdkModule } from '@earnkeeper/ekp-sdk-nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CardModule } from './feature/card/card.module';
import { CollectionModule } from './feature/collection/collection.module';

export const MODULE_DEF = {
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: !!process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ?? process.env.EKP_PLUGIN_ID,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    CollectionModule,
    CardModule,
    SdkModule,
  ],
};

@Module(MODULE_DEF)
export class WorkerModule {}
