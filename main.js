const main = require('./cli/src/utils/schematics-cli').main;

async function line() {
  await main({
    args: ['cli:view', '--name=kkq2']
  })
    .then((exitCode) => (process.exitCode = exitCode))
    .catch((e) => {
      throw e;
    });

  await main({
    args: ['cli:view', '--name=kk4']
  })
    .then((exitCode) => (process.exitCode = exitCode))
    .catch((e) => {
      throw e;
    });

}

line();
