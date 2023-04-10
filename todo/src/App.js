import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './todo.css';
import Homepage from './main';
import Todo from './todo';

function App() {
  return (
    <html>
      <head>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <title>Hello Bulma!</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      </head>
      <div className="App">
        <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route path="/todos" element={<Todo/>} />
          </Routes>
        </Router>
        </header>
      </div>
    </html>
    
  );
}

export default App;
