export default [
  {
    onLoad: 'LOAD_ITEMS_REDUX',
    type: 'table',
    id: 'items',
    columns: [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: 'A',
        actions: ({ value = {} }) => ([{
          title: value.title,
          action: 'XX',
        }, {
          title: value.title,
          action: 'XX',
        }]),
      },
      {
        title: 'Name',
        dataIndex: 'title',
      },
      {
        title: 'Action',
        actions: [
          {
            icon: 'edit',
            ghost: true,
            mode: 'danger',
            action: 'OPEN',
          },
        ],
      },
    ],
  },
];