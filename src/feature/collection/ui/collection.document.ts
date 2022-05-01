import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class CollectionDocument extends DocumentDto {
  constructor(properties: CollectionDocument) {
    super(properties);
  }
  readonly attack: number;
  readonly cardArtUrl: string;
  readonly god: string;
  readonly health: number;
  readonly mana: number;
  readonly name: string;
  readonly purity: number;
  readonly rarity: string;
  readonly set: string;
  readonly type: string;
}
