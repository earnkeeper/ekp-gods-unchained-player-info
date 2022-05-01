import {
  ClientConnectedEvent,
  ClientDisconnectedEvent,
  ClientStateChangedEvent,
  collection,
  RpcEvent,
} from '@earnkeeper/ekp-sdk';
import {
  AbstractController,
  ApmService,
  ClientService,
  logger,
} from '@earnkeeper/ekp-sdk-nestjs';
import { Injectable } from '@nestjs/common';
import { CardService } from './card.service';
import { CardDocument } from './ui/card.document';
import card from './ui/card.uielement';

const COLLECTION_NAME = collection(CardDocument);
const PATH = 'cards';

@Injectable()
export class CardController extends AbstractController {
  constructor(
    clientService: ClientService,
    private cardService: CardService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Card Browser',
      navLink: PATH,
      icon: 'cil-search',
    });

    await this.clientService.emitPage(event, {
      id: PATH,
      element: card(),
    });
  }

  async onClientRpc(event: RpcEvent) {
    // Do nothing
  }

  async onClientStateChanged(event: ClientStateChangedEvent) {
    if (PATH !== event?.state?.client?.path) {
      return;
    }

    await this.clientService.emitBusy(event, COLLECTION_NAME);

    try {
      const documents = await this.cardService.getCardDocuments();

      this.clientService.emitDocuments(event, COLLECTION_NAME, documents);
    } catch (error) {
      this.apmService.captureError(error);
      logger.error('Error occurred while handling event', error);
      console.error(error);
    } finally {
      await this.clientService.emitDone(event, COLLECTION_NAME);
    }
  }

  async onClientDisconnected(event: ClientDisconnectedEvent) {
    // Do nothing
  }
}
