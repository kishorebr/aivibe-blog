const fs = require('fs');
const path = require('path');

// Fix YAML frontmatter formatting issues
function fixYamlFrontmatter(content) {
  // Split content into frontmatter and body
  const parts = content.split('---');
  if (parts.length < 3) {
    console.log('No frontmatter found');
    return content;
  }
  
  const frontmatter = parts[1];
  const body = parts.slice(2).join('---');
  
  // Parse and fix frontmatter
  const lines = frontmatter.split('\n').filter(line => line.trim());
  const fixedLines = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    if (trimmed.startsWith('title:')) {
      const title = trimmed.substring(6).trim();
      // Remove existing quotes and add double quotes
      const cleanTitle = title.replace(/^['"]|['"]$/g, '');
      fixedLines.push(`title: "${cleanTitle}"`);
    } else if (trimmed.startsWith('date:')) {
      const date = trimmed.substring(5).trim();
      const cleanDate = date.replace(/^['"]|['"]$/g, '');
      fixedLines.push(`date: "${cleanDate}"`);
    } else if (trimmed.startsWith('excerpt:')) {
      const excerpt = trimmed.substring(8).trim();
      // Handle multiline excerpts
      if (excerpt.startsWith('>-')) {
        // Find the actual excerpt content
        let excerptContent = '';
        let i = lines.indexOf(line) + 1;
        while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
          if (lines[i].trim()) {
            excerptContent += lines[i].trim() + ' ';
          }
          i++;
        }
        fixedLines.push(`excerpt: "${excerptContent.trim()}"`);
        // Skip the processed lines
        continue;
      } else {
        const cleanExcerpt = excerpt.replace(/^['"]|['"]$/g, '');
        fixedLines.push(`excerpt: "${cleanExcerpt}"`);
      }
    } else if (trimmed.startsWith('coverImage:')) {
      const image = trimmed.substring(11).trim();
      if (image.startsWith('>-')) {
        // Find the actual image URL
        let imageUrl = '';
        let i = lines.indexOf(line) + 1;
        while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
          if (lines[i].trim()) {
            imageUrl = lines[i].trim();
            break;
          }
          i++;
        }
        fixedLines.push(`coverImage: "${imageUrl}"`);
      } else {
        const cleanImage = image.replace(/^['"]|['"]$/g, '');
        fixedLines.push(`coverImage: "${cleanImage}"`);
      }
    } else if (trimmed.startsWith('author:')) {
      const author = trimmed.substring(7).trim();
      const cleanAuthor = author.replace(/^['"]|['"]$/g, '');
      fixedLines.push(`author: "${cleanAuthor}"`);
    } else if (trimmed.startsWith('category:')) {
      const category = trimmed.substring(9).trim();
      const cleanCategory = category.replace(/^['"]|['"]$/g, '');
      fixedLines.push(`category: "${cleanCategory}"`);
    } else if (trimmed.startsWith('source:')) {
      const source = trimmed.substring(7).trim();
      if (source.startsWith('>-')) {
        // Find the actual source URL
        let sourceUrl = '';
        let i = lines.indexOf(line) + 1;
        while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) {
          if (lines[i].trim()) {
            sourceUrl = lines[i].trim();
            break;
          }
          i++;
        }
        fixedLines.push(`source: "${sourceUrl}"`);
      } else {
        const cleanSource = source.replace(/^['"]|['"]$/g, '');
        fixedLines.push(`source: "${cleanSource}"`);
      }
    } else if (trimmed === 'tags:') {
      fixedLines.push('tags:');
      // Process tag lines
      let i = lines.indexOf(line) + 1;
      while (i < lines.length && lines[i].startsWith('  -')) {
        const tag = lines[i].substring(3).trim().replace(/^['"]|['"]$/g, '');
        fixedLines.push(`  - "${tag}"`);
        i++;
      }
    } else if (trimmed.startsWith('  -') && fixedLines[fixedLines.length - 1] === 'tags:') {
      // This should be handled in the tags section above
      continue;
    } else {
      // Keep other lines as is
      fixedLines.push(trimmed);
    }
  }
  
  return `---\n${fixedLines.join('\n')}\n---${body}`;
}

// Main function to fix all posts
function fixAllPosts() {
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  
  if (!fs.existsSync(postsDir)) {
    console.log('Posts directory not found');
    return;
  }
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} markdown files to process`);
  
  let fixedCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    try {
      const filepath = path.join(postsDir, file);
      const content = fs.readFileSync(filepath, 'utf8');
      
      const fixedContent = fixYamlFrontmatter(content);
      
      if (fixedContent !== content) {
        fs.writeFileSync(filepath, fixedContent, 'utf8');
        console.log(`Fixed: ${file}`);
        fixedCount++;
      } else {
        console.log(`No changes needed: ${file}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\nSummary:`);
  console.log(`- Files processed: ${files.length}`);
  console.log(`- Files fixed: ${fixedCount}`);
  console.log(`- Errors: ${errorCount}`);
}

// Run the script
fixAllPosts();