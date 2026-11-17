window.addDemoEvents=function(data){
 if(data.demoTimelineV1)return data;
 const known=['F1','F2','F3','F4','F5','C1','C2','C3','C4','C5','S1','S2','S3','S4','S5','W1','W2','W3','W4','W5','M1','M2','M3','M4','M5','L1','L2','L3','L4'];
 for(const p of data.people){
  if(p.id==='F1'&&Array.isArray(p.events)&&p.events.length===2&&p.events.every(e=>e.date==='2026-11-01'&&['首次联系','跟进联系'].includes(e.type)&&['','临时测试'].includes(e.note||''))&&new Set(p.events.map(e=>e.type)).size===2)p.events=[];
  if(!known.includes(p.id)||!String(p.source||'').includes('模拟')||Array.isArray(p.events)&&p.events.length)continue;
  const i=known.indexOf(p.id), day=10+(i%12), date=n=>`2026-10-${String(n).padStart(2,'0')}`;
  const rows=[{date:date(day),type:'加入人才池',note:'演示设定：建立候选人记录。'}];
  if(i%4!==3)rows.push({date:date(day+1),type:i%3===0?'跟进联系':'首次联系',note:'演示设定：了解岗位兴趣与基本情况。'});
  rows.push({date:date(day+2),type:'完成初筛',note:'演示设定：依据案例资料进行初步评估。'});
  rows.push({date:date(day+3),type:p.status==='推荐'?'推荐':p.status==='储备'?'暂列储备':'不优先',note:p.status==='推荐'?'演示设定：岗位相关线索较好，仍需核验。':p.status==='储备'?'演示设定：存在待确认条件。':'演示设定：岗位匹配或意愿不足。'});
  p.events=rows;
 }
 data.demoTimelineV1=true;return data;
};
