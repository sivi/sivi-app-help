const fs = require('fs');
const path = require('path');
const docsDir = path.join(__dirname, 'docs');

// Function to recursively get all markdown files
function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fileList = getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Process each markdown file
function processMdFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(docsDir, filePath);
  const pathParts = relativePath.split(path.sep);
  
  // Generate appropriate keywords based on the file path and name
  const fileName = path.basename(filePath, '.md');
  let pageCategory = pathParts.length > 1 ? pathParts[1] : '';
  
  // If filename is index.md, use parent directory name as the main topic
  const pageTopic = fileName === 'index' && pathParts.length > 2 ? pathParts[pathParts.length - 2] : fileName;
  
  // Clean up topic and category names (replace hyphens with spaces and capitalize)
  const cleanPageTopic = pageTopic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const cleanPageCategory = pageCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Generate keywords from the file path and name
  let keywords = [`Sivi AI`, `Design AI`];
  if (cleanPageCategory) keywords.push(cleanPageCategory);
  if (cleanPageTopic && cleanPageTopic !== cleanPageCategory) keywords.push(cleanPageTopic);
  
  // Add more topic-specific keywords
  keywords = keywords.concat(cleanPageTopic.split(' '));
  
  // Check if front matter already exists
  let frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  let frontMatterMatch = content.match(frontMatterRegex);
  
  if (frontMatterMatch) {
    // Front matter exists, update it
    let frontMatter = frontMatterMatch[1];
    
    // Check if the front matter already has these fields
    let hasTitle = /title:/.test(frontMatter);
    let hasDescription = /description:/.test(frontMatter);
    let hasKeywords = /keywords:/.test(frontMatter);
    
    // Check for any custom SEO fields that are not standard
    const hasNonStandardSeoFields = /seo_title:|meta_description:|head:/.test(frontMatter);
    
    // If has non-standard fields, remove them
    if (hasNonStandardSeoFields) {
      frontMatter = frontMatter
        .replace(/seo_title:.*\n/, '')
        .replace(/meta_description:.*\n/, '')
        .replace(/head:[\s\S]*?(?=\n\w|$)/g, '');
      
      // Clean up any double newlines
      frontMatter = frontMatter.replace(/\n\n+/g, '\n\n').trim();
    }
    
    // Generate appropriate description
    const description = `Learn how to use ${cleanPageTopic.toLowerCase()} in Sivi AI to create professional ${cleanPageCategory.toLowerCase() || 'brand'} designs with AI-powered tools.`;
    
    // Only add title if it doesn't exist
    if (!hasTitle) {
      frontMatter += `\ntitle: "${cleanPageTopic}"`;
    }
    
    // Only add description if it doesn't exist
    if (!hasDescription) {
      frontMatter += `\ndescription: "${description}"`;
    }
    
    // Only add keywords if they don't exist
    if (!hasKeywords) {
      frontMatter += `\nkeywords: [${keywords.map(k => `"${k}"`).join(', ')}]`;
    }
    
    // Replace the original front matter with the updated one
    content = content.replace(frontMatterRegex, `---\n${frontMatter}\n---\n\n`);
  } else {
    // Front matter doesn't exist, add it
    const description = `Learn how to use ${cleanPageTopic.toLowerCase()} in Sivi AI to create professional ${cleanPageCategory.toLowerCase() || 'brand'} designs with AI-powered tools.`;
    
    const newFrontMatter = `---
title: "${cleanPageTopic}"
description: "${description}"
keywords: [${keywords.map(k => `"${k}"`).join(', ')}]
---\n\n`;
    
    content = newFrontMatter + content;
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated SEO meta in: ${filePath}`);
  return true;
}

// Main function
function updateSeoMeta() {
  console.log('Starting standard SEO meta update...');
  const markdownFiles = getAllMarkdownFiles(docsDir);
  
  let updatedCount = 0;
  markdownFiles.forEach(filePath => {
    try {
      const wasUpdated = processMdFile(filePath);
      if (wasUpdated) updatedCount++;
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  });
  
  console.log(`Standard SEO meta update complete. Updated ${updatedCount} of ${markdownFiles.length} files.`);
}

updateSeoMeta();
