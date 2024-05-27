const fs=require('fs');
const simpleGit= require('simple-git');
const path=require('path');

const repoPath='https://github.com/babel/babel/tree/main/packages/babel-preset-react';

const localPath='./repo';
const getFolderStructureFromGit=async(dir)=>{
	console.log('Repository cloned successfully');
	const subdirs=await fs.readdir(dir);
	const files=await Promise.all(subdirs.map(async (subdirs)=>{
		const res=path.resolve(dir,subdirs);
		const stat= await fs.stat(res);
		if(stat.isDirectory()){
			return getFolderStructureFromGit(res);
		}
		return res;
	}));
	return files.flat();
};
 const main= async ()=>{
	 try{
		 simpleGit().clone(repoPath,localPath);
		 console.log('Repository cloned successfully');
		 const folderStructure=await getFolderStructureFromGit(localPath);
		 console.log('folderStructure:', folderStructure);
	 }catch(err){
		 console.error('Error',err);
	 }
 }	