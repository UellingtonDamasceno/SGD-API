const mySqlDump = require('mysqldump');
const fs = require('fs');

const directory = "src/services/backup/temp/";

async function createNewBackup(){
  await mySqlDump({
    connection:{
      host:"sql130.main-hosting.eu",
      database:"u970457530_sgda",
      user:"u970457530_sgda_root",
      password:"123456789"
    },
    dumpToFile: directory+new Date()+".sql"
  });
}

async function listAllDirectoryFiles(path) {
  const dir = await fs.promises.opendir(path);
  let files = [];
  for await (const dirent of dir) {
    files.push(dirent.name);
  }
  return files;
}

function deleteBackup(fileName){
  fs.unlink(directory+fileName, (err)=>{
    if(err){
      console.log("Erro ao apagar arquivo");
    }else{
      console.log("Sucesso!");
    }
  });
}

module.exports = {listAllDirectoryFiles, createNewBackup, deleteBackup};