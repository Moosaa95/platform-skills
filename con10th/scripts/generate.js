// scripts/generate.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const componentName = process.argv[2];
if (!componentName) {
  console.error("Please provide a component name");
  process.exit(1);
}

const componentDir = path.join(__dirname, "../src/components", componentName);
fs.mkdirSync(componentDir, { recursive: true });

// Create component file
const componentContent = `
import React from 'react'

interface ${componentName}Props {
  children?: React.ReactNode
}

export default function ${componentName}({ children }: ${componentName}Props) {
  return (
    <div>
      {children}
    </div>
  )
}
`;

fs.writeFileSync(path.join(componentDir, "index.tsx"), componentContent.trim());

console.log(`Component ${componentName} created successfully!`);
