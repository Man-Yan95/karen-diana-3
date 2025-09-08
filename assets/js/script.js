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





 (function(){
        const grid = document.getElementById('calendarGrid');
        const todayText = document.getElementById('todayText');
        const daysLeftEl = document.getElementById('daysLeft');

        const Y = 2025, M = 9, SPECIAL = 10;
        const daysInMonth = new Date(Y, M+1, 0).getDate();
        const startDay = new Date(Y, M, 1).getDay(); // 0=Կիր...
        // Armenian week: Երկ=1 => Monday. In JS getDay() Monday=1, Sunday=0. Adjust.
        const offset = (startDay+6)%7; // shift so Monday=0

        function buildDays(){
          grid.innerHTML = '';
          // add empty slots for offset
          for(let i=0;i<offset;i++){
            const empty = document.createElement('div');
            grid.appendChild(empty);
          }
          for(let d=1; d<=daysInMonth; d++){
            const cell = document.createElement('div');
            cell.className = 'day';
            if (d === SPECIAL){
              cell.classList.add('day--special');
              cell.innerHTML = '<div class="dot dot--big"><div class="dot dot--small"><div class="date-num">'+d+'</div></div></div>';
            } else {
              cell.innerHTML = '<div class="date-num">'+d+'</div>';
            }
            grid.appendChild(cell);
          }
        }

        buildDays();

        const now = new Date();
        todayText.textContent = now.toLocaleDateString('hy-AM', {year:'numeric',month:'numeric',day:'numeric'});
        const specialDate = new Date(Y, M, SPECIAL,0,0,0);
        function updateCountdown(){
          const msPerDay = 1000*60*60*24;
          const diff = Math.ceil((specialDate - new Date())/msPerDay);
          if (diff > 0) daysLeftEl.textContent = diff + ' օր';
          else if (diff === 0) daysLeftEl.textContent = 'Այսօր';
          else daysLeftEl.textContent = Math.abs(diff) + ' օր առաջ';
        }
        updateCountdown();
      })();

