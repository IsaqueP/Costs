import { Container } from "../layout/Container";
import { LinkButton } from "../layout/LinkButton";
import { Message } from "../layout/Message";
import { ProjectCard } from "../project/ProjectCard";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./styles/Projects.module.css";

export function Projects() {
  const [projects, setProjects ] = useState([])

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(()=>{
    fetch('http://localhost:5000/Projects',{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data)
      })
      .catch((error) => console.log(error))
    
  }, [])

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}

      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => { 
            return <ProjectCard 
              id={project.id}
              key={project.id}
              name={project.name}
              budget={project.budget}
              category={project?.category?.name}
           />
          })}
      </Container>
    </div>
  );
}
