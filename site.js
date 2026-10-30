/* Markdown refresh: the public page HTML works even if the external Markdown library is unavailable. */
(function(){
 'use strict';
 const node=document.getElementById('page-content');
 if(!node)return;
 const params=new URLSearchParams(location.search);
 const slug=params.get('slug');
 let source=node.getAttribute('data-source');
 const isGeneric=!!node.getAttribute('data-post-generic');
 if(isGeneric){
   if(!slug||!/^[a-z0-9][a-z0-9-]{0,100}$/.test(slug)){
     node.innerHTML='<h1>Article not found</h1><p><a href="blog.html">Back to Blog and Note</a></p>';return;
   }
   source='post--'+slug+'.md';
 }
 const cleanFrontMatter=raw=>raw.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n/,'').replace(/^\{:\s*[^}]+\}\s*$/gm,'');
 async function refresh(){
   if(!source||!window.marked)return;
   try{
     const res=await fetch(source,{cache:'no-store'});
     if(!res.ok)throw new Error('HTTP '+res.status);
     const raw=await res.text();
     // Markdown content is maintained by the owner of this website.
     node.innerHTML=window.marked.parse(cleanFrontMatter(raw));
     const seen=new Map();
     for(const h of node.querySelectorAll('h1,h2,h3,h4,h5,h6')){
       const base=(h.textContent||'section').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section';
       const num=(seen.get(base)||0)+1;seen.set(base,num);
       h.id=num===1?base:base+'-'+num;
     }
     if(isGeneric){
       const m=raw.match(/^title:\s*["']?([^\r\n"']+)/m);
       if(m)document.title=m[1]+' | Ngoc-Sang Pham';
     }
     const math=window.MathJax;
     if(math){
       try{
         if(math.startup&&math.startup.promise) await math.startup.promise;
         if(math.typesetClear)math.typesetClear([node]);
         if(math.typesetPromise)await math.typesetPromise([node]);
       }catch(e){console.warn('Math display issue',e);}
     }
   }catch(err){
     console.warn('Markdown refresh failed:',source,err);
     if(isGeneric)node.innerHTML='<h1>Article not found</h1><p>Check the filename in the repository. <a href="blog.html">Back to Blog and Note</a></p>';
   }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh);else refresh();
})();