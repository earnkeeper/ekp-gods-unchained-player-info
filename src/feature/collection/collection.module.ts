import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [ApiModule, DbModule],

  providers: [CollectionController, CollectionService],
})
export class CollectionModule {}
