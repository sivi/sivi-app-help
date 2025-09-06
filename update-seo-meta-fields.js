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
  
  // Check if front matter already exists
  let frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  let frontMatterMatch = content.match(frontMatterRegex);
  
  if (frontMatterMatch) {
    // Front matter exists, extract it
    let frontMatter = frontMatterMatch[1];
    
    // Check if the front matter already has the new SEO fields
    let hasSeoTitle = /seo_title:/.test(frontMatter);
    let hasMetaDescription = /meta_description:/.test(frontMatter);
    
    // If not, add them while preserving existing front matter
    let updatedFrontMatter = frontMatter;
    
    // Generate appropriate SEO title and meta description
    const seoTitle = `${cleanPageTopic} | Sivi AI Design Guide for ${cleanPageCategory || 'Designers'}`;
    const metaDescription = `Learn about ${cleanPageTopic.toLowerCase()} in Sivi AI - Complete guide for creating professional ${cleanPageCategory.toLowerCase() || 'brand'} designs with AI-powered tools.`;
    
    if (!hasSeoTitle) {
      updatedFrontMatter += `\nseo_title: "${seoTitle}"`;
    }
    
    if (!hasMetaDescription) {
      updatedFrontMatter += `\nmeta_description: "${metaDescription}"`;
    }
    
    // Replace the original front matter with the updated one
    if (frontMatter !== updatedFrontMatter) {
      content = content.replace(frontMatterRegex, `---\n${updatedFrontMatter}\n---\n\n`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated SEO meta in: ${filePath}`);
      return true;
    }
  }
  
  return false;
}

// Main function
function updateSeoMeta() {
  console.log('Starting SEO meta fields update...');
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
  
  console.log(`SEO meta fields update complete. Updated ${updatedCount} of ${markdownFiles.length} files.`);
}

updateSeoMeta();
