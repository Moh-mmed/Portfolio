import fs from 'fs/promises';
import path from 'path';

export async function getResumeLastUpdated(): Promise<string> {
  try {
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    const stats = await fs.stat(resumePath);
    
    return stats.mtime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Could not read resume.pdf stats:', error);
    // Fallback if file doesn't exist or isn't accessible
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
