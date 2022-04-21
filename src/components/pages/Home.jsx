import { LinkButton } from '../layout/LinkButton'

import styles from './styles/Home.module.css'
import savings from '../../img/savings.svg'

export function Home(){

    return(
        <>
            <section className={styles.home_container}>
                <h1>Bem-vindo ao <span>Costs</span></h1>
                <p>Comece a gerenciar seus projetos agora mesmo!</p>
                <LinkButton to='/NewProject' text='Criar Projeto' />

                <img src={savings} alt="Costs" />
            </section>
        </>
    )
}