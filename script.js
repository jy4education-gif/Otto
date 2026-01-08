// Small helpers: download and copy the poem
document.addEventListener('DOMContentLoaded', function(){
  const pre = document.querySelector('#poem pre');
  const downloadBtn = document.getElementById('download');
  const copyBtn = document.getElementById('copy');

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
