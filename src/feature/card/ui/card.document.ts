import { DocumentDto } from '@earnkeeper/ekp-sdk';

export class CardDocument extends DocumentDto {
  constructor(properties: CardDocument) {
    super(properties);
  }
  readonly cardArtUrl: string;
  readonly god: string;
  readonly mana: number;
  readonly name: string;
  readonly rarity: string;
  readonly set: string;
}
