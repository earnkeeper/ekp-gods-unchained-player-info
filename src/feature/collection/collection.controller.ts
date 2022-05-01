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
import { CollectionForm, DEFAULT_COLLECTION_FORM } from '../../util';

import { CollectionService } from './collection.service';
import { CollectionDocument } from './ui/collection.document';
import collections from './ui/collection.uielement';

const COLLECTION_NAME = collection(CollectionDocument);
const PATH = 'collection';

@Injectable()
export class CollectionController extends AbstractController {
  constructor(
    clientService: ClientService,
    private collectionService: CollectionService,
    private apmService: ApmService,
  ) {
    super(clientService);
  }

  async onClientConnected(event: ClientConnectedEvent) {
    await this.clientService.emitMenu(event, {
      id: PATH,
      title: 'Player Cards',
      navLink: PATH,
      icon: 'cil-user',
    });

    await this.clientService.emitPage(event, {
      id: PATH,
      element: collections(),
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
      const form: CollectionForm =
        event.state.forms?.collection ?? DEFAULT_COLLECTION_FORM;

      const playerAddress = form.playerAddress;

      const documents = await this.collectionService.getCollectionDocuments(
        playerAddress,
      );

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
