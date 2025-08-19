import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function analyzeLink(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content') || '';
    const ogImage = $('meta[property="og:image"]').attr('content') || '';

    return {
      url,
      title,
      description,
      ogImage,
    };
  } catch (err) {
    return { error: 'Failed to analyze link', details: err.message };
  }
}
