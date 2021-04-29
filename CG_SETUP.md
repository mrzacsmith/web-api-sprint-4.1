# Codegrade

This is the solution repo for `https://github.com/LambdaSchool/web-sprint-challenge-build-a-web-api`

## Project Setup

1. Run `npm i`
2. Run `npm run migrate`
3. Run `npm run seed`
4. Run `npm run server`
5. Run `npm test`

## Codegrade Setup

### Fixtures

These are the files that Codegrade needs:

1. `project.test.js`
2. `jest.config.js`

If you make changes to the project or the tests, please go through this checklist:

1. Make sure that all tests are passing in your local.
2. Upload the updated fixtures to your template Codegrade assignment.

### Global setup script to run

```bash
cg-jest install
```

### Per-student setup script to run

```bash
mv $FIXTURES/* . && npm install
```

### Program to test

```bash
NODE_ENV=testing cg-jest run -- project.test.js --runInBand --forceExit
```
