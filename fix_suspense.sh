#!/bin/bash

# List of files that need to be fixed
files=(
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb-img/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/combined-one/page.tsx"
    "/home/laabam/Gold_simith/src/app/blog/detail1/page.tsx"
    "/home/laabam/Gold_simith/src/app/blog/list/page.tsx"
    "/home/laabam/Gold_simith/src/app/blog/default/page.tsx"
    "/home/laabam/Gold_simith/src/app/blog/detail2/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/filter-options/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb1/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/breadcrumb2/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/sidebar-list/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/fullwidth/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/filter-dropdown/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/square/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/default-list/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/variable/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/bought-together/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/filter-canvas/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/countdown-timer/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/out-of-stock/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/thumbnail-bottom/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/sidebar/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/grouped/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/combined-two/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/one-scrolling/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/default/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/default/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/two-scrolling/page.tsx"
    "/home/laabam/Gold_simith/src/app/shop/default-grid/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/sale/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/on-sale/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/external/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/fixed-price/page.tsx"
    "/home/laabam/Gold_simith/src/app/product/discount/page.tsx"
    "/home/laabam/Gold_simith/src/app/checkout/page.tsx"
)

for file in "${files[@]}"; do
    echo "Processing $file..."
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Apply the fixes
    sed -i '1s/^/import { Suspense } from '\''react'\'\';\n/' "$file"
    sed -i '/import.*useSearchParams/a import { Suspense } from '\''react'\'';' "$file"
    sed -i '/^const [A-Za-z]* = () => {$/,$s/const \([A-Za-z]*\) = () => {/const \1Content = () => {/' "$file"
    
    # Add new wrapper component at the end
    echo "
const $(basename "$file" .tsx | sed 's/page/Page/') = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <$(basename "$file" .tsx | sed 's/page/Page/')Content />
        </Suspense>
    )
}" >> "$file"
    
    echo "Processed $file"
done

echo "All files processed!"
