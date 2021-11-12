const tools = require('ftp-cmd-upload');
Start();
async function Start() {
  await tools.cmdTool.Run('npm run build');
  await tools.ftpTool.UploadFiles();
}
