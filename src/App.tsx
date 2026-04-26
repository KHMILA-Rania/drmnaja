import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactPage from './components/Contact'
import Services from './components/Services'
import Esthetique from './components/ServicesSections/Esthetique'
import Corps from './components/ServicesSections/Corps'
import Laser from './components/ServicesSections/Laser'
import ScrollToTop from './components/Scroll'
import APropos from './components/About'
import ScrollToHash from './components/ScrollToHash'
function App() {


  return (
    <>
     <Navbar></Navbar>
     <ScrollToHash></ScrollToHash>
    <ScrollToTop></ScrollToTop>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
        <Route path='/services' element={<Services></Services>}></Route>
        <Route path='/services/esthetiques' element={<Esthetique></Esthetique>} ></Route>
        <Route path='/services/corps' element={<Corps></Corps>}></Route>
        <Route path='/services/laser' element={<Laser></Laser>}></Route>
        <Route path='/apropos' element={<APropos></APropos>}></Route>
    </Routes>
    <Footer></Footer>
    </>
  )
}

export default App
