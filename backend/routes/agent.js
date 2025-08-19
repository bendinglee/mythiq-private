import express from 'express';
import skills from '../../skills/index.js';  // ✅ correct (to repo-root/skills)

const router = express.Router();

router.post('/', async (req, res) => {
  const { skill, input } = req.body;

  if (!skill || !skills[skill]) {
    return res.status(400).json({ error: 'Invalid or missing skill name' });
  }

  try {
    const result = await skills[skill](input);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
