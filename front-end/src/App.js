import './App.css';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import HomePage from './pages/Home page/HomePage';
import MyNotes from './pages/MyNotes/MyNotes';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Header />
      <main>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/mynotes' component={MyNotes} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
