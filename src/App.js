import logo from './logo.svg';
import './App.css';

import {Provider} from "react-redux"
import Store from './redux/Store';
import Employe from './components/Employe';


function App() {
  return (
    <div className="App">
      <Provider store={Store}>
      
     
      <Employe/>
      </Provider>
      
    </div>
  );
}


export default App;
