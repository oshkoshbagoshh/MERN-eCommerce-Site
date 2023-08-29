/*
 * @Author: AJ Javadi 
 * @Email: amirjavadi25@gmail.com
 * @Date: 2023-08-28 23:10:30 
 * @Last Modified by: Someone
 * @Last Modified time: 2023-08-28 23:14:55
 * @Description:  dispatch the loadUser function when the component mounts. This will load the user into the state.
 * We wrap our JSX code inside the provider with a store={store} prop. This will allow us to access the state from any component.
 * We have also used a browser router to wrap the div with the classname  App. This will allow us to use the react router.
 * We then have a main function inside the div  and then we export the App component.
 */

import { Component} from 'react';
import { Provider } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import store from './store';
import { loadUser } from './actions/authActions';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

