import { BrowserRouter, Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import RoutesFiles from './routes';
import ReadMorePage from './pages/ReadMorePage';
function App() {

  return (
    <>
    <Header/>
  <RoutesFiles/>
    </>
  )
}

export default App
