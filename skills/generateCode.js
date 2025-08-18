export default async function generateCode({ prompt }) {
  if (!prompt) throw new Error('Missing prompt');
  // Placeholder logic
  return { code: `// Generated code for: ${prompt}` };
}
