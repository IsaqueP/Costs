import { Container } from "../layout/Container";
import { LinkButton } from "../layout/LinkButton";
import { Message } from "../layout/Message";
import { ProjectCard } from "../project/ProjectCard";
import { Loading } from "../layout/Loading";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./styles/Projects.module.css";

export function Projects() {
  const [projects, setProjects ] = useState([])
  const [ removeLoading, setRemoveLoading ] = useState(false)
  const [ projectMessage, setProjectMessage ] = useState('')

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(()=>{
    fetch('https://api-costs.vercel.app/projects',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch((error) => console.log(error))
    
  }, [])

  function removeProject(id){
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(resp => resp.json())
      .then(data =>{
        setProjects(projects.filter((projects) => projects.id !== id))
        setProjectMessage('Projeto removido com sucesso!')
      })
      .catch(error => console.log(error))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => { 
            return <ProjectCard 
              id={project.id}
              key={project.id}
              name={project.name}
              budget={project.budget}
              category={project?.category?.name}
              handleRemove={removeProject}
           />
          })}
          {!removeLoading && <Loading />}
          {removeLoading && projects.length === 0 && (
            <p>Não há projetos cadastrados!</p>
          )}
      </Container>
    </div>
  );
}
