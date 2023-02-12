# OpenKanban

![Alt text](./packages/frontend/assets/openkanban_logo_mono_green.png?raw=true "Optional Title")

A open source project managament and Kanban tool for your company

Features: 

- create groups and invite your colleagues
- create task and assign them to members of your group
- manage the project and all current tasks along a kanban board

# Documentation
  **TO DO**

# Development
Prerequisites:

- Node version >= 16

- Docker including docker compose plugin

1. Install required npm packages

    `docker-compose run backend npm install`

    `docker-compose run frontend npm install`

3. Start containers

    `docker-compose up` / `docker-compose up -d`

4. Synchronize database schemata

   **TO DO**
   
    meanwhile: create users using the graphql playground (http://localhost:3002/graphql) according to schema, e.g.
    
    `mutation { register(createUserInput: {
                              username: "test1", 
                              password: "test", 
                              email: "test@test.email"})
                          {userId}
                          }`
    <!--`docker-compose exec backend npm run typeorm schema:sync`<br> -->
    
5. Open a web browser and go to `localhost:3000/overview`

# Testing
  **TO DO**
# Deployment
  **TO DO**
# Data Model

![Alt text](./fig/ER_openKanban.png?raw=true "Optional Title")
