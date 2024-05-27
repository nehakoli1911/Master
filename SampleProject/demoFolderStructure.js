const simpleGit = require('simple-git');
const fs = require('fs-extra');
const path = require('path');

// Function to get folder structure recursively

const getFolderStructure = async (dir, parent = '') => {
		const structure = {};
		const files = await fs.readdir(dir);

		for (const file of files) {
			const fullPath = path.join(dir, file);
			const relativelath = path.join (parent, file);
			const stat = await fs.stat(fullPath);

			if (stat. isDirectory()) {
				structure[relativePath] = await getFolderStructure (fullPath, relativePath) ;
			} else {
				structure [relativePath] = 'file';
			}
		}
		return structure;
};
// Function to clone the repository and get the folder structure

const fetchFolderStructure = async (gitUrl) => {
	const localPath = path.join(_dirname, 'temp-repo');
	const git = simpleGit() ;

	// Remove the local repo if it exists
	if (await fs.pathExists (localPath)){
		await fs.remove (localPath) ;
	}
	
// Clone the repository
	await git.clone (gitUrl, localPath) ;

// Get the folder structure

	const folderStructure = await getFolderStructure(localPath);
	await fs.remove (localPath) ;

	return folderStructure;
};

const gitUrl = 'https://github.com/krunalgajbhiye/BlogApplication java.git';

fetchFolderStructure (gitUrl).then (structure => {
console.log(JSON.stringify(structure, null, 2));
}).catch (err => {
	console.error ('Error fetching folder structure:',err) ;
}) ;