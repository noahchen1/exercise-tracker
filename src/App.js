import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import NavBar from './components/NavBar';
import AddUser from './components/AddUser';
import AddActivity from './components/AddActivity';

function App() {



  // Declaring styles as constants

  const backgroundStyle = {
    backgroundColor: 'rgb(234, 234, 234)',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const containerStyle = {
    backgroundColor: 'rgb(253, 253, 253)',
    width: '66%',
    maxWidth: '900px',
    minWidth: '350px',
    height: '93%',
    borderRadius: '32px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    boxShadow: '0px 9px 15px -7px rgba(0, 0, 0, 0.3)'
  }

  return (
    <BrowserRouter>
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/user' element={<AddUser/>}/>
          <Route path='/add' element={<AddActivity/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
