export default [
  {
    type: 'row',
    justify: 'start',
    gutter: 12,
    fields: [
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
        title: 'Reset',
        id: '^ticket.filter',
        action: 'CUSTOM_ACTION_REDUX',
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
          type: LOAD_ITEMS,
          filters: value
        }),
        ruleModeDisable: true,
        rules: [
          { '^ticket.filter': { ex: true } },
        ],
      },
    ],
  }
];
