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

console.log('Found', allPageFiles.length, 'page files');

function checkAndFixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file uses useSearchParams
        if (!content.includes('useSearchParams')) {
            return;
        }
        
        console.log(`Checking ${filePath}...`);
        
        // Check if it already has proper Suspense wrapper
        if (content.includes('Suspense') && content.includes('fallback')) {
            // Check if export default is on the wrapper component
            const lines = content.split('\n');
            let hasProperStructure = false;
            let exportLine = '';
            
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('export default')) {
                    exportLine = lines[i];
                    // Check if the next few lines contain Suspense
                    for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
                        if (lines[j].includes('Suspense') || (j < lines.length - 5 && lines.slice(j, j + 5).join('').includes('Suspense'))) {
                            hasProperStructure = true;
                            break;
                        }
                    }
                    break;
                }
            }
            
            if (!hasProperStructure) {
                console.log(`  - Fixing export structure in ${filePath}`);
                
                // Remove incorrect export default
                content = content.replace(/export default function \w+Content/, 'const $&'.replace('export default function ', '').replace('Content(', 'Content = ('));
                content = content.replace(/export default function (\w+)\(/g, 'const $1Content = (');
                
                // Find the wrapper component and add export default
                const wrapperMatch = content.match(/const (\w+) = \(\) => \{[^}]*Suspense[^}]*\}/s);
                if (wrapperMatch) {
                    const wrapperName = wrapperMatch[1];
                    if (!content.includes(`export default ${wrapperName}`)) {
                        content += `\nexport default ${wrapperName}\n`;
                    }
                }
                
                fs.writeFileSync(filePath, content);
                console.log(`  - Fixed ${filePath}`);
            }
        } else {
            console.log(`  - Needs Suspense wrapper: ${filePath}`);
        }
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

allPageFiles.forEach(checkAndFixFile);
console.log('Done!');
