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
  fs.mkdirSync('tmp',{recursive:true});
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:700,deviceScaleFactor:1,mobile:true});
  await send('Emulation.setTouchEmulationEnabled',{enabled:true});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await go('/');
  await evaluate('document.documentElement.dataset.theme="light"');
  await wait(700); const rest=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync('tmp/mobile-home.png',Buffer.from(rest.data,'base64'));
  await evaluate('document.querySelectorAll(".home-name")[0].click()'); await wait(1100);
  let shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync('tmp/mobile-name.png',Buffer.from(shot.data,'base64'));
  await evaluate('document.querySelector(".menu-button").click()');await wait(1100);
  shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync('tmp/mobile-menu.png',Buffer.from(shot.data,'base64'));
  console.log(await evaluate('({canvas:!!document.querySelector("canvas"),mode:document.body.dataset.homeInteraction,menuOverflow:document.querySelector("dialog").scrollHeight>document.querySelector("dialog").clientHeight})'));
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(500);
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".static-menu-sculptures")).display'),'block');
  console.log('Reduced-motion fallback OK');
  socket.close();
})().catch(error=>{console.error(error);process.exit(1)});