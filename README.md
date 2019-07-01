# NodeJS Blog

A web app where users can create posts and read the posts. No frontend at this moment.

## Getting Started

To run the project you must have installed `Node` and `npm` **OR** Docker.

### With docker

If you have docker, you dont need the first three. Commands to run it:

```
docker-compose docker-compose.yml up
```

### Without docker

To use it without docker you need to install npm and Node first. Go to project directory, then type in:

```
npm install typescript --global
npm install 
npm start
```

## Testing it

When you see a message saying the app is running, go to http://localhost:3000/api-docs/.

From there you can use [Swaggers`](https://swagger.io/) interface to test the app. 

* Register or login with test user credentials. (username: test, password: test123).
* Create a post.
* View your posts.
* View all posts.

## Built with
* Typescript
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/) - Serverside backbone.
* [MongoDB](https://www.mongodb.com/) - Using a cloud cluster.
* [Swagger](https://swagger.io/) - Basic visualization and testing
* [Docker](https://www.docker.com/) 

## Authors
* Stoil Yankov - *Sofia University, **BCs Software Engineering***
