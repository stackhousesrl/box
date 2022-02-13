
import React from 'react';
import { Provider } from 'react-redux';
import Box from '../index'
import configureStore from 'redux-mock-store';
import { shallow, mount, render } from 'enzyme';

const mockStore = configureStore([]);

const Text = ({ text, value }) => <h1>{text || value}</h1>
const Input = ({ onChange, value, name }) => <input name={name} value={value} onChange={evt => onChange(evt.target.value)} />
const Container = ({ children }) => <div>{children}</div>

Box.setControls({
  Input,
  Text,
  Container
})

describe('Test fields', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      app: {},
    });
  });

  it('Quando passo un field valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        type: 'Text',
        text: 'andrea'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual('<h1>andrea</h1>')

  })

  it('Quando passo un field non valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        type: 'TextNO',
        text: 'andrea'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <Box fields={fields} prefix="app" />
      </Provider>
    );

    expect(wrapper.html()).toEqual('')

  })

  it('Quando passo due fields valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
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
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual(`<h1>andrea</h1><h1>carla</h1>`)
  })

  it('Quando passo fields validi nested, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        container: 'Container',
        type: 'Text',
        text: 'andrea'
      },
      {
        type: 'Container',
        fields: [{
          type: 'Text',
          text: 'carla'
        }]
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual(`<div><h1>andrea</h1></div><div><h1>carla</h1></div>`)
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

  it('Quando passo un field valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        type: 'Text',
        id: 'name'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual('<h1>andrea</h1>')

  })

  it('Quando passo due fields valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
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
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual(`<h1>andrea</h1><h1>carla</h1>`)
  })

  it('Quando passo fields validi nested, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        container: 'Container',
        type: 'Text',
        id: 'name'
      },
      {
        type: 'Container',
        fields: [{
          type: 'Text',
          id: 'secondName'
        }]
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual(`<div><h1>andrea</h1></div><div><h1>carla</h1></div>`)
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
    });
  });

  it('Quando passo un field valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        type: 'Text',
        id: 'name'
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual('<h1>andrea</h1>')

  })

  it('Quando passo due fields valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
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
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual(`<h1>andrea</h1><h1>carla</h1>`)
  })

  it('Quando passo fields validi nested, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        container: 'Container',
        type: 'Text',
        id: 'name'
      },
      {
        type: 'Container',
        fields: [
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
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual(`<div><h1>andrea</h1></div><div><h1>carla</h1></div>`)
  })

})
