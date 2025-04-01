# To-Do List API

Esta é uma API RESTful para gerenciar tarefas (To-Do List), desenvolvida com **Spring Boot**. A API permite a criação, atualização, exclusão e listagem de tarefas. A aplicação está configurada para usar um banco de dados **H2** em memória e também possui integração com **Swagger** para documentação da API.

## Funcionalidades

- **Listar todas as tarefas**
- **Buscar uma tarefa por ID**
- **Criar uma nova tarefa**
- **Atualizar uma tarefa existente**
- **Excluir uma tarefa**

## Tecnologias utilizadas

- **Spring Boot**: Framework para desenvolvimento de aplicações Java.
- **Spring Data JPA**: Para integração com banco de dados relacional.
- **H2 Database**: Banco de dados em memória para fins de desenvolvimento e teste.
- **Spring Security**: Para controle de autenticação e segurança.
- **Swagger**: Para documentação da API.

## Endpoints disponíveis

### 1. **GET /tasks**
- **Descrição**: Retorna todas as tarefas.
- **Resposta de Sucesso**: `200 OK`
- **Exemplo de resposta**:
  ```json
  [
      {
          "id": 1,
          "description": "Finalizar relatório mensal",
          "status": "pendente"
      },
      {
          "id": 2,
          "description": "Comprar leite",
          "status": "concluída"
      }
  ]





{
    "id": 1,
    "description": "Finalizar relatório mensal",
    "status": "pendente"
}


{
    "description": "Nova tarefa",
    "status": "pendente"
}

{
    "id": 1,
    "description": "Nova tarefa",
    "status": "pendente"
}

{
    "description": "Atualizar tarefa",
    "status": "pendente"
}

{
    "id": 1,
    "description": "Atualizar tarefa",
    "status": "pendente"
}



Como rodar o projeto localmente  ٩(ˊᗜˋ*)و ♡




    Clone o repositório:

git clone https://github.com/seu-usuario/todo-list-api.git
cd todo-list-api

Abra o projeto em sua IDE (ex: IntelliJ IDEA, Eclipse).

Execute a aplicação:

    No seu terminal, execute o comando:

./mvnw spring-boot:run

Ou, se estiver usando Gradle:

    ./gradlew bootRun

Acesse a API:

    O servidor estará rodando em http://localhost:8080.
    Você pode acessar a documentação da API via Swagger em http://localhost:8080/swagger-ui.html.



Testes

O projeto já inclui testes básicos com o Spring Boot Test.

    Para rodar os testes, execute o comando:

./mvnw test

Ou, se estiver usando Gradle:

    ./gradlew test

Licença

Distribuído sob a licença MIT. Veja LICENSE para mais informações.


Esse `README.md` explica o projeto, como rodar localmente, os endpoints disponíveis, as dependências e

