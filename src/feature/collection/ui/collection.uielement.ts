import {
  Button,
  Col,
  collection,
  Container,
  Datatable,
  documents,
  Form,
  formatToken,
  Fragment,
  GridTile,
  Image,
  Input,
  isBusy,
  PageHeaderTile,
  Row,
  Span,
  UiElement,
} from '@earnkeeper/ekp-sdk';
import { DEFAULT_COLLECTION_FORM } from '../../../util';
import { imageLabelCell } from '../../../util/ui/imageLabelCell';
import { CollectionDocument } from './collection.document';

export default function element(): UiElement {
  return Container({
    children: [titleRow(), formRow(), tableRow()],
  });
}

function formRow() {
  return Fragment({
    children: [
      Span({
        className: 'd-block mt-1 mb-2',
        content: 'Enter a player name to browse the cards they own',
      }),
      Form({
        name: 'collection',
        schema: {
          type: 'object',
          properties: {
            playerAddress: 'string',
          },
          default: DEFAULT_COLLECTION_FORM,
        },
        children: [
          Row({
            className: 'mb-1',
            children: [
              Col({
                className: 'col-12 col-md-auto',
                children: [
                  Input({
                    label: 'Player Address',
                    name: 'playerAddress',
                  }),
                ],
              }),

              Col({
                className: 'col-12 col-md-auto my-auto',
                children: [
                  Button({
                    label: 'Update',
                    isSubmit: true,
                    busyWhen: isBusy(collection(CollectionDocument)),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function titleRow() {
  return Fragment({
    children: [
      Row({
        className: 'mb-2',
        children: [
          Col({
            className: 'col-auto',
            children: [
              PageHeaderTile({
                title: 'Player Cards',
                icon: 'cil-user',
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export function tableRow() {
  return Fragment({
    children: [
      Datatable({
        defaultSortFieldId: 'name',
        data: documents(CollectionDocument),
        showExport: true,
        showLastUpdated: true,
        busyWhen: isBusy(collection(CollectionDocument)),
        defaultView: {
          xs: 'grid',
          lg: 'column',
        },
        gridView: {
          tileWidth: [12, 6, 4, 3],
          tile: GridTile({
            image: Image({
              className: 'card-img-top',
              src: '$.cardArtUrl',
            }),
            details: [
              {
                label: 'Name',
                value: '$.name',
              },
              {
                label: 'God',
                value: '$.god',
              },
              {
                label: 'Rarity',
                value: '$.rarity',
              },
              {
                label: 'Mana',
                value: '$.mana',
              },
              {
                label: 'Type',
                value: '$.type',
              },
              {
                label: 'Set',
                value: '$.set',
              },
              {
                label: 'Purity',
                value: formatToken('$.purity'),
              },
            ],
          }),
        },
        filters: [
          {
            columnId: 'god',
            type: 'checkbox',
          },
          {
            columnId: 'rarity',
            type: 'checkbox',
          },
          {
            columnId: 'set',
            type: 'checkbox',
          },
          {
            columnId: 'type',
            type: 'checkbox',
          },
        ],
        columns: [
          {
            id: 'name',
            searchable: true,
            sortable: true,
            cell: imageLabelCell('$.cardArtUrl', '$.name'),
          },
          {
            id: 'god',
            sortable: true,
            width: '140px',
          },
          {
            id: 'rarity',
            sortable: true,
            width: '140px',
          },
          {
            id: 'set',
            sortable: true,
            width: '140px',
          },
          {
            id: 'type',
            sortable: true,
            width: '140px',
          },
          {
            id: 'mana',
            sortable: true,
            width: '80px',
          },
          {
            id: 'health',
            sortable: true,
            width: '80px',
          },
          {
            id: 'attack',
            sortable: true,
            width: '80px',
          },
          {
            id: 'purity',
            format: formatToken('$.purity'),
            sortable: true,
            width: '100px',
          },
        ],
      }),
    ],
  });
}
