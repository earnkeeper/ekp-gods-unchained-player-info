import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import moment from 'moment';
import { ApiService, CardDto } from '../../shared/api';
import { CardMapper, Prototype } from '../../shared/game';
import { CollectionDocument } from './ui/collection.document';

@Injectable()
export class CollectionService {
  constructor(private apiService: ApiService) {}

  async getCollectionDocuments(
    playerAddress: string,
  ): Promise<CollectionDocument[]> {
    if (!playerAddress) {
      return [];
    }

    const cards = await this.apiService.fetchCards(playerAddress);

    const protos = await this.apiService.fetchProtos();

    const prototypes = protos.map((proto) => CardMapper.mapToPrototype(proto));

    const protoMap = _.chain(prototypes)
      .keyBy('id')
      .mapKeys((value, key) => {
        return Number(key);
      })
      .value();
    return this.mapDocuments(cards, protoMap);
  }

  async mapDocuments(cardDtos: CardDto[], protoMap: Record<number, Prototype>) {
    const now = moment().unix();
    const documents: CollectionDocument[] = cardDtos.map((cardDto) => {
      const card = CardMapper.mapToCard(cardDto, protoMap);

      const prototype = card.prototype;

      const document: CollectionDocument = {
        id: card.prototype.id?.toString(),
        updated: now,
        attack: prototype.attack,
        cardArtUrl: `https://images.godsunchained.com/art2/500/${prototype.id?.toString()}.webp`,
        god: _.startCase(prototype.god),
        health: prototype.health,
        mana: prototype.mana,
        name: prototype.name,
        purity: cardDto.purity,
        rarity: _.startCase(prototype.rarity),
        set: _.startCase(prototype.set),
        type: _.startCase(prototype.type),
      };
      return document;
    });

    return documents;
  }
}
