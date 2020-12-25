const path = require('path');
const fs = require('fs');
const write = require('write');
const chokidar = require('chokidar');
const debounce = require('debounce');
const { exec } = require('./libs');

async function build(srcFullPath, destFullPath, configFullPath, logger) {
  try {
    await exec(`node_modules/tailwindcss/lib/cli.js build ${srcFullPath} -o ${destFullPath} -c ${configFullPath}`, {
      cwd: __dirname,
    });
    logger.log('tailwindcss build success');
  } catch (e) {
    logger.error(e);
  }
}

function watch(srcFullPath, destFullPath, configFullPath, logger) {
  // 延迟3秒编译，正常情况下tailwindcss.css不应该经常变动
  chokidar.watch(srcFullPath).on('change', debounce(build, 3000).bind(this, srcFullPath, destFullPath, configFullPath, logger));
}

module.exports = {
  // Ref: https://docs.svrx.io/en/plugin/contribution.html#schema
  configSchema: {},

  hooks: {
    // Ref: https://docs.svrx.io/en/plugin/contribution.html#server
    async onCreate({ config, logger }) {
      const srcPath = config.get('src') || 'tailwindcss.css';
      const destPath = config.get('dest') || 'tailwindcss.min.css';
      const srcFullPath = path.join(process.cwd(), srcPath);
      const destFullPath = path.join(process.cwd(), destPath);

      if (!fs.existsSync(srcFullPath)) {
        logger.error(`${srcFullPath} is not found`);
        process.exit();
      }

      //  复制tailwind.config.js到根目录
      const configFullPath = path.join(process.cwd(), 'tailwind.config.js');
      if (!fs.existsSync(configFullPath)) {
        const configTemplateFile = path.join(__dirname, 'tailwind.config.js');
        const configData = await fs.promises.readFile(configTemplateFile);
        await write(configFullPath, configData);
      }

      const isBuild = config.get('build');
      if (typeof (isBuild) !== 'undefined') {
        await build(srcFullPath, destFullPath, configFullPath, logger);
      }
      await watch(srcFullPath, destFullPath, configFullPath, logger);
    },
  },
};
