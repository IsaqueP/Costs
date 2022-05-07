import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages
import { Home } from './components/pages/Home'
import { Contact } from './components/pages/Contact'
import { Company } from './components/pages/Company'
import { NewProject } from './components/pages/NewProject'
import { Projects } from './components/pages/Projects'
import { Project } from './components/pages/Project'

//Components
import { Container } from './components/layout/Container'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'



function App() {

  const [ menu, setMenu ] = useState(false)

  return (

    <BrowserRouter>
      <Navbar setMenu={setMenu} menu={menu}/>

      <Container customClass='min-height'  menu={menu}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Projects' element={<Projects/>}></Route>
          <Route path='/Company' element={<Company/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
          <Route path='/NewProject' element={<NewProject/>}></Route>
          <Route path='/Project/:id' element={<Project/>}></Route>
        </Routes>
      </Container>

      <Footer menu={menu}/>
    </BrowserRouter>


    );
}

export default App;
