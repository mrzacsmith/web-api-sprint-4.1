# Codegrade Setup

This is the solution repo for [Building RESTful APIs with Express](https://github.com/BloomInstituteOfTechnology/web-sprint-challenge-build-a-web-api) Sprint Challenge Submission.

Whenever setting up a Codegrade assignment or importing settings from another assignment:

1. Make sure that rubrics, fixtures and scripts match the ones in **this repo**.
2. Re-upload to Codegrade any items that don't match exactly the ones in this repo.
3. Run tests locally, and push an empty commit to Codegrade to verify that this repo passes all tests.

## 1- Fixtures

### Student-Facing

- [codegrade_mvp.test.js](./codegrade_mvp.test.js)

## 2- Global Setup Script

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs; cg-jest install; npm i -g jest@27.3.1
```

## 3- Per-Student Setup Script

```bash
mv $FIXTURES/* . && npm install
```

## 4- Auto Tests

### Learner-Facing - Weight 100

```bash
NODE_ENV=testing cg-jest run -- codegrade_mvp.test.js --runInBand --forceExit
```

## 5- Rubric

### Auto Tests (9 points)

>Automatic tests are run against your branch, to check how closely your work matches specification.
There is a copy of the tests inside the `codegrade_mvp.test.js` file, at the root of the project.
You can execute those tests in your local machine by running `npm test`.
It is crucial that test your API manually using HTTPie or Postman, and troubleshoot using log statements or the debugger.
Do not rely on the automatic tests alone to check your progress!

### Introduction to Node.js and Express

>Use Node.js to build a Web API with npm scripts.

| Grade         | Points | Description |
|---------------|:------:|-------------|
| Not Yet       | 0      | Learner does not add "start" and "server" scripts to the `package.json` file. |
| Met           | 1      | Learner adds "start" (using Node) and "server" (using `nodemon`) scripts and installs the `nodemon` NPM package. |
| Flying Colors | 2      | The `nodemon` package is installed as a development dependency. |

### Server-Side Routing with Express

>Build an API that can perform CRUD operations correctly.

| Grade         | Points | Description |
|---------------|:------:|-------------|
| Not Yet       | 0      | Learner's API does not exist or cannot perform CRUD operations. |
| Met           | 1      | Learner's API includes all endpoints specified in the README and they are functional. |
| Flying Colors | 2      | Learner's endpoints are built in separate router files for `projects` and `actions`. |

### Express Middleware

>Implement middleware functions.

| Grade         | Points | Description |
|---------------|:------:|-------------|
| Not Yet       | 0      | Learner does not add any middleware functions. |
| Met           | 1      | Learner adds two middleware function and uses them correctly. |
| Flying Colors | 2      | Learner adds and uses correctly more than two middleware functions. |

### Web Deployment and Best Practices

>Make the application deployable to Heroku.

| Grade   | Points | Description |
|---------|:------:|-------------|
| Not Yet | 0      | The API is not deployable to Heroku in its current form. |
| Met     | 1      | The API is deployable to Heroku (brings PORT from process.env and includes a "start" script). |

### Code Quality

>Write code that is straightforward and easy to follow.

| Grade         | Points | Description |
|---------------|:------:|-------------|
| Not Yet       | 0      | The code is difficult to read and formatted poorly. |
| Met           | 1      | The code is easy to read and properly formatted but more middleware functions could be used to make it DRYer. |
| Flying Colors | 2      | Middleware functions are used to handle edge cases and errors, making the code very DRY. |
