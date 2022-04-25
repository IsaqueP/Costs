import { useNavigate } from "react-router-dom";

import { ProjectForm } from "../project/ProjectForm";

import styles from "./styles/NewProject.module.css";

export function NewProject() {
  const navigate = useNavigate();

  function verifySelected(){
    let selected = document.getElementById('category_id').value
    if(selected === "Selecione uma opção"){
      alert('Escolha uma categoria!')
      return false
    }
    
    navigate('/projects', {
      state: {
        message: 'Projeto criado com sucesso!'
      }
    })
  }

  function createPost(project) {
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        verifySelected()
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
}
