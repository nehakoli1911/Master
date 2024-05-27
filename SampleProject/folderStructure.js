const fs=require('fs');
const simpleGit= require('simple-git');

const repoPath='/path/to/your/git/repository';

const git=simpleGit(repoPath);

async function getFolderStructerFromGit(){
	try{
		const gitFiles=await git.lsFiles();
		const folderStructure= {};
		gitFiles.forEach(filePath=>{ 
		const dirs=filePath.split('/');
		dirs.pop();
		let currentFolder=folderStructure;
		dirs.forEach(dir=> {
		if(!currentFolder[dir]){
			currentFolder[dir]={};
		}
		currentFolder=currentFolder[dir];
		});
		});
		return folderStructure;
	}catch(error){
		console.error('Error while parsing',error);
		return null;
	}
}
getFolderStructerFromGit().then(folderStructure=>{
	if(folderStructure){
		console.log('Folder Structure from GIT', JSON.stringify(folderStructure,null,2));
		fs.writeFileSync('Folder Structure.json', JSON.stringify(folderStructure,null,2));
	}else{
		console.log('Failed to retrive');
	}
});