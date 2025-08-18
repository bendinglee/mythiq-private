export default async function analyzeLink({ url }) {
  if (!url) throw new Error('Missing URL');
  // Placeholder logic
  return { summary: `Pretend analysis of ${url}` };
}
