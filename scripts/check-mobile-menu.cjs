const fs = require('node:fs');
const assert = require('node:assert/strict');
const WebSocket = require('next/dist/compiled/ws');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const tabs = await (await fetch('http://127.0.0.1:9223/json')).json();
  const socket = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.once('open', resolve));
  let id = 0; const pending = new Map(); const errors = [];
  socket.on('message', data => {
    const message = JSON.parse(data);
    if (message.id) { const promise = pending.get(message.id); pending.delete(message.id); message.error ? promise.reject(message.error) : promise.resolve(message.result); }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const key = ++id; pending.set(key, {resolve, reject}); socket.send(JSON.stringify({id:key, method, params})); });
  const evaluate = async expression => (await send('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true})).result.value;
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {width:1366,height:768,deviceScaleFactor:1,mobile:false});
  async function go(path) {
    await send('Page.navigate', {url:'http://127.0.0.1:3000'+path});
    for(let i=0;i<50;i++) { await wait(300); if(await evaluate('!!document.querySelector(".language-toggle") && !document.querySelector(".arrival-screen")')) return; }
    throw new Error('Page did not become ready: '+path);
  }
  await send('Emulation.setDeviceMetricsOverride', {width:320,height:568,deviceScaleFactor:1,mobile:false});
  await go('/');
  await evaluate('document.querySelector(".menu-button").click()'); await wait(1000);
  const bounds = await evaluate(`(() => { const h=document.querySelector('.home-menu-header').getBoundingClientRect(); const n=document.querySelector('.home-menu nav').getBoundingClientRect(); return {headerBottom:h.bottom, menuTop:n.top, font:getComputedStyle(document.querySelector('.home-menu li a')).fontSize, verticalOverflow:document.querySelector('dialog').scrollHeight>document.querySelector('dialog').clientHeight, horizontalOverflow:document.querySelector('dialog').scrollWidth>innerWidth}; })()`);
  assert.ok(bounds.menuTop >= bounds.headerBottom, JSON.stringify(bounds));
  assert.equal(bounds.horizontalOverflow,false); assert.equal(bounds.verticalOverflow,false);
  console.log(bounds);
  socket.close();
})().catch(error=>{console.error(error);process.exit(1)});