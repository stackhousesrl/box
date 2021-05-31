import React, { useState } from 'react';
import './App.css';
import Box, { BoxContextProvider } from '@stackhouseos/box-core'
import { createSelector } from 'reselect';

const selector = createSelector(
  state => state.global,
  data => {
    return data.dati?.cognome
  }
)

const model = [
  {
    type: 'text',
    text: '^app.name'
  },
  /* {
    type: 'paper',
    prefix: 'dati',
    fields: [
      {
        type: ({ value }) => <div>[{value}]</div>,
        color: 'gray',
        id: '#nome',
      },
      {
        type: 'text',
        color: 'gray',
        id: '#nome',
        rules: {
          '#dati.cognome': { eq: 'az' }
        }
      },
      {
        type: 'text',
        color: 'red',
        id: '^global.nome',
        rules: {
          '^global.nome': { eq: 'az' }
        }
      },
      {
        type: 'text',
        color: 'red',
        id: '^global.nome',
      },
      {
        type: 'main',
        fromId: selector,
        nome_fromId: '^global.nome',
        cognome_fromId: 'cognome',
      },
      {
        type: 'text',
        color: 'orange',
        fromId: '^global.nome'
      },
      {
        type: 'text',
        color: 'green',
        customSelectorFromId: '^global.indirizzo'
      },
    ],
  }, */
  {
    type: 'input',
    id: '#nome',
    required: true,
    validate: {
      'nome': {
        con: 'azz'
      }
    }
    /* validate: {
      '#nome': { eq: 'az' }
    }, */
  },
  /*   {
      type: 'inputState',
      id: 'indirizzo',
      saveOnState: true,
      required: true
    }, */
  {
    type: 'text',
    id: '^app.name',
    name: 'NAMEEEE',
  },
  /*   {
      type: 'text',
      id: selector,
      validate: {
        'dati.cognome': { eq: 'ZZ' }
      },
      rules: {
        'nome': { eq: 'az' }
      }
    }, */
  /* {
    type: 'text',
    color: 'green',
    customSelectorId: selector,
  }, */
  {
    type: 'input',
    id: 'dati.cognome',
    //default: 'Z',
    required_rules: [
      {
        rules: {
          'nome': { eq: 'az' }
        },
        value: true
      }
    ],
    /*     rules: {
          '#nome': { eq: 'az' }
        },
        validate: {
          'dati.cognome': { eq: 'ZZ' }
        },
        label_rules: {
          'titolo': {
            enabled: { eq: true }
          }
        } */
  },
  {
    type: 'button',
    title: 'save',
    action: "SAVE",
    ruleModeDisable: true,
    rules: {
      '^hasError': { eq: false }
    }
  },
  {
    type: 'text',
    text: 'OK',
    color: 'green',
    rules: {
      '^isValid': { eq: true }
    }
  },
  {
    type: 'text',
    text: 'ERR',
    color: 'red',
    rules: {
      '^hasError': { eq: true }
    }
  }
]

const modelNews = [
  {
    type: 'text',
    id: '^app',
  },
  {
    type: 'input',
    id: 'nome',
    required: true
  },
  {
    type: 'input',
    id: 'nome',
    required: true
  },
  {
    type: 'input',
    id: 'nome',
    required: true
  },
  {
    type: 'input',
    id: 'nome',
    required: true
  },
  {
    type: 'input',
    id: 'cognome'
  },
  {
    type: 'select',
    name: 'Attivo',
    options: [{ label: 'si', value: 'si' }, { label: 'no', value: 'no' }],
    id: 'active',
    validate: {
      'active': { eq: 'si' }
    },
    rules: {
      '^global.active': { eq: 'si' }
    }
  },
  {
    type: 'button',
    title: 'save',
    action: "SAVE",
    ruleModeDisable: true,
    rules: [{
      '^hasError': { eq: false }
    }, {
      '^global.enabled': { eq: true }
    }]
  }
]

function App() {
  const [showErrors, setShowErrors] = useState()
  return (
    <div className="App">
      <BoxContextProvider value={{ showErrors, app: { name: 'ZUCCA' } }}>
        <Box prefix="global" fields={model} />
      </BoxContextProvider>
      <button onClick={() => setShowErrors(true)}>SHOW ERRORS</button>
      {/*       <br />
      <BoxContextProvider value={{ app: 'gino' }}>
        <Box prefix="news" fields={modelNews} />
      </BoxContextProvider> */}
    </div>
  );
}

export default App;
