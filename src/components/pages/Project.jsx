import { Loading } from "../layout/Loading";
import { Container } from "../layout/Container";
import { Message } from "../layout/Message"
import { ProjectForm } from "../project/ProjectForm";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./styles/Project.module.css";

export function Project() {
  const { id } = useParams();

  const [ project, setProject ] = useState([]);
  const [ showProjectForm, setShowProjectForm ] = useState(false);
  const [ message, setMessage ] = useState()
  const [ type, setType ] = useState()

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  function editPost(project) {
    if (project.budget < project.cost){
        setMessage('O orçamento não pode ser menor que o custo do projeto')
        setType('error')
        return
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(!showProjectForm)
      })
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_detail}>
          <Container customClass="column">
              {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project?.category?.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R$ {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
