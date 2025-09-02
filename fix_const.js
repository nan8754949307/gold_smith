const fs = require('fs');
const path = require('path');

// Find all .tsx files in the app directory
function findTsxFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat && stat.isDirectory()) {
            results = results.concat(findTsxFiles(filePath));
        } else if (file.endsWith('page.tsx')) {
            results.push(filePath);
        }
    });
    
    return results;
}

const appDir = '/home/laabam/Gold_simith/src/app';
const allPageFiles = findTsxFiles(appDir);

function fixDuplicateConst(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (content.includes('const const')) {
            console.log(`Fixing duplicate const in ${filePath}`);
            content = content.replace(/const const /g, 'const ');
            fs.writeFileSync(filePath, content);
            console.log(`Fixed ${filePath}`);
        }
        
    } catch (error) {
        console.error(`Error fixing ${filePath}:`, error.message);
    }
}

allPageFiles.forEach(fixDuplicateConst);
console.log('Done fixing duplicate const!');
