const fs = require('fs');
const path = require('path');

const files = [
    "/home/laabam/Gold_simith/src/app/blog/detail1/page.tsx",
    "/home/laabam/Gold_simith/src/app/blog/list/page.tsx",
    "/home/laabam/Gold_simith/src/app/blog/default/page.tsx",
    "/home/laabam/Gold_simith/src/app/blog/detail2/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-options/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb1/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb2/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/sidebar-list/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/fullwidth/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-dropdown/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/square/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default-list/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/variable/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/bought-together/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-canvas/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/countdown-timer/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/out-of-stock/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/thumbnail-bottom/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/sidebar/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/grouped/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/combined-two/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/one-scrolling/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/default/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/two-scrolling/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default-grid/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/sale/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/on-sale/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/external/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/fixed-price/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/discount/page.tsx",
    "/home/laabam/Gold_simith/src/app/checkout/page.tsx"
];

function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if already has Suspense import
        if (content.includes('Suspense')) {
            console.log(`Skipping ${filePath} - already has Suspense`);
            return;
        }
        
        // Add Suspense import
        if (content.includes("import React")) {
            content = content.replace(
                /import React[^;]*;/,
                match => match.replace('React', 'React, { Suspense }')
            );
        } else {
            content = "import { Suspense } from 'react';\n" + content;
        }
        
        // Find the main component name
        const componentMatch = content.match(/(?:export default function|const)\s+(\w+)\s*(?:=\s*\(\s*\)\s*=>\s*{|\(\s*\)\s*{)/);
        if (!componentMatch) {
            console.log(`Could not find component in ${filePath}`);
            return;
        }
        
        const componentName = componentMatch[1];
        const contentComponentName = componentName + 'Content';
        
        // Replace the component definition
        content = content.replace(
            new RegExp(`((?:export default function|const)\\s+)${componentName}(\\s*(?:=\\s*\\(\\s*\\)\\s*=>\\s*{|\\(\\s*\\)\\s*{))`),
            `$1${contentComponentName}$2`
        );
        
        // Add new wrapper component
        const newComponent = `
const ${componentName} = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <${contentComponentName} />
        </Suspense>
    )
}

export default ${componentName}
`;
        
        // Remove existing export default
        content = content.replace(/export default \w+\s*$/, '');
        content += newComponent;
        
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${filePath}`);
        
    } catch (error) {
        console.error(`Error fixing ${filePath}:`, error.message);
    }
}

files.forEach(fixFile);
console.log('All files processed!');
