export default [
  {
    prefix: 'filter',
    // id: '^ticket.filter', // se c'è id non serve mettere prefix
    // onChange: FILTER_CHANGE, // scateno evento ognio volta che cambia il value
    container: 'paper',
    type: 'row',
    flex: true,
    gutter: 12,
    children: [
      {
        col: 18,
        id: 'ricerca',
        type: 'input',
        label: 'Ricerca',
        name: 'ricerca',
      },
      {
        col: 6,
        id: 'ticketId',
        type: 'number',
        name: 'ticketId',
        label: 'TicketId',
        ruleMode: 'disable',
      },
      {
        col: 24,
        type: 'row',
        gutter: 12,
        children: [
          {
            col: 6,
            id: 'dataa',
            type: 'datepicker',
            label: 'Data apertura',
            name: 'dataa',
          },
          {
            col: 6,
            id: 'datac',
            type: 'datepicker',
            name: 'datac',
            label: 'Data chiusura',
            ruleMode: 'disable',
          },
          {
            id: 'stato',
            // prendo i dati da un'altro riduttore, poichè id verrà usato per salvare il dato selezionato
            fromId: '^^ticket.tests',
            col: 6,
            type: 'select',
            name: 'stato',
            label: 'Stato',
            ruleMode: 'disable',
            options: [
              {
                label: 'Open', value: 1
              },
              {
                label: 'Closed', value: 0
              },
            ]
          },
          {
            col: 6,
            id: 'from',
            type: 'input',
            name: 'from',
            label: 'Aperto da'
          },
        ],
      },
      {
        container: {
          type: 'col',
          xs: 16,
          lg: {
            span: 6,
            offset: 18
          }
        },
        type: 'row',
        justify: 'start',
        gutter: 12,
        children: [
          {
            col: 12,
            type: 'button',
            title: 'Reset',
            id: '^ticket.filter',
            action: '#reset',
            block: true,
            ruleModeDisable: true,
            rules: [
              { '^ticket.filter': { ex: true } },
            ],
          },
          {
            col: 12,
            type: 'button',
            title: 'APPLY',
            id: '^ticket.filter',
            mode: 'danger',
            block: true,
            action: ({ value, dispatch }) => dispatch({
              type: 'LOAD_ITEMS',
              filters: value
            }),
            ruleModeDisable: true,
            rules: [
              { '^ticket.filter': { ex: true } },
            ],
          },
        ],
      },
    ],
  },
];