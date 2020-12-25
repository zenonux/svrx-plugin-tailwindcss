const childProcess = require('child_process');

exports.exec = (str, opts) => new Promise((reslove, reject) => {
  childProcess.exec(str, opts, (error, stdout) => {
    if (error !== null) {
      reject(error);
    } else {
      reslove(stdout);
    }
  });
});
