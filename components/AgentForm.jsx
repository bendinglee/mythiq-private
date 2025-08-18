import { useState } from 'react';

const skills = ['analyzeLink', 'generateCode']; // Can be dynamic later

export default function AgentForm() {
  const [skill, setSkill] = useState(skills[0]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const res = await fetch('http://localhost:3000/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill,
          input: skill === 'analyzeLink' ? { url: input } : { prompt: input },
        }),
      });

      const data = await res.json();
      if (res.ok) setResult(data.result);
      else setError(data.error);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🧠 Moe Agent</h2>

      <label>
        Skill:
        <select value={skill} onChange={(e) => setSkill(e.target.value)}>
          {skills.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <label>
        Input:
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={skill === 'analyzeLink' ? 'Enter URL' : 'Enter prompt'}
        />
      </label>

      <button type="submit">Run Skill</button>

      {result && (
        <pre style={{ background: '#eee', padding: '1em' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </form>
  );
}
