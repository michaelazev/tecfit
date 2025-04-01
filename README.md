# Localização de Academias
Este é um projeto Full Stack para localizar academias, desenvolvido com **React** no front-end e **Node.js** com **Express** no back-end. A aplicação permite que os usuários busquem academias por localização, visualizem detalhes e se inscrevam em aulas. O banco de dados utilizado é o **MySQL**.

## Funcionalidades
- **Listar todas as academias**
- **Buscar uma academia por ID**
- **Criar uma nova academia**
- **Atualizar uma academia existente**
- **Excluir uma academia**

## Tecnologias utilizadas
- **React**: Biblioteca para construção de interfaces de usuário.
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de APIs em Node.js.
- **MySQL**: Banco de dados relacional para armazenamento de dados.
- **Sequelize**: ORM para facilitar a interação com o MySQL.
- **Axios**: Para realizar requisições HTTP no front-end.

## Endpoints disponíveis
### 1. **GET /gyms**
- **Descrição**: Retorna todas as academias.
- **Resposta de Sucesso**: `200 OK`
- **Exemplo de resposta**:
  
[
      {
          "id": 1,
          "name": "Academia Fit",
          "location": "Rua A, 123",
          "classes": ["Yoga", "Pilates", "Musculação"]
      },
      

{
          "id": 2,
          "name": "Academia Power",
          "location": "Avenida B, 456",
          "classes": ["Crossfit", "Zumba"]
      }
  ]


GET /gyms/:id
{
    "id": 1,
    "name": "Academia Fit",
    "location": "Rua A, 123",
    "classes": ["Yoga", "Pilates", "Musculação"],
    "contact": "1234-5678"
}


POST /gyms
{
    "name": "Nova Academia",
    "location": "Rua C, 789",
    "classes": ["Musculação", "Dança"]
}

PUT /gyms/:id
{
    "name": "Academia Atualizada",
    "location": "Rua D, 101",
    "classes": ["Musculação", "Dança", "Yoga"]
}

DELETE /gyms/:id
•	Descrição: Exclui uma academia.
•	Resposta de Sucesso: ‘204 No Content’

Como rodar o projeto localmente ٩(ˊᗜˋ*)و 

1.	Clone o repositório
git clone https://github.com/seu-usuario/localizacao-academias.git
cd localizacao-academias

2.  Abra o projeto em sua IDE (ex: Visual Studio Code).
3.	Execute o back-end:
•	Navegue até a pasta do back-end e execute:
cd backend
npm install
npm start

4.	Execute o front-end:
•	Navegue até a pasta do front-end e execute:
cd frontend
npm install
npm start

5.	Acesse a aplicação:
•	O servidor estará rodando em http://localhost:3000.

Testes
O projeto inclui testes básicos com Jest e Supertest.
•	Para rodar os testes, execute o comando:
•	cd backend
•	npm test
