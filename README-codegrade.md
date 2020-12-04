# Codegrade

## Setup

### Uploaded fixtures

These files must be re-uploaded to Codegrade whenever we make changes to them:

- `project.test.js`
- `jest.config.js`

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
