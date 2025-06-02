import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM dd, yyyy');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}