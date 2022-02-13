import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17' // Adapter ufficiale di enzyme per React 17 non ancora disponibile

console.warn = function() {}
// console.log = function() {}

Enzyme.configure({
  adapter: new Adapter()
})