const timer = document.querySelector('.banner__timer-time');
const prevPrice = document.querySelector('.banner__price-prev');
const newPrice = document.querySelector('.banner__price-new');
const bigImg = document.querySelector('.offer__img');
const smallImgs = document.querySelectorAll('.offer__preview-item');
const rating = document.querySelector('.offer__raiting-container');
const stars = document.querySelectorAll('.offer__star');

const oldPrice = '250.00'
const nowPrice = '160.00'

prevPrice.textContent = 'R ' + oldPrice;
newPrice.textContent = 'R ' + nowPrice;

const deadline = new Date(Date.parse(new Date()) + 17476 * 1000);

function getTimeRemaining(endtime) {
  let time = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / 1000 / 60) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return {
    total: time,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(endtime) {
  function updateClock() {
    let time = getTimeRemaining(endtime);
    timer.textContent = (('0' + time.hours).slice(-2) + ':' + ('0' + time.minutes).slice(-2) + ':' + ('0' + time.seconds).slice(-2));
    if (time.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}

initializeClock(deadline);

function animate({ timing, draw, duration }) {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);
    draw(progress); // отрисовать её
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

smallImgs.forEach(item => {
  item.addEventListener('click', () => {
    if (bigImg.src != item.src) {
      smallImgs.forEach(i => {
        i.classList.remove('offer__preview-item_active');
      })
      item.classList.add('offer__preview-item_active');
      animate({
        timing(timeFraction) {
          return 1 - Math.sin(Math.acos(timeFraction));
        },
        draw(progress) {
          bigImg.style.opacity = progress * 100 + '%';
        },
        duration: 800
      });
      bigImg.src = item.src
      bigImg.alt = item.alt
    }
  })
})
