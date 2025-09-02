const fs = require('fs');

const problematicFiles = [
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb1/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default-grid/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default-list/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-canvas/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-dropdown/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-options/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/fullwidth/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/sidebar-list/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/square/page.tsx",
];

function fixFunctionSyntax(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix broken function syntax like "const NameContentContent = () {"
        content = content.replace(/const (\w+)ContentContent = \(\) \{/g, 'const $1Content = () => {');
        
        // Fix any other malformed functions
        content = content.replace(/= \(\) \{/g, ' = () => {');
        
        fs.writeFileSync(filePath, content);
        console.log(`Fixed function syntax in ${filePath}`);
        
    } catch (error) {
        console.error(`Error fixing ${filePath}:`, error.message);
    }
}

problematicFiles.forEach(fixFunctionSyntax);
console.log('All function syntax fixed!');
