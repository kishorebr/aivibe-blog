const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Category-specific images from Unsplash
const categoryImages = {
  'Smart Home': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&auto=format',
  'Productivity': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop&auto=format',
  'Finance': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop&auto=format',
  'Healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop&auto=format',
  'Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop&auto=format',
  'Transportation': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=200&fit=crop&auto=format',
  'General AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format'
};

const defaultImage = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop&auto=format';

function updatePostImages() {
  const postsDirectory = path.join(__dirname, '..', 'content', 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    console.log('Posts directory not found');
    return;
  }

  const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} posts to update`);

  files.forEach(file => {
    const filePath = path.join(postsDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // Update cover image based on category
    const category = frontmatter.category || 'General AI';
    const newCoverImage = categoryImages[category] || defaultImage;

    // Update if the current image is a local path or broken
    if (!frontmatter.coverImage || 
        frontmatter.coverImage.startsWith('/images/') || 
        frontmatter.coverImage === '/images/ai-cover.svg') {
      frontmatter.coverImage = newCoverImage;
      
      // Write updated content back to file
      const updatedContent = matter.stringify(content, frontmatter);
      fs.writeFileSync(filePath, updatedContent);
      
      console.log(`Updated ${file} with ${category} image`);
    } else {
      console.log(`Skipped ${file} - already has valid image`);
    }
  });

  console.log('Image update completed!');
}

// Run the update
updatePostImages();