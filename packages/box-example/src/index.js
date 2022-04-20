import React, { useDeferredValue } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl'

import Box from '@stackhouseos/box-core';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

const { store } = configureStore({});

Box.registerComponents({
  input: ({ onChange, value = '', error, onBlur }) => {
    return (
      <div style={{ border: '1px solid', borderColor: error ? 'red' : 'gray', padding: 5 }}>
        <input style={{ borderColor: error ? 'red' : 'gray' }} onBlur={onBlur} onChange={e => onChange(e.target.value)} value={value} />
      </div>
    )
  },
  inputState: ({ changeState, onChange, value = '', error, onBlur }) => {
    return (
      <div style={{ border: '1px solid', borderColor: error ? 'red' : 'gray', padding: 5 }}>
        <input style={{ borderColor: error ? 'red' : 'gray' }} onBlur={onBlur} onChange={e => changeState(e.target.value)} value={value} />
        <button onClick={() => onChange(value)}>save</button>
      </div>
    )
  },
  text: ({ value, text, fromStore, color, error }) => <p
    style={{ background: color, border: '1px solid', borderColor: error ? 'red' : 'gray', padding: 5 }}>
    t: {text} v:{value} s:{fromStore}
  </p>,
  main: ({ nome, cognome, value, fromStore }) => {
    return <div style={{ background: 'gray' }}>
      {`${value}, ${nome}, ${cognome}, ${fromStore}`}
    </div>
  },
  paper: ({ children, bg = 'gray', item }) => {

    return (
      <div style={{ backgroundColor: bg, minHeight: 100, minWidth: 100, marginBottom: 10 }}>
        <div>{item}</div>
        <hr />
        {children}
      </div>
    )
  },
  button: ({ title, disabled }) => {
    return <button disabled={disabled}>{title}</button>
  },
  LargeComponent: ({ value='' }) => {
    const deferredValue = useDeferredValue(value);
    return Array(1000).fill(1).map((r, i) => <div key={i}>{i + deferredValue}</div>)
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <IntlProvider>
      <App />
    </IntlProvider>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
