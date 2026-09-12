/* Shared topic switcher.
   Every study guide lives in its own folder and includes this file. Add a new
   topic by appending to TOPICS and creating <id>/index.html.
   Usage: <div class="topicbar" data-active="geog3800" data-root="../"></div>
          <script src="../shared/topics.js"></script>
*/
(function(){
  var TOPICS=[
    {id:'home',    label:'All topics',                short:'Topics',     href:'index.html'},
    {id:'part107', label:'FAA Part 107',              short:'Part 107',   href:'part107/index.html'},
    {id:'geog3800',label:'GEOG 3800 Data Visualization',short:'GEOG 3800',href:'geog3800/index.html'},
    {id:'stats1045',label:'STATS 1045 Intro to Statistics',short:'STATS 1045',href:'stats1045/index.html'}
  ];
  function render(bar){
    var active=bar.getAttribute('data-active')||'home';
    var root=bar.getAttribute('data-root')||'';
    var html='<div class="topicbar-inner" role="tablist" aria-label="Study guide topics">';
    TOPICS.forEach(function(t){
      var on=t.id===active;
      html+='<a role="tab" aria-selected="'+on+'" class="topictab'+(on?' on':'')+'" href="'+root+t.href+'" title="'+t.label+'">'
        +(t.id==='home'?'☰ ':'')+'<span class="full">'+t.label+'</span><span class="short">'+t.short+'</span></a>';
    });
    html+='</div>';
    bar.innerHTML=html;
    var onEl=bar.querySelector('.topictab.on');
    if(onEl&&onEl.scrollIntoView){try{onEl.scrollIntoView({block:'nearest',inline:'center'});}catch(e){}}
  }
  function init(){
    var bars=document.querySelectorAll('.topicbar');
    for(var i=0;i<bars.length;i++)render(bars[i]);
    try{
      var active=bars.length?bars[0].getAttribute('data-active'):null;
      if(active&&active!=='home')localStorage.setItem('studyhub.lastTopic',active);
    }catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.STUDY_TOPICS=TOPICS;
})();
