import { Module } from '@nestjs/common';
import { ApiModule } from '../../shared/api';
import { DbModule } from '../../shared/db';
import { CardController } from './card.contoller';
import { CardService } from './card.service';

@Module({
  imports: [ApiModule, DbModule],

  providers: [CardController, CardService],
})
export class CardModule {}
