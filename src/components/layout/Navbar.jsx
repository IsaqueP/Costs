import { Link } from 'react-router-dom'

import { Container } from './Container'

import styles from './styles/Navbar.module.css'
import logo from '../../img/costs_logo.png'

export function Navbar({ setMenu, menu }){


    function handleMenuMobile(){
        setMenu(!menu)
    }

    return(
        <nav className={menu ? `${styles.navbar} ${styles.open}` : `${styles.navbar}`}>
            <Container customClass={menu ? `open` : `header`}>
                <Link to='/' className={styles.logoHeader}>
                    <img src={logo} alt="Costs"/>
                </Link>
                <div className={styles.menu}>
                    <div className={styles.menuHamburger} onClick={handleMenuMobile}>
                        <div className={styles.hamburger}></div>
                        <div className={styles.hamburger}></div>
                        <div className={styles.hamburger}></div>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.item} onClick={()=>setMenu(false)}>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className={styles.item} onClick={()=>setMenu(false)}>
                            <Link to='/Projects'>Projects</Link>
                        </li>
                        <li className={styles.item} onClick={()=>setMenu(false)}>
                            <Link to='/Company'>Empresa</Link>
                        </li>
                        <li className={styles.item} onClick={()=>setMenu(false)}>
                            <Link to='/Contact'>Contato</Link>
                        </li>
                    </ul>
                </div>
            </Container>
            
        </nav>
    )
}