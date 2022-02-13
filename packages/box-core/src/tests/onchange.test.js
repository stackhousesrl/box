
import 'jsdom-global/register'
import React from 'react';
import { Provider } from 'react-redux';
import Box from '../index'
import { mount } from 'enzyme';
import { combineReducers, createStore } from 'redux';
import { userSlice } from './test-utils';

const Text = ({ text, value }) => <h1>{text || value}</h1>
const Input = ({ onChange, value = '', name }) => <input name={name} value={value} onChange={evt => onChange(evt.target.value)} />
const Container = ({ children }) => <div>{children}</div>

Box.setControls({
  Input,
  Text,
  Container
})

describe('Test fields update onChange', () => {
  let store;

  beforeEach(() => {
    store = createStore(
      combineReducers({
        app: userSlice.reducer,
      })
    );
  });

  it('Quando passo un valore ad un input valido, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
      {
        type: 'Input',
        id: 'surname',
        name: 'surname'
      }
    ]

    const dispatchSpy = jest.spyOn(store, 'dispatch')

    const wrapper = mount(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');

    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"Hello\"></div>')

  })

  it('Quando passo un valore ad un input valido complesso e un valore di default, mi aspetto il render dell\'elemento correttamente', () => {

    const fields = [
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

    const wrapper = mount(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    wrapper.find('input[name="surname"]').simulate('change', { target: { value: 'Hello' } });
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

    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"Hello\"><input value=\"andrea\"></div>')

  })

  it('Quando passo un valore ad un input obbligatorio, mi aspetto che sia validato (^isValid)', () => {

    const fields = [
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

    const wrapper = mount(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );


    wrapper.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(dispatchSpy.mock.lastCall[0].type).toEqual('@box/app/update');

    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"Hello\"><h1>OKK</h1></div>')

  })

  it('Quando non passo un valore ad un input obbligatorio, mi aspetto che non sia valido (^isValid)', () => {

    const fields = [
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
      },
      {
        type: 'Text',
        text: 'KO!',
        rules: {
          '^isValid': { eq: false }
        }
      }
    ]

    const wrapper = mount(
      <Provider store={store}>
        <div>
          <Box fields={fields} prefix="app" />
        </div>
      </Provider>
    );

    expect(wrapper.html()).toEqual('<div><input name="surname" value=\"\"><h1>KO!</h1></div>')

  })


})
