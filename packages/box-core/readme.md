# Box

Libreria per la creazione di form e layout avanzati, è integrabile su qualsiasi progetto react/redux.

## Table of Contents

* [Installation](#installation)
* [Getting Started](#getting-started)
* [Configs](#configs)
* [Field schema](#field-schema)
* [Field component](#field-component)
* [Id](#id)
* [Methods](#methods)
* [Rules and validation](#rules-and-validation)
* [Prefix](#prefissi)
* [Container](#Container)
* [Reducer](#redux-reducer)


## Peer Dependencies

| Peer Dependency | Version  |
|-----------------|----------|
| react           | ^16.11.0 |
| react-redux     | ^7.1.3   |
| redux           | ^4.0.4   |

### Installation
```sh
npm install @stackhouseos/box-core
```

## Getting Started

• Basic
```JS
import Box from '@stackhouseos/box-core';

const model = [{
  type: 'input',
  placeholder: 'Name',
  id: 'name'
}]

<Box prefix="nomereducer" fields={model} />

```


```JS
import Box from '@stackhouseos/box-core';

const CustomInput = ({onChange, value, placeholder}) => {
  return (
    <input 
      value={value}
      onChange={(evt) => onChange(evt.target.value)} placeholder={placeholder}
    />
  )
}

Box.extendControls({CustomInput});

const model = [
  {
    type: 'CustomInput',
    placeholder: 'Name',
    id: 'name'
  }
]

<Box prefix="nomereducer" fields={model} />

```

---
### Attenzione per poter usare Box ricordati di estendere il tuo reducer con quello di Box

Esempio
[Reducer](#redux-reducer)

---

## Configs
### Box
| Prop Name    | Type           | Is Required | Default Value | Description                                                                                                                                                                          |
|--------------|----------------|-------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fields       | `array|object` | yes         |               | Schema del modello da visualizzare                                                                                                                                                   |
| prefix       | `string`       | yes         |               | Path (dotStyle) è il nome del reducer in cui salvare e leggere i dati, es. tickets.detail                                                                                            |
| destroyValue | `bool`         | optional    | false         | Regola di default per tutti i field del modello, se true svuota il dato se il componente viene distrutto, utile quando ci sono le regole, si evita di lasciare dati sporchi nel form |


### Field schema
| Prop Name       | Type                             | Is Required             | Default Value | Description                                                                                                                                                                                                                    |
|-----------------|----------------------------------|-------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type            | `string|component`               | optional                | `div`         | Componente da visualizzare                                                                                                                                                                                                     |
| id              | `string|reselect`                         | optional                |               | redux path selector per leggere o salvare i dati                                                                                                                                                                               |
| (*_)fromId      | `string|reselect`                | optional                |               | permette di leggere i dati da un selettore diverso da id, in quetso caso id viene utilizzato solo per salvare, utile quando si usano le select, che devono salvare su id ma prendere i dati da un'altro selettore, name_fromId |
| fields          | `array|object`                   | optional                |               | Recursive fields                                                                                                                                                                                                               |
| onChange        | `string|func({value, dispatch})` | optional, `id` required |               | Viene scatenata ad ogni aggiornamento dell'id corrispondente, se viene usata una stringa deve corrispondere ad una azione di redux                                                                                             |
| onLoad          | `string|func({value, dispatch})` | optional,`id` required  |               | Viene scatenata ad mount del compomente, se viene usata una stringa deve corrispondere ad una azione di redux                                                                                                                  |
| prefix          | `string`                         | optional                |               | Path (dotStyle) aggiunge un prefisso a tutti gli id successivi                                                                                                                                                                 |
| container       | `string|object`                  | optional                |               | Wrappa il componente dentro un'altro componente                                                                                                                                                                                |
| rules           | `array|object`                   | optional                |               | vedi lib [json-rules]                                                                                                                                                                                                          |
| ruleModeDisable | `bool`                           | optional                |               | Aggiunge la props disable nel componente, con false non si esegue il render del componente in base alle rules                                                                                                                  |
| validate        | `array|object`                   | optional                |               | vedi lib [json-rules]                                                                                                                                                                                                          |
| required        | `bool`                           | optional                |               | campo obbligatorio, solo se presente id                                                                                                                                                                                        |
| pattern         | `string|regex`                   | optional                |               | es. "^[1-9][0-9]*$"                                                                                                                                                                                                            |
| errorMessages   | `string|object`                  | optional                |               | es. Il campo è obbligatorio, oppure `{required:'Richiesto', min: 'Lunghezza minima 5'}`                                                                                                                                        |
| destroyValue    | `bool`                           | optional                | false         | se true svuota il dato se il componente viene distrutto, utile quando ci sono le regole, si evita di lasciare dati sporchi nel form                                                                                            |
| action          | `string|func`                    | optional                |               | Se stringa scatena un dispatch sul nome dell'azione, se funzione passa il dispatch per poter invocare azioni custom                                                                                                            |


### Field Component
I tuoi componenti custom riceveranno in automatico le seguenti props, oltre al tutte le proprietà che userai nel tuo schema

| Prop Name | Type     | Description                                                             |
|-----------|----------|-------------------------------------------------------------------------|
| onChange  | `func`   | Metodo per aggiornare i dati nell'id indicato                           |
| value     | `any`    | Valore recuperato dal selettore                                         |
| id        | `string` | Id field, obbligatorio se si vogliono leggere o salvare i dati su redux |
| field     | `object` | Schema del field corrente                                               |
| onAction  | `func`   | Da utilizzare per invocare il dispatch                                  |
| disabled  | `bool`   | in base alla rules                                                      |
| error     | `string` | in base a validation                                                    |
| onBlur    | `func`   | Necessario per la validazione degli input                               |


## Id

Il campo id viene utilizzato per recuperare i dati da redux o context, allo stesso modo viene utilizzato per salvare i dati su redux

```JS
const model = [
  {
    type: 'CustomInput',
    placeholder: 'Name',
    id: 'name',
  },
  {
    type: 'CustomInput',
    placeholder: 'tipologia',
    id: 'dettagli.tipologia',
  }
]

<Box prefix="nomereducer" fields={model} />
```

i dati potranno essere recuperati usando come id direttamente name, Box salverà i dati su redux nel reducer `nomereducer.name` e `nomereducer.dettagli.tipologia`

Può essere utile anche recuperare i dati da altri reducer che non sono al livello di `nomereducer`, tramite l'utilizzo del carattere ^ come prefisso dell'id, es:

• Redux state
```JS
const initialState = {
  attivita: {items: [1,2,3]},
  ticket: {name: 'Andrea', dettagli: {tipologia: 'dev'}}
}
```

```JS
import Box, { BoxContextProvider } from '@stackhouseos/box-core';

const model = [
  {
    type: 'Lista',
    id: '^attivita.items', // print [1,2,3]
  },
  {
    type: 'Testo',
    id: 'ticket.dettagli.tipologia', // print 'dev'
  },
  {
    type: 'Testo',
    id: '^role', // print 'user'
  }
]

<BoxContextProvider value={{ role: 'user' }}>
  <Box prefix="ticket" fields={model} />
</BoxContextProvider>
```

Questa convenzione sarà utilizzata anche per la gestione delle rules e validazioni

```JS
const model = [
  {
    type: 'Testo',
    placeholder: 'Name',
    id: 'name',
    rules: {
      '^role': {eq: 'user'} // appare solo se il ruolo utente è uguale a 'user'
    },
    validation: {
      'name': { min: 10 } // verrà validato solo se rules è valido
    }
  }
]
```

## Methods

• Add components
```JS
Box.extendControls({ ...components });
```

• Set components
```JS
Box.setControls({ ...onlyThiscomponents });
```

• Extends data with Context, per aggiungere dati che non sono su redux
```JS
import Box, { BoxContextProvider } from '@stackhouseos/box-core';

const model = [
  {
    type: 'Testo',
    id: '^role', // print 'user'
  }
]

<BoxContextProvider value={{ role: 'user' }}>
  <Box prefix="ticket" fields={model} />
</BoxContextProvider>
```

### Rules and validation

| Key       | Type   | Description                                                              |
|-----------|--------|--------------------------------------------------------------------------|
| ^hasError | `bool` | E' presente un errore nel form, vengono analizzati solo i field visibili |
| ^isValid | `bool`  | Il form è valido, vengono analizzati solo i field visibili |

Utile quando si vuole disabilitare il tasto salva se nel form sono presenti errori

• example
```JS
{
  type: 'button',
  title: 'SALVA',
  ruleModeDisable: true,
  rules: { '^hasError': { eq: false } }
}
```
• Field con regole

Tutti i field passati nel modello possono esser gestiti tramite rules, basterà appendere al nome _rules

```JS
{
  type: 'button',
  title_default: 'Salva', // titolo se non si trova nessuna corrispondenza con le regole
  title_rules: {
    'Aggiungi': {
      'id' : {ex: false}, // il titolo sarà "Aggiungi" se id non esiste
    },
    'Salva': {
      'id' : {ex: true},  // il titolo sarà "Salva" se id esiste, questa regola può essere omessa usando il title_default
    }
  },
}
```


• Root reducer

`^` utilizare l'accento circonflesso, per recuperare i dati dalla root di reducer, questo ignora un qualasi prefix indicato 


### Prefissi

E' possibile aggiungere un prefisso a livello di componente 

`<Box prefix="nomereducer" />` 

oppure dentro un qualsiasi fields.
Aggiungendo un prefisso al padre sarà aggiunto in automatico a tutti i fields figli.

```JS
const modello = [
  {
    id: 'name', // selector nomereducer.name
    type: 'input'
  },
  {
    type: 'grid',
    prefix: 'dati',
    fields:[
      {
        id: 'name' // selector nomereducer.dati.name
      },
      {
        id: 'lastname' // selector nomereducer.dati.lastname
      }
    ]
  }
]

<Box prefix="nomereducer" fields={modello} />
```

### Container
Capiterà molto spesso di dover mettere attorno ai tuoi fields un componente di layout, questa operazione si potrà fare in 2 modi:

• Modalità normale

```JS
  const model = [{
    type: 'Paper',
    fields:[{type: 'text', text: 'ciao'}]
  }]
  // esempio da compilato
  <Paper>
    <Text>Ciao</Text>
  </Paper>
```

• Modalità container base

```JS
  const model = [{
    container: 'Paper',
    type: 'text', 
    text: 'ciao'
  }]
  // esempio da compilato
  <Paper>
    <Text>Ciao</Text>
  </Paper>
```

• Modalità container con props

```JS
  const model = [{
    container: {type: 'Paper', color: 'red'},
    type: 'text', 
    text: 'ciao'
  }]
  // esempio da compilato
  <Paper color="red">
    <Text>Ciao</Text>
  </Paper>
```
### Visualizzare tutti gli errori

Passare al context il campo showErrors: true, per visualizzare tutti gli errori

```JS
<BoxContextProvider value={{ showErrors: true }}>
  <Box prefix="ticket" fields={model} />
</BoxContextProvider>
```


### Redux reducer

Se vuoi usare Box su un progetto esistente, ti basterà estendere il tuo reducer con l'azione di default

• Reducer example

```JS
  import { boxReducer } from '@stackhouseos/box-core';
  const ticketReducer = (state = initialState, action) =>
  produce(state, () => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case TUE_AZIONI:
        break;
      default:
        // necessario per fare comunicare il tuo redux con Box
        return boxReducer('folder', state, action); 
    }
  });
```

• Reducer example Redux Toolkit

```JS
const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // ... actions
  },
  extraReducers: {
    // necessario per fare comunicare il tuo redux con Box
    '@box/categories/update': (state, action) => _set(state, action.payload.id, action.payload.value),
  },
});
```
