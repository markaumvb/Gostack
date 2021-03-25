const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {url, techs, title} = request.body;

  const repository ={
    id : uuid(),
    title,
    url, 
    techs,
    likes: 0
  }

  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;

  const indice = repositories.findIndex(repository => repository.id ===id);
  
  if (indice === -1 ){
    return response.status(400).json({error: "repositorio nao existe"});
  }

  const repository = {
    id,
    title, 
    url, 
    techs,
    likes : repositories[indice].likes  
  };
  

  repositories[indice]=repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const indice = repositories.findIndex(repository => repository.id == id);

  if (indice >=0) {
    repositories.splice(indice, 1);
    
  }else{
    return response.status(400).json({erro: "repositorio não cadastrado"})
  }
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const indice = repositories.findIndex(repository => repository.id ===id);
  
  if (indice === -1 ){
    return response.status(400).json({error: "repositorio nao existe"});
  }

  repositories[indice].likes ++;

  return response.json(repositories[indice])

});

module.exports = app;
