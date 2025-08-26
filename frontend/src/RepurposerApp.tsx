import React, { useCallback, useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://127.0.0.1:8000';

interface ProcessResponse {
  id: string;
  input_url: string;
  summary: string;
  blog_draft?: string;
  linkedin_post?: string;
  twitter_thread?: string;
  thumbnail_texts?: string[];
}

const TONES = ['professional','casual','enthusiastic','authoritative'] as const;
const OUTPUT_OPTIONS = ['blog','linkedin','twitter','thumbnail'] as const;

const defaultAudience = 'founders, marketers';

const CopyButton: React.FC<{ text?: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  if (!text) return null;
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),1500); }}
      className="text-xs px-2 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
    >{copied ? 'Copied' : 'Copy'}</button>
  );
};

const Pill: React.FC<React.PropsWithChildren<{ active?: boolean; onClick?: () => void }>> = ({ active, onClick, children }) => (
  <button type="button" onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/70 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-800'}`}>{children}</button>
);

const RepurposerApp: React.FC = () => {
  const [url, setUrl] = useState('');
  const [tone, setTone] = useState<string>('professional');
  const [audience, setAudience] = useState(defaultAudience);
  const [language, setLanguage] = useState('en');
  const [outputs, setOutputs] = useState<string[]>(['blog','linkedin','twitter','thumbnail']);
  const [fastMode, setFastMode] = useState(false);
  const [result, setResult] = useState<ProcessResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<string | null>(null);

  useEffect(()=>{ fetch(`${API_BASE}/health`).then(r=>r.json()).then(d=>setHealth(d.status)).catch(()=>setHealth(null)); },[]);

  const toggleOutput = (o: string) => setOutputs(prev => prev.includes(o) ? prev.filter(x=>x!==o) : [...prev, o]);
  const canSubmit = useMemo(()=> url.trim() !== '' && outputs.length>0 && !loading, [url, outputs, loading]);

  const handleSubmit = useCallback(async (e: React.FormEvent)=>{
    e.preventDefault(); if(!canSubmit) return; setLoading(true); setError(null); setResult(null);
    try{
      const body = { url: url.trim(), tone, audience: audience.trim() || defaultAudience, language: language.trim() || 'en', outputs, fast_mode: fastMode };
      const res = await fetch(`${API_BASE}/process`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
      if(!res.ok){ throw new Error(`API ${res.status}: ${await res.text()}`); }
      const data: ProcessResponse = await res.json(); setResult(data);
    }catch(err:any){ setError(err.message || 'Unknown error'); } finally { setLoading(false); }
  },[url,tone,audience,language,outputs,fastMode,canSubmit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Repurposer</h1>
          <div className="text-xs flex gap-3 items-center">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${health==='ok' ? 'border-green-500 text-green-600':'border-gray-400 text-gray-500'}`}>
              <span className={`w-2 h-2 rounded-full ${health==='ok' ? 'bg-green-500':'bg-gray-400'}`}></span>
              API {health ?? '…'}
            </span>
            <span className="text-gray-500 dark:text-gray-400">v1.0 • Gemini</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-white/70 dark:bg-gray-950/60 p-5 md:p-8 backdrop-blur-sm">
          <div>
            <label className="block text-sm font-medium mb-1">YouTube URL</label>
            <input type="url" required value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Tone (click)</label>
              <div className="flex flex-wrap gap-2">{TONES.map(t=><Pill key={t} active={tone===t} onClick={()=>setTone(t)}>{t}</Pill>)}</div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <input value={language} onChange={e=>setLanguage(e.target.value)} className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Audience</label>
            <input value={audience} onChange={e=>setAudience(e.target.value)} className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Outputs (toggle)</label>
            <div className="flex flex-wrap gap-2">{OUTPUT_OPTIONS.map(o=> <Pill key={o} active={outputs.includes(o)} onClick={()=>toggleOutput(o)}>{o}</Pill>)}</div>
          </div>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={fastMode} onChange={e=>setFastMode(e.target.checked)} className="h-4 w-4" />
              Fast mode (short preview)
            </label>
          </div>
          {error && <div className="text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-md px-3 py-2 bg-red-50 dark:bg-red-950/40">{error}</div>}
          <div className="flex flex-col sm:flex-row gap-3">
            <button disabled={!canSubmit} className={`inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium shadow transition ${canSubmit ? 'bg-indigo-600 hover:bg-indigo-700 text-white':'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'}`} type="submit">
              {loading && <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-r-transparent rounded-full"></span>} Generate
            </button>
            <button type="button" onClick={()=>{ setResult(null); setError(null); }} className="text-sm px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800">Reset</button>
          </div>
        </form>

        {result && <section className="mt-10 space-y-8">
          <div className="rounded-2xl border p-4 md:p-6 bg-white/70 dark:bg-gray-950/60">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Summary</h2>
              <div className="flex gap-2"><CopyButton text={result.summary} /></div>
            </div>
            <pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{result.summary}</pre>
          </div>
          {result.blog_draft && <div className="rounded-2xl border p-4 md:p-6 bg-white/70 dark:bg-gray-950/60"><div className="flex items-center justify-between mb-2"><h2 className="text-xl font-semibold">Blog Draft</h2><CopyButton text={result.blog_draft} /></div><pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{result.blog_draft}</pre></div>}
          {result.linkedin_post && <div className="rounded-2xl border p-4 md:p-6 bg-white/70 dark:bg-gray-950/60"><div className="flex items-center justify-between mb-2"><h2 className="text-xl font-semibold">LinkedIn Post</h2><CopyButton text={result.linkedin_post} /></div><pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{result.linkedin_post}</pre></div>}
          {result.twitter_thread && <div className="rounded-2xl border p-4 md:p-6 bg-white/70 dark:bg-gray-950/60"><div className="flex items-center justify-between mb-2"><h2 className="text-xl font-semibold">Twitter/X Thread</h2><CopyButton text={result.twitter_thread} /></div><pre className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{result.twitter_thread}</pre></div>}
          {Array.isArray(result.thumbnail_texts) && result.thumbnail_texts.length>0 && <div className="rounded-2xl border p-4 md:p-6 bg-white/70 dark:bg-gray-950/60"><div className="flex items-center justify-between mb-2"><h2 className="text-xl font-semibold">Thumbnail Texts</h2><CopyButton text={(result.thumbnail_texts||[]).join('\n')} /></div><ul className="grid gap-2 sm:grid-cols-2">{result.thumbnail_texts.map((t,i)=><li key={i} className="px-3 py-2 rounded-xl border bg-gray-50 dark:bg-gray-900 text-sm">{t}</li>)}</ul></div>}
        </section>}

        {!result && <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">{loading ? <span className="inline-flex items-center gap-2"><span className="animate-spin inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full"></span> Processing…</span> : <span>Results will appear here after you click Generate.</span>}</div>}

        <footer className="mt-12 text-xs text-gray-500 dark:text-gray-400"><div>Service: Repurposer • Frontend demo • v1.0</div></footer>
      </div>
    </div>
  );
};

export default RepurposerApp;
