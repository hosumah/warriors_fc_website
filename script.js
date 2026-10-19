const menu=document.querySelector('.menu');const nav=document.querySelector('.site-header nav');menu?.addEventListener('click',()=>{nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='70px';nav.style.right='0';nav.style.left='0';nav.style.padding='20px 7vw';nav.style.background='#f7f0e4';nav.style.flexDirection='column';nav.style.alignItems='flex-start';nav.style.borderBottom='1px solid #e0d3bd'});

(function renderResults(){
  const host=document.getElementById('results');
  const data=window.WFC_RESULTS;
  if(!host||!data)return;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const fmt=(iso,opts)=>new Date(iso+'T12:00:00').toLocaleDateString('en-US',opts);
  const short=iso=>fmt(iso,{month:'short',day:'numeric'});
  const long=iso=>fmt(iso,{month:'short',day:'numeric',year:'numeric'}).toUpperCase();
  const outcome=m=>m.warriors>m.opponentScore?'W':m.warriors<m.opponentScore?'L':'D';
  const rows=[...data].sort((a,b)=>b.date.localeCompare(a.date));
  const matches=rows.filter(r=>r.type==='match');
  const latest=matches[0];
  let html='';
  if(latest){
    const o=outcome(latest);
    html+=`<article class="result-card">
      <div class="result-meta"><span>${esc(latest.label||'LATEST RESULT')}</span><span>FULL TIME</span></div>
      <div class="scoreline">
        <div class="team"><img src="assets/warriors-logo.jpeg" alt="Warriors FC crest"><strong>Warriors FC</strong></div>
        <div class="score"><b>${latest.warriors}</b><span>—</span><b>${latest.opponentScore}</b><small>${long(latest.date)}${latest.venue?' • '+esc(latest.venue.toUpperCase()):''}</small></div>
        <div class="team"><div class="crest-placeholder">${esc(latest.opponent[0])}</div><strong>${esc(latest.opponent)}</strong></div>
      </div>
      ${latest.scorers?`<div class="scorers">${latest.scorers.map(s=>`<span>⚽ ${esc(s)}</span>`).join('')}</div>`:''}
    </article>`;
    const w=matches.filter(m=>outcome(m)==='W').length,d=matches.filter(m=>outcome(m)==='D').length,l=matches.filter(m=>outcome(m)==='L').length;
    const gf=matches.reduce((n,m)=>n+m.warriors,0),ga=matches.reduce((n,m)=>n+m.opponentScore,0);
    html+=`<div class="record"><div><b>${matches.length}</b><span>Played</span></div><div><b>${w}</b><span>Won</span></div><div><b>${d}</b><span>Drawn</span></div><div><b>${l}</b><span>Lost</span></div><div><b>${gf}–${ga}</b><span>Goals</span></div></div>`;
  }
  html+='<h3 class="results-title">Season Results</h3><ul class="results-list">';
  for(const r of rows){
    if(r.type==='match'){
      const o=outcome(r);
      html+=`<li class="res res-${o}"><span class="res-date">${short(r.date)}</span><span class="res-vs">Warriors FC vs ${esc(r.opponent)}</span><span class="res-score">${r.warriors}–${r.opponentScore}</span><span class="res-tag">${o}</span></li>`;
    }else{
      html+=`<li class="res res-off"><span class="res-date">${short(r.date)}</span><span class="res-vs">${r.type==='bye'?'Bye week':'Games cancelled'}</span><span class="res-score">—</span><span class="res-tag">${r.type==='bye'?'BYE':'CXL'}</span></li>`;
    }
  }
  html+='</ul>';
  host.innerHTML=html;
})();

(function renderNews(){
  const host=document.getElementById('news-list');
  const data=window.WFC_NEWS;
  if(!host||!data)return;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const when=iso=>new Date(iso+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}).toUpperCase();
  host.innerHTML=[...data].sort((a,b)=>b.date.localeCompare(a.date)).map(n=>`<article class="news-card"><div class="news-image"><img src="${esc(n.image||'assets/warriors-logo.jpeg')}" alt="${n.image?'':'Warriors FC crest'}"></div><div><p class="eyebrow">${esc(n.tag)} • ${when(n.date)}</p><h3>${esc(n.title)}</h3>${n.body.map(p=>`<p>${esc(p)}</p>`).join('')}${n.link?`<a href="${esc(n.link.href)}">${esc(n.link.text)} →</a>`:''}</div></article>`).join('');
})();
