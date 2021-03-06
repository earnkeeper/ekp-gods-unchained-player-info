import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { ApiService } from '../../shared/api';
import { CardMapper, Prototype } from '../../shared/game';
import { CardDocument } from './ui/card.document';

@Injectable()
export class CardService {
  constructor(private apiService: ApiService) {}

  async getCardDocuments(): Promise<CardDocument[]> {
    const protos = await this.apiService.fetchProtos();

    const prototypes = protos.map((proto) => CardMapper.mapToPrototype(proto));

    return this.mapDocuments(prototypes);
  }

  async mapDocuments(prototypes: Prototype[]) {
    const now = moment().unix();
    const documents: CardDocument[] = prototypes.map((prototype) => {
      return {
        id: prototype.id?.toString(),
        updated: now,
        attack: prototype.attack,
        cardArtUrl: `https://images.godsunchained.com/art2/500/${prototype.id?.toString()}.webp`,
        god: _.startCase(prototype.god),
        health: prototype.health,
        mana: prototype.mana,
        name: prototype.name,
        rarity: _.startCase(prototype.rarity),
        set: _.startCase(prototype.set),
        type: _.startCase(prototype.type),
      };
    });

    return documents;
  }
}
