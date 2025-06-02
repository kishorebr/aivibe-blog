const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to strip HTML tags and create clean excerpt
function stripHtmlAndCreateExcerpt(text, maxLength = 150) {
  // Remove HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, '');
  // Remove extra whitespace and newlines
  const cleaned = withoutHtml.replace(/\s+/g, ' ').trim();
  // Truncate to maxLength
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  return cleaned.substring(0, maxLength).trim() + '...';
}

function fixPostExcerpts() {
  const postsDirectory = path.join(__dirname, '..', 'content', 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    console.log('Posts directory not found');
    return;
  }

  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} posts to fix`);

  files.forEach(file => {
    const filePath = path.join(postsDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // Check if excerpt contains HTML tags
    if (frontmatter.excerpt && frontmatter.excerpt.includes('<')) {
      console.log(`Fixing excerpt for: ${file}`);
      
      // Create clean excerpt from content instead of the HTML-filled excerpt
      const cleanExcerpt = stripHtmlAndCreateExcerpt(content);
      frontmatter.excerpt = cleanExcerpt;
      
      // Write updated content back to file
      const updatedContent = matter.stringify(content, frontmatter);
      fs.writeFileSync(filePath, updatedContent);
      
      console.log(`✓ Fixed ${file}`);
    } else {
      console.log(`✓ ${file} - excerpt already clean`);
    }
  });

  console.log('Excerpt fixing completed!');
}

// Run the fix
fixPostExcerpts();