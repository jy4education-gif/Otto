// Small helpers: download and copy the poem
document.addEventListener('DOMContentLoaded', async function(){
  const contentEl = document.getElementById('poem-content');
  const downloadBtn = document.getElementById('download');
  const copyBtn = document.getElementById('copy');

  // Add emoji mapping per line based on keywords
  function mapLineToEmoji(line){
    const s = line.toLowerCase();
    if(!s.trim()) return '';
    if(s.includes('mops')) return '🐩';
    if(s.includes('otto')) return '👨';
    if(s.includes('fort')) return '➡️';
    if(s.includes('hopst') || s.includes('hop')) return '🐾';
    if(s.includes('soso')) return '😐';
    if(s.includes('holt')) return '📥';
    if(s.includes('koks')) return '🪨';
    if(s.includes('obst')) return '🍎';
    if(s.includes('horcht')) return '👂';
    if(s.includes('hofft')) return '🤞';
    if(s.includes('klopft')) return '🔔';
    if(s.includes('komm') || s.includes('kommt')) return '🚶';
    if(s.includes('kotzt')) return '🤮';
    if(s.includes('ogott')) return '😱';
    return '✳️';
  }

  // Load poem from gedicht.txt
  try {
    const resp = await fetch('gedicht.txt');
    const text = await resp.text();
    const lines = text.split(/\r?\n/);
    const mapped = lines.map(l => {
      const emoji = mapLineToEmoji(l);
      return l.trim() ? `${emoji} ${l}` : '';
    });
    contentEl.textContent = mapped.join('\n');
  } catch(e) {
    contentEl.textContent = 'Error loading gedicht.txt';
    console.error(e);
  }

  const pre = contentEl;

  if(downloadBtn){
    downloadBtn.addEventListener('click', function(){
      const text = pre ? pre.textContent : '';
      const blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gedicht.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  if(copyBtn){
    copyBtn.addEventListener('click', async function(){
      const text = pre ? pre.textContent : '';
      if(navigator.clipboard && navigator.clipboard.writeText){
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = 'Copied';
        setTimeout(()=> copyBtn.textContent = 'Copy', 1200);
      } else {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); copyBtn.textContent='Copied'}catch(e){}
        ta.remove(); setTimeout(()=> copyBtn.textContent='Copy',1200);
      }
    });
  }
});
