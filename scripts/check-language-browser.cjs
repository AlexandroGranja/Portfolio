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
  await go('/');
  if (await evaluate('document.documentElement.lang') === 'en') { await evaluate('document.querySelector(".language-toggle").click()'); await wait(100); }
  await evaluate('document.querySelector(".language-toggle").click()'); await wait(400);
  assert.equal(await evaluate('document.documentElement.lang'), 'en');
  assert.match(await evaluate('document.querySelector("h1").innerText'), /Full-stack Developer/i);
  const paths = ['/projetos/','/sobre/','/contato/','/projetos/fortao-premios/','/projetos/roteiro-prosper/','/projetos/sistema-de-chamados/','/projetos/cardapio-online/','/projetos/processador-xml/','/projetos/moraes-adesivos/'];
  for(const path of paths) {
    await go(path);
    const state = await evaluate('({lang:document.documentElement.lang, title:document.querySelector("h1")?.innerText, text:document.querySelector("main").innerText, overflow:document.documentElement.scrollWidth>innerWidth})');
    assert.equal(state.lang,'en'); assert.equal(state.overflow,false, path+' horizontal overflow');
    assert.doesNotMatch(state.text, /Todos os projetos|Próximo projeto|Desenvolvi|Meu papel|Tecnologias|Sobre mim|Redes sociais/);
    if(path === '/sobre/') {
      assert.match(await evaluate('document.querySelector(".about-editorial-links a").href'), /Resume.pdf/);
      await evaluate('document.querySelectorAll("[role=tab]")[1].click()'); await wait(200);
      assert.match(await evaluate('document.querySelector("main").innerText'), /July 2026 to present/i);
    }
    console.log(path, state.title, 'OK');
  }
  await go('/contato/');
  await evaluate('document.documentElement.dataset.theme="dark"');
  fs.mkdirSync('tmp', {recursive:true});
  let shot = await send('Page.captureScreenshot', {format:'png'}); fs.writeFileSync('tmp/contact-en.png', Buffer.from(shot.data,'base64'));
  await send('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:true});
  await go('/sobre/');
  assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);
  await evaluate('document.querySelector(".language-toggle").click()'); await wait(200);
  assert.equal(await evaluate('document.documentElement.lang'),'pt-BR');
  assert.match(await evaluate('document.querySelector("h1").innerText'),/Sobre mim/);
  await evaluate('document.querySelector(".menu-button").click()'); await wait(900);
  assert.match(await evaluate('document.querySelector("dialog").innerText'),/INÍCIO|Início/);
  await evaluate('document.querySelector("dialog .language-toggle").click()'); await wait(200);
  assert.match(await evaluate('document.querySelector("dialog").innerText'),/HOME|Home/);
  assert.equal(errors.length,0,JSON.stringify(errors));
  console.log('Language persistence, PT/EN switch, mobile, menu, resume links and runtime errors: OK');
  socket.close();
})().catch(error=> {console.error(error); process.exit(1);});
