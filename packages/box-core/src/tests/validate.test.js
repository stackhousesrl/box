
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

const CustomErrorOk = ({ setError, childId, error }) => {
  useEffect(() => {
    setError(false)
  }, [setError])
  return <h1 data-testid={childId}>{error}</h1>
}

Box.setComponents({
  Input,
  Text,
  Container,
  CustomError,
  CustomErrorOk
})

describe('Test children validate', () => {
  let store;

  beforeEach(() => {
    store = createStore(
      combineReducers({
        app: userSlice.reducer,
      })
    );
  });

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

  it('Quando non passo un valore ad un input da validare con un validatore custom, mi aspetto che non sia valido (^isValid) 2', async () => {

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

  it('Quando non passo un valore ad un input da validare con un validatore custom, mi aspetto che sia valido (^isValid)', async () => {

    const children = [
      {
        type: 'CustomErrorOk',
        id: 'surname'
      },
      {
        type: 'Text',
        text: 'OKK!',
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

    expect(wrapper.baseElement.innerHTML).toEqual('<div><div><h1 data-testid="app.surname"></h1><h1>OKK!</h1></div></div>')

  })

  it('Quando non passo un valore ad un input da validare, mi aspetto che non sia valido (^isValid) 3', async () => {

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
