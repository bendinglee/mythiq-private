// skills/linkAnalysis.js
import fetch from 'node-fetch';
import cheerio from 'cheerio';

/**
 * Analyzes a URL by fetching its HTML and extracting metadata.
 * @param {string} url - The URL to analyze.
 * @returns {Promise<Object>} Metadata including title, description, and og:image.
 */
export async function analyzeLink(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content')?.trim() || '';
    const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || '';

    return {
      url,
      title,
      description,
      ogImage,
    };
  } catch (error) {
    throw new Error(`Failed to analyze link: ${error.message}`);
  }
}
