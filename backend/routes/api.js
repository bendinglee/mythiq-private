import express from 'express';
import { analyzeLink } from '../../skills/linkAnalysis.js';
import { generateCode } from '../../skills/codeGen.js';

const router = express.Router();

// POST /analyze — Extract metadata from a URL
router.post('/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  try {
    const result = await analyzeLink(url);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed', details: err.message });
  }
});

// POST /generate — Generate code from a prompt
router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const code = await generateCode(prompt);
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: 'Code generation failed', details: err.message });
  }
});

export default router;
