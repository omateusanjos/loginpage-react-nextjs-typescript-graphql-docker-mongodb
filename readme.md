# Login Page  [![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://bitbucket.org/lbesson/ansi-colors) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/Naereen/ama) [![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/) [![Docker](https://badgen.net/badge/icon/docker?icon=docker&label)](https://https://docker.com/) [![TypeScript](https://img.shields.io/badge/--3178C6?logo=react&logoColor=ffffff)](https://www.typescriptlang.org/)
| Statements | Branches | Functions | Lines |
| -----------|----------|-----------|-------|
| ![Statements](https://img.shields.io/badge/Coverage-6.81%25-red.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-7.69%25-red.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-6.25%25-red.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-5%25-red.svg "Make me better!") |


Projeto voltado à masterização de conhecimento.

<h4 align="center"> 🚧 Warning.... 🚀 Em construção... 🚧 </h4>

## How to run


|                |PORTA                          |EXAMPLE                         |
|----------------|-------------------------------|-----------------------------|
|Client side 	 |`3000`                       |`http://localhost:3000/`            |
|Server side     |`3000`                   |`http://localhost:3000/api/graphql`            |

###  Commands


|                |environment                         |  COMMANDS                         |
|----------------|-------------------------------|-----------------------------|
|development 	 |`docker`                       |  yarn dev:up          |
|development 	 |`native`                       |  yarn && yarn dev       |
|production    |` docker`                   | yarn prod:up
|production    |` docker`                   |yarn && yarn build            



## **Server side**
Single endpoint /api/graphql with GraphQL Playground: https://login-page-refact.vercel.app/api/graphql

### Querys:
|**users**|   *returns all registered users*

     {
              users {
        	    _id
                email
                password
              }
            } 

|**user**| *returns a user looking for the identifier "email"*

      {
          user(email: "mateus@gmail.com") {
            email
          }
        }

|**login**| *Will check if the user exists and will return the same data or null for non-existent*

     {
      login(email: "mateus@gmail.com", password: "123456") {
        email
        password
      }
    }
### Mutation:
|**createUser**| *create a user*

    {
          users {
    	    _id
            email
            password
          }
        }
