
import 'jsdom-global/register'
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Box from '../index'
import { render, fireEvent } from '@testing-library/react';
import { combineReducers, createStore } from 'redux';
import { userSlice } from './test-utils';


const Text = ({ text, value }) => <h1>{text || value}</h1>
const Input = ({ onChange, value = '', name, childId }) => <input data-testid={childId} name={name} value={value} onChange={evt => onChange(evt.target.value)} />
const Container = ({ children }) => <div>{children}</div>
const CustomError = ({ setError, childId, error }) => {
  useEffect(() => {
    setError(true, 'error1')
  }, [setError])
  return <h1 data-testid={childId}>{error}</h1>
}

Box.setComponents({
  Input,
  Text,
  Container,
  CustomError
})

describe('Test children update onChange', () => {
  let store;

  beforeEach(() => {
    store = createStore(
      combineReducers({
        app: userSlice.reducer,
      })
    );
  });

  it('Quando passo un valore ad un input valido, mi aspetto il render dell\'elemento correttamente', async () => {

    const children = [
      {
        type: 'Input',
        id: 'surname',
        name: 'surname'
      }
    ]

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );

    const inputEl = await wrapper.getByTestId('app.surname')
    fireEvent.change(inputEl, { target: { value: 'Hello' } })

    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');
    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><input data-testid="app.surname" name="surname" value=\"Hello\"></div></div>')

  })

  it('Quando passo un valore ad un input valido complesso e un valore di default, mi aspetto il render dell\'elemento correttamente', async () => {

    const children = [
      {
        type: 'Input',
        id: 'a.b.c.surname',
        name: 'surname'
      },
      {
        type: 'Input',
        id: 'a.name',
        default: 'andrea'
      }
    ]

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );


    const inputEl = await wrapper.getByTestId('app.a.b.c.surname')
    fireEvent.change(inputEl, { target: { value: 'Hello' } })

    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');

    expect(store.getState()).toEqual({
      app: {
        a: {
          name: 'andrea',
          b: {
            c: {
              surname: 'Hello'
            }
          }
        }
      }
    })

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><input data-testid=\"app.a.b.c.surname\" name=\"surname\" value=\"Hello\"><input data-testid=\"app.a.name\" value=\"andrea\"></div></div>')

  })

  it('Quando passo un valore ad un input obbligatorio, mi aspetto che sia validato (^isValid) 1', async () => {

    const children = [
      {
        type: 'Input',
        id: 'surname',
        name: 'surname',
        required: true
      },
      {
        type: 'Text',
        text: 'OKK',
        rules: {
          '^isValid': { eq: true }
        }
      }
    ]

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );


    const inputEl = await wrapper.getByTestId('app.surname')
    fireEvent.change(inputEl, { target: { value: 'Hello' } })

    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><input data-testid=\"app.surname\" name=\"surname\" value=\"Hello\"><h1>OKK</h1></div></div>')

  })

  it('Quando non passo un valore ad un input da validare con un validatore custom, mi aspetto che non sia valido (^isValid)', async () => {

    const children = [
      {
        type: 'CustomError',
        id: 'surname'
      },
      {
        type: 'Text',
        text: 'OKK',
        rules: {
          '^isValid': { eq: true }
        }
      },
      {
        type: 'Text',
        text: 'KO!',
        rules: {
          '^isValid': { eq: false }
        }
      }
    ]

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );


    const inputEl = wrapper.getByTestId('app.surname')

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><h1 data-testid="app.surname">error1</h1><h1>KO!</h1></div></div>')

  })

  it('Quando non passo un valore ad un input da validare, mi aspetto che non sia valido (^isValid)', async () => {

    const children = [
      {
        type: 'Input',
        id: 'surname',
        name: 'surname',
        validate: {
          self: { eq: 'and' }
        }
      },
      {
        type: 'Text',
        text: 'OKK',
        rules: {
          '^isValid': { eq: true }
        }
      },
      {
        type: 'Text',
        text: 'KO!',
        rules: {
          '^isValid': { eq: false }
        }
      }
    ]

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    const wrapper = render(
      <Provider store={store}>
        <div>
          <Box data={children} prefix="app" />
        </div>
      </Provider>
    );


    const inputEl = wrapper.getByTestId('app.surname')
    fireEvent.change(inputEl, { target: { value: 'a' } })

    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><input data-testid="app.surname" name="surname" value="a"><h1>KO!</h1></div></div>')

  })


})
