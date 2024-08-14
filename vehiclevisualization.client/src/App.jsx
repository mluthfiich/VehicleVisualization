import './App.css';
import Router from '../src/routes/index';
import useInactivityTimeout from './services/useInactivityTimeout';

const App = () => {
    useInactivityTimeout(600000);
    return (
        <div className="App">
            <Router />
        </div>
    );
};

export default App;