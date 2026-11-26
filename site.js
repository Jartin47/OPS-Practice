/* Pacific Shield site extras: usage counts (GoatCounter) and a feedback button (Formspree).
   Both stay off until you fill in the two settings below. */
(function(){
  'use strict';
  var GOATCOUNTER_CODE = '';   // your GoatCounter site code, e.g. 'opspractice' for https://opspractice.goatcounter.com
  var FORMSPREE_ID = '';       // your Formspree form ID, e.g. 'xyzabcd' from https://formspree.io/f/xyzabcd

  var page = /drills/.test(location.pathname) ? 'drills' : 'campaign';
  var sent = {};

  /* ---------- usage counts ---------- */
  function count(name, title){
    if(!GOATCOUNTER_CODE || sent[name]) return;
    sent[name] = true;
    function go(){ try{ window.goatcounter.count({path: name, title: title || name, event: true}); }catch(e){} }
    if(window.goatcounter && window.goatcounter.count) go();
    else (count.q = count.q || []).push(go);
  }
  if(GOATCOUNTER_CODE){
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://gc.zgo.at/count.js';
    gs.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
    gs.onload = function(){ (count.q || []).forEach(function(f){ f(); }); count.q = []; };
    document.head.appendChild(gs);

    // Which seat, length and tabs people use (each counted once per visit).
    document.addEventListener('click', function(ev){
      var el = ev.target.closest && ev.target.closest('[data-tab],[data-role],#start,#resume');
      if(!el) return;
      if(el.id === 'start'){
        var role = document.querySelector('[data-role][aria-pressed="true"]');
        var len = document.querySelector('[data-len][aria-pressed="true"]');
        count('start-' + (role ? role.getAttribute('data-role') : 'mob') + '-' + (len ? len.getAttribute('data-len') : 'standard'), 'Started a campaign');
      } else if(el.id === 'resume') count('resume', 'Resumed a campaign');
      else if(el.hasAttribute('data-role')) count('role-' + el.getAttribute('data-role'), 'Looked at a role');
      else count(page + '-tab-' + el.getAttribute('data-tab'), 'Opened a tab');
    }, true);

    // Time on site: count when a visit passes 1, 5, 15, 30 and 60 minutes with the page visible.
    var marks = [1, 5, 15, 30, 60], secs = 0;
    setInterval(function(){
      if(document.visibilityState !== 'visible') return;
      secs += 15;
      marks.forEach(function(m){ if(secs >= m * 60) count(page + '-time-' + m + 'min', 'On the page ' + m + '+ min'); });
    }, 15000);
  }

  /* ---------- feedback button ---------- */
  if(!FORMSPREE_ID) return;
  var css = document.createElement('style');
  css.textContent =
    '.fb-btn{position:fixed;right:16px;bottom:16px;z-index:60;font:600 .85rem/1 system-ui,sans-serif;padding:10px 14px;border-radius:3px;border:1px solid var(--line,#999);background:var(--accent,#a95f00);color:var(--accent-ink,#fff);cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25)}' +
    '.fb-ov{position:fixed;inset:0;z-index:61;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.fb-box{background:var(--panel,#fff);color:var(--ink,#111);border:1px solid var(--line,#999);border-radius:4px;padding:16px;width:100%;max-width:440px;font:400 .9rem/1.4 system-ui,sans-serif}' +
    '.fb-box h2{margin:0 0 8px;font-size:1.1rem}.fb-box textarea,.fb-box input{width:100%;box-sizing:border-box;margin:4px 0 10px;padding:8px;border:1px solid var(--line,#999);border-radius:3px;background:var(--bg,#fff);color:inherit;font:inherit}' +
    '.fb-box textarea{min-height:120px;resize:vertical}.fb-row{display:flex;gap:8px;justify-content:flex-end}.fb-row button{padding:8px 14px;border-radius:3px;border:1px solid var(--line,#999);background:transparent;color:inherit;font:inherit;cursor:pointer}' +
    '.fb-row .fb-send{background:var(--accent,#a95f00);color:var(--accent-ink,#fff);border-color:transparent}.fb-note{font-size:.78rem;opacity:.75;margin:0 0 10px}';
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.className = 'fb-btn';
  btn.type = 'button';
  btn.textContent = 'Feedback';
  btn.onclick = open;
  document.body.appendChild(btn);

  function open(){
    count('feedback-open', 'Opened feedback');
    var ov = document.createElement('div');
    ov.className = 'fb-ov';
    ov.innerHTML =
      '<form class="fb-box" role="dialog" aria-label="Send feedback">' +
      '<h2>Send feedback</h2>' +
      '<label>What should change, or what broke?<textarea name="message" required></textarea></label>' +
      '<label>Your email (optional, if you want a reply)<input name="email" type="email" autocomplete="email"></label>' +
      '<p class="fb-note">Your message goes to the site owner. This site also counts visits, time on the page and which tools are used, with no cookies and no personal details.</p>' +
      '<div class="fb-row"><button type="button" class="fb-cancel">Cancel</button><button type="submit" class="fb-send">Send</button></div></form>';
    document.body.appendChild(ov);
    var form = ov.querySelector('form');
    form.querySelector('textarea').focus();
    function close(){ ov.remove(); }
    ov.addEventListener('click', function(e){ if(e.target === ov) close(); });
    ov.querySelector('.fb-cancel').onclick = close;
    document.addEventListener('keydown', function esc(e){ if(e.key === 'Escape'){ close(); document.removeEventListener('keydown', esc); } });
    form.onsubmit = function(e){
      e.preventDefault();
      var send = form.querySelector('.fb-send');
      send.disabled = true; send.textContent = 'Sending…';
      var data = new FormData(form);
      data.append('page', page);
      var seat = document.querySelector('h1 small');
      if(seat) data.append('screen', seat.textContent);
      fetch('https://formspree.io/f/' + FORMSPREE_ID, {method: 'POST', body: data, headers: {Accept: 'application/json'}})
        .then(function(r){
          if(!r.ok) throw new Error();
          count('feedback-sent', 'Sent feedback');
          form.innerHTML = '<h2>Thanks!</h2><p>Your feedback was sent.</p><div class="fb-row"><button type="button" class="fb-send">Close</button></div>';
          form.querySelector('button').onclick = close;
        })
        .catch(function(){ send.disabled = false; send.textContent = 'Try again'; });
    };
  }
})();
