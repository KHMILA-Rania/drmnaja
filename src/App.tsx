import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {


  return (
    <>
     <Navbar></Navbar>

      <Routes>
      <Route path="/" element={<Home />} />
   
    </Routes>
    <Footer></Footer>
    </>
  )
}

export default App
