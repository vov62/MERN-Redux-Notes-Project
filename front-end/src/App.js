import { useState } from 'react';
import './App.css';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import HomePage from './pages/Home page/HomePage';
import MyNotes from './pages/MyNotes/MyNotes';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateNote from './pages/CreateNote/CreateNote';
import SingleNote from './pages/SingleNote/SingleNote';
import UserProfile from './pages/ProfilePage/UserProfile';



function App() {

  const [search, setSearch] = useState("");


  return (
    <>
      <Router>
        <Header setSearch={setSearch} />
        <main>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/profile' component={UserProfile} />
          <Route exact path='/mynotes' component={() => <MyNotes search={search} />} />
          <Route exact path='/createnote' component={CreateNote} />
          <Route exact path='/note/:id' component={SingleNote} />

        </main>
        <Footer />
      </Router>

    </>
  );
}

export default App;
