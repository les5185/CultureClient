import Account from './pages/Account';
import Navbar from './components/Navbar';
import {Route} from 'react-router-dom';
import SchedulerPage from './pages/Scheduler';
import Social from './pages/Social';
import Blank from './pages/Blank';
import Home from './pages/Home';
import './App.css';

import { appointments } from './pages/data';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/concerts" component={Blank} />
        <Route path="/conference" component={Blank} />
        <Route path="/exhibition" component={Blank} />
        <Route path="/culture" component={Blank} />
        <Route path="/sports" component={Blank} />
        <Route path="/admin" component={Account} />
        <Route path="/info" component={Blank} />
        <Route path="/reservation-list" component={Blank} />
        <Route path="/social" component={Social} />
        <Route path="/faq" component={Blank} />
      </div>
    </div>
  );
}

export default App;
