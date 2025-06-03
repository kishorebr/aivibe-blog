const fs = require('fs');
const path = require('path');

// Clean and fix YAML frontmatter
function cleanYamlFrontmatter(content) {
  // Split content into frontmatter and body
  const parts = content.split('---');
  if (parts.length < 3) {
    console.log('No frontmatter found');
    return content;
  }
  
  let frontmatter = parts[1];
  let body = parts.slice(2).join('---');
  
  // Remove any duplicate content that got mixed into the body
  body = body.replace(/^[\s\S]*?# /, '# ');
  
  // Parse frontmatter lines
  const lines = frontmatter.split('\n');
  const cleanedLines = [];
  let inTags = false;
  let skipNext = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (skipNext) {
      skipNext = false;
      continue;
    }
    
    if (!trimmed) continue;
    
    // Handle title
    if (trimmed.startsWith('title:')) {
      let title = trimmed.substring(6).trim();
      
      // Handle multiline titles
      if (title === '">-"' || title === "'>-'") {
        // Get the actual title from next lines
        let actualTitle = '';
        let j = i + 1;
        while (j < lines.length && !lines[j].includes(':')) {
          if (lines[j].trim()) {
            actualTitle += lines[j].trim() + ' ';
          }
          j++;
        }
        title = `"${actualTitle.trim()}"`;
        i = j - 1; // Skip processed lines
      } else {
        // Clean existing quotes
        title = title.replace(/^['"]|['"]$/g, '');
        title = `"${title}"`;
      }
      
      cleanedLines.push(`title: ${title}`);
      continue;
    }
    
    // Handle date
    if (trimmed.startsWith('date:')) {
      let date = trimmed.substring(5).trim();
      date = date.replace(/^['"]|['"]$/g, '');
      cleanedLines.push(`date: "${date}"`);
      continue;
    }
    
    // Handle excerpt
    if (trimmed.startsWith('excerpt:')) {
      let excerpt = trimmed.substring(8).trim();
      
      // Handle multiline excerpts
      if (excerpt === '">-"' || excerpt === "'>-'" || excerpt.startsWith('"') && !excerpt.endsWith('"')) {
        let actualExcerpt = '';
        let j = i + 1;
        
        // If excerpt starts with quote but doesn't end, find the end
        if (excerpt.startsWith('"') && !excerpt.endsWith('"')) {
          actualExcerpt = excerpt.substring(1); // Remove starting quote
        }
        
        while (j < lines.length && !lines[j].includes(':')) {
          const nextLine = lines[j].trim();
          if (nextLine) {
            actualExcerpt += nextLine + ' ';
          }
          j++;
        }
        
        excerpt = `"${actualExcerpt.trim()}"`;
        i = j - 1; // Skip processed lines
      } else {
        excerpt = excerpt.replace(/^['"]|['"]$/g, '');
        excerpt = `"${excerpt}"`;
      }
      
      cleanedLines.push(`excerpt: ${excerpt}`);
      continue;
    }
    
    // Handle coverImage
    if (trimmed.startsWith('coverImage:')) {
      let image = trimmed.substring(11).trim();
      
      // Handle multiline images
      if (image === '">-"' || image === "'>-'" || image.startsWith('"') && !image.endsWith('"')) {
        let actualImage = '';
        let j = i + 1;
        
        if (image.startsWith('"') && !image.endsWith('"')) {
          actualImage = image.substring(1);
        }
        
        while (j < lines.length && !lines[j].includes(':')) {
          const nextLine = lines[j].trim();
          if (nextLine && nextLine.startsWith('http')) {
            actualImage = nextLine;
            break;
          }
          j++;
        }
        
        image = `"${actualImage}"`;
        i = j; // Skip processed lines
      } else {
        image = image.replace(/^['"]|['"]$/g, '');
        image = `"${image}"`;
      }
      
      cleanedLines.push(`coverImage: ${image}`);
      continue;
    }
    
    // Handle author
    if (trimmed.startsWith('author:')) {
      let author = trimmed.substring(7).trim();
      author = author.replace(/^['"]|['"]$/g, '');
      cleanedLines.push(`author: "${author}"`);
      continue;
    }
    
    // Handle category
    if (trimmed.startsWith('category:')) {
      let category = trimmed.substring(9).trim();
      category = category.replace(/^['"]|['"]$/g, '');
      cleanedLines.push(`category: "${category}"`);
      continue;
    }
    
    // Handle source
    if (trimmed.startsWith('source:')) {
      let source = trimmed.substring(7).trim();
      
      // Handle multiline sources
      if (source === '">-"' || source === "'>-'" || source.startsWith('"') && !source.endsWith('"')) {
        let actualSource = '';
        let j = i + 1;
        
        if (source.startsWith('"') && !source.endsWith('"')) {
          actualSource = source.substring(1);
        }
        
        while (j < lines.length && !lines[j].includes(':')) {
          const nextLine = lines[j].trim();
          if (nextLine && nextLine.startsWith('http')) {
            actualSource = nextLine;
            break;
          }
          j++;
        }
        
        source = `"${actualSource}"`;
        i = j; // Skip processed lines
      } else {
        source = source.replace(/^['"]|['"]$/g, '');
        source = `"${source}"`;
      }
      
      cleanedLines.push(`source: ${source}`);
      continue;
    }
    
    // Handle tags
    if (trimmed === 'tags:') {
      cleanedLines.push('tags:');
      inTags = true;
      
      // Process tag lines
      let j = i + 1;
      const processedTags = new Set();
      
      while (j < lines.length) {
        const tagLine = lines[j];
        const tagTrimmed = tagLine.trim();
        
        if (tagTrimmed.startsWith('- ')) {
          let tag = tagTrimmed.substring(2).trim();
          tag = tag.replace(/^['"]|['"]$/g, '');
          
          if (!processedTags.has(tag)) {
            cleanedLines.push(`  - "${tag}"`);
            processedTags.add(tag);
          }
          j++;
        } else if (tagTrimmed.includes(':')) {
          // Hit next field
          break;
        } else {
          j++;
        }
      }
      
      i = j - 1; // Skip processed lines
      inTags = false;
      continue;
    }
    
    // Skip duplicate tag lines
    if (trimmed.startsWith('- ') && !inTags) {
      continue;
    }
    
    // Skip lines that look like duplicated content
    if (trimmed.startsWith('http') && (
      cleanedLines.some(line => line.includes(trimmed)) ||
      i > 0 && lines[i-1].includes('coverImage') ||
      i > 0 && lines[i-1].includes('source')
    )) {
      continue;
    }
  }
  
  return `---\n${cleanedLines.join('\n')}\n---\n${body}`;
}

// Main function to clean all posts
function cleanAllPosts() {
  const postsDir = path.join(__dirname, '..', 'content', 'posts');
  
  if (!fs.existsSync(postsDir)) {
    console.log('Posts directory not found');
    return;
  }
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} markdown files to clean`);
  
  let cleanedCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    try {
      const filepath = path.join(postsDir, file);
      const content = fs.readFileSync(filepath, 'utf8');
      
      const cleanedContent = cleanYamlFrontmatter(content);
      
      if (cleanedContent !== content) {
        fs.writeFileSync(filepath, cleanedContent, 'utf8');
        console.log(`Cleaned: ${file}`);
        cleanedCount++;
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
  console.log(`- Files cleaned: ${cleanedCount}`);
  console.log(`- Errors: ${errorCount}`);
}

// Run the script
cleanAllPosts();