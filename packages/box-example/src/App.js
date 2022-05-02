import React, { useRef, useState } from 'react';
import './App.css';
import Box, { BoxContextProvider } from '@stackhouseos/box-core'
import { createSelector } from 'reselect';

const selector = createSelector(
  (state) => {
    return state.global
  },
  (data) => {
    return data.indirizzo
  }
)

const model = [
  {
    type: 'CustomError',
    id: 'errori',
    ruleModeDisable: true
  },
  {
    type: 'text',
    text: '^app.name'
  },
  {
    type: 'paper',
    children: [
      {
        type: 'input',
        id: '#indirizzo',
        required: true,
      }
    ]
  },
  {
    container: { type: 'div', id: 'base' },
    type: 'paper',
    bg: '#cc0',
    prefix: 'data',
    item_children: [
      {
        type: 'text',
        text: 'citta'
      },
      {
        type: 'input',
        id: 'citta',
        required: true,
      },
      {
        type: 'paper',
        item_children: [
          {
            type: 'text',
            id: 'citta'
          },
        ]
      },
      {
        type: 'text',
        id: 'citta',
      },
    ]
  },
  {
    container: {
      type: 'paper',
      bg: 'red',
    },
    type: 'text',
    id: 'citta',
    rules: {
      '^childId': { con: 'citta' }
    }
  },
  /* {
    type: 'paper',
    prefix: 'dati',
    children: [
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
    id: 'dati.cognome2',
    //default: 'Z',
    required_rules: [
      {
        rules: {
          'nome': { con: 'azzo' }
        },
        value: true
      }
    ],
    /*  
        rules: {
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
    text: 'VALIDO',
    color: 'green',
    rules: {
      '^isValid': { eq: true }
    }
  },
  {
    type: 'text',
    text: 'ERRORI',
    color: 'red',
    rules: {
      '^hasError': { eq: true }
    }
  },
  {
    type: 'title',
    title_id: 'selector_indirizzo',
  },
  {
    type: 'LargeComponent',
    id: 'selector_indirizzo',
  }
]

function App() {
  const [showErrors, setShowErrors] = useState()
  const ref = useRef()

  return (
    <div className="App">
      <BoxContextProvider value={{ showErrors, app: { name: 'ZUCCA' } }}>
        <Box
          prefix="global"
          data={model}
          ref={ref}
          selectors={{
            selector_indirizzo: selector
          }}
        />
      </BoxContextProvider>
      <button onClick={() => {
        setShowErrors(true)
        console.log(ref.current.isValid())
      }}>SHOW ERRORS</button>
    </div>
  );
}

export default App;
