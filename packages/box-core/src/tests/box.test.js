import 'jsdom-global/register'
import React from 'react'
import { Provider } from 'react-redux';
import Box from '../index'
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { createSelector } from 'reselect';

const mockStore = configureStore([]);

const Text = ({ text, value }) => <h1>{text || value}</h1>
const TextName = ({ name }) => <h1>{name}</h1>
const Input = ({ onChange, value, name }) => <input name={name} value={value} onChange={evt => onChange(evt.target.value)} />
const Container = ({ children }) => <div className='paper'>{children}</div>

Box.setComponents({
  Input,
  Text,
  TextName,
  Container
})

describe('Test children', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app: {},
    });
  });

  it('Quando passo un child valido, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'Text',
        text: 'andrea'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><h1>andrea</h1></div></div>')

  })

  it('Quando passo un child non valido, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'TextNO',
        text: 'andrea'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <Box data={children} prefix="app" />
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div></div></div>')

  })

  it('Quando passo due children valido, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'Text',
        text: 'andrea'
      },
      {
        type: 'Text',
        text: 'carla'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><h1>andrea</h1><h1>carla</h1></div></div>`)
  })

  it('Quando passo children validi nested, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        container: 'Container',
        type: 'Text',
        text: 'andrea'
      },
      {
        type: 'Container',
        children: [{
          type: 'Text',
          text: 'carla'
        }]
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><div class="paper"><h1>andrea</h1></div><div class="paper"><h1>carla</h1></div></div></div>`)
  })

})

describe('Test value by id', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app: {
        name: 'andrea',
        secondName: 'carla'
      },
    });
  });

  it('Quando passo un child valido, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'Text',
        id: 'name'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><h1>andrea</h1></div></div>')

  })

  it('Quando passo due children valido, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'Text',
        id: 'name'
      },
      {
        type: 'Text',
        id: 'secondName'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><h1>andrea</h1><h1>carla</h1></div></div>`)
  })

  it('Quando passo children validi nested, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        container: 'Container',
        type: 'Text',
        id: 'name'
      },
      {
        type: 'Container',
        children: [{
          type: 'Text',
          id: 'secondName'
        }]
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><div class="paper"><h1>andrea</h1></div><div class="paper"><h1>carla</h1></div></div></div>`)
  })

  it('Quando uso un selettore custom per l\'id, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        container: 'Container',
        type: 'Text',
        id: 'getName'
      }
    ]

    const getName = createSelector(
      (state) => {
        return state.app
      },
      (data) => {
        return 'carla'
      }
    )

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" selectors={{ getName }} />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><div class="paper"><h1>carla</h1></div></div></div>`)
  })

  it('Quando uso un selettore custom per il valore l\'id, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        container: 'Container',
        type: 'Text',
        id: 'getName',
        replaceValue: 'uppercase'
      }
    ]

    const getName = createSelector(
      (state) => {
        return state.app
      },
      (data) => {
        return 'carla'
      }
    )

    const uppercase = (state, val) => val.toUpperCase()

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" selectors={{ getName }} replacers={{ uppercase }} />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><div class="paper"><h1>CARLA</h1></div></div></div>`)
  })

  it('Quando uso un selettore custom per il valore da _id, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'TextName',
        name_id: 'getName',
        name_replaceValue: 'uppercase'
      }
    ]

    const getName = createSelector(
      (state) => {
        return state.app
      },
      (data) => {
        return 'carla'
      }
    )

    const uppercase = (state, val) => {
      return val.toUpperCase()
    }

    const wrapper = render(
      <Provider store={store}>
          <Box data={children} prefix="app" selectors={{ getName }} replacers={{ uppercase }} />
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><h1>CARLA</h1></div>`)
  })

})

describe('Test value by root id', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app2: {
        secondName: 'carla'
      },
      app: {
        name: 'andrea',
      },
      app3: {
        data: {
          valore: {
            secondName: 'carla'
          }
        }
      }
    });
  });

  it('Quando passo un child valido, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'Text',
        id: 'name'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><h1>andrea</h1></div></div>')

  })

  it('Quando passo due children valido, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        type: 'Text',
        id: 'name'
      },
      {
        type: 'Text',
        id: '^app2.secondName'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><h1>andrea</h1><h1>carla</h1></div></div>`)
  })

  it('Quando passo children validi nested, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        container: 'Container',
        type: 'Text',
        id: 'name'
      },
      {
        type: 'Container',
        children: [
          {
            type: 'Text',
            id: '^app2.secondName'
          }
        ]
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><div class="paper"><h1>andrea</h1></div><div class="paper"><h1>carla</h1></div></div></div>`)
  })

  it('Quando passo children validi nested con prefix nei nodi, mi aspetto il render dell\'elemento correttamente', () => {

    const children = [
      {
        container: 'Container',
        type: 'Text',
        id: '^app.name'
      },
      {
        type: 'Container',
        prefix: 'data',
        children: [
          {
            type: 'Container',
            prefix: 'valore',
            children: [
              {
                type: 'Text',
                id: 'secondName'
              }
            ]
          }
        ]
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app3" />
        </div>
      </Provider>
    );

    expect(wrapper.baseElement.innerHTML).toEqual(`<div><div><div class="paper"><h1>andrea</h1></div><div class="paper"><div class="paper"><h1>carla</h1></div></div></div></div>`)
  })

})
