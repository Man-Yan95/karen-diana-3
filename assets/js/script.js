    // countdown
  const target = new Date(2025, 9, 10, 0, 0, 0);

    const dEl = document.getElementById('d');
    const hEl = document.getElementById('h');
    const mEl = document.getElementById('m');
    const sEl = document.getElementById('s');

    const DAY = 86_400_000, HOUR = 3_600_000, MIN = 60_000, SEC = 1_000;

    function pad2(n){ return String(n).padStart(2,'0'); }

    function tick(){
      const now = new Date();
      let diff = target - now;

      if (diff <= 0){
        // հասել ենք կամ անցել — ամենը 00
        dEl.textContent = '00';
        hEl.textContent = '00';
        mEl.textContent = '00';
        sEl.textContent = '00';
        return; // թողնում ենք կանգնի 00-ների վրա
      }

      const d = Math.floor(diff / DAY);   diff -= d * DAY;
      const h = Math.floor(diff / HOUR);  diff -= h * HOUR;
      const m = Math.floor(diff / MIN);   diff -= m * MIN;
      const s = Math.floor(diff / SEC);

      dEl.textContent = pad2(d);
      hEl.textContent = pad2(h);
      mEl.textContent = pad2(m);
      sEl.textContent = pad2(s);
    }

    // Անմիջապես թարմացնել, հետո՝ ամեն վայրկյան
    tick();
    setInterval(tick, 1000);

    // music
    const audio=document.getElementById('music');
    const btn=document.getElementById('music-btn');
    btn.onclick=()=>{if(audio.paused){audio.play();btn.textContent='⏸️';}else{audio.pause();btn.textContent='▶️';}}

    // call sheet
    const fab=document.getElementById('fab-call'), sheet=document.getElementById('call-sheet');
    fab.onclick=()=>sheet.classList.add('active');
    sheet.onclick=e=>{if(e.target===sheet)sheet.classList.remove('active');}

    // slider
 const slides = document.getElementById('slides');
let index = 0,
    total = slides.children.length,
    stopped = false,
    timer = null;

function go(i) {
  index = (i + total) % total;
  slides.style.transform = `translateY(-${index * 185}vh)`;
}

function auto() {
  timer = setInterval(() => {
    if (!stopped) go(index + 0.5);
  }, 6000); // 3 վրկ օրինակ
}

function stopAuto() {
  stopped = true;
  clearInterval(timer);
}

// մեկնարկում ենք ավտոմատը
auto();

// mouse wheel event
document.querySelector('.slider').addEventListener('wheel', e => {
  stopAuto();
  go(index + (e.deltaY > 0 ? 1 : 1));
});





auto();

// scroll event
document.querySelector('.slider').addEventListener('wheel', e => {
  stopped = true;
  clearInterval(timer);
  go(index + (e.deltaY > 0 ? 1 : -1));
});

// touch events
let sy = 0, dy = 0;
slides.addEventListener('touchstart', e => {
  stopped = true;
  clearInterval(timer);
  sy = e.touches[0].clientY;
});
slides.addEventListener('touchend', e => {
  dy = e.changedTouches[0].clientY - sy;
  if (Math.abs(dy) > 90) go(index + (dy < 0 ? 1 : -1));
  sy = 0;
  dy = 0;
});

// click event → կանգնեցնի ավտոմատը
slides.addEventListener('click', () => {
  stop = true;
  clearInterval(timer);
});
let paused = false;

slides.addEventListener('click', () => {
  if (!paused) {
    stopAuto(); // կանգնեցնենք ավտոմատը
    paused = true;
  } else {
    stopped = false;
    auto(); // նորից սկսի ավտոմատը
    paused = false;
  }
});

