import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import { Home } from './components/pages/Home'
import { Contact } from './components/pages/Contact'
import { Company } from './components/pages/Company'
import { NewProject } from './components/pages/NewProject'
import { Projects } from './components/pages/Projects'

//Components
import { Container } from './components/layout/Container'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'



function App() {
  return (

    <BrowserRouter>
      <Navbar/>

      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Projects' element={<Projects/>}></Route>
          <Route path='/Company' element={<Company/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
          <Route path='/NewProject' element={<NewProject/>}></Route>
        </Routes>
      </Container>

      <Footer/>
    </BrowserRouter>


    );
}

export default App;
