const fs = require('fs');

const files = [
    "/home/laabam/Gold_simith/src/app/checkout/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/default/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/sidebar/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb1/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb2/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-options/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/sidebar-list/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/fullwidth/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-dropdown/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/square/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default-list/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/bought-together/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/filter-canvas/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/countdown-timer/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/out-of-stock/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/grouped/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/combined-two/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/one-scrolling/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default/page.tsx",
    "/home/laabam/Gold_simith/src/app/shop/default-grid/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/on-sale/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/external/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/fixed-price/page.tsx",
    "/home/laabam/Gold_simith/src/app/product/discount/page.tsx"
];

function fixImportSyntax(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix the broken import syntax
        content = content.replace(
            /import React, { Suspense }, { ([^}]+) } from 'react'/g,
            "import React, { Suspense, $1 } from 'react'"
        );
        
        content = content.replace(
            /import React, { Suspense }, { useState, useEffect } from 'react'/g,
            "import React, { Suspense, useState, useEffect } from 'react'"
        );
        
        fs.writeFileSync(filePath, content);
        console.log(`Fixed import syntax in ${filePath}`);
        
    } catch (error) {
        console.error(`Error fixing ${filePath}:`, error.message);
    }
}

files.forEach(fixImportSyntax);
console.log('All import syntax fixed!');
