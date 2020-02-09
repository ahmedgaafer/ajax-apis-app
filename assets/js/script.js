/*Cat app*/
$('#btnCat').click(() => {
  $.getJSON('https://aws.random.cat/meow', data => {
    $('#imgCat').attr('src', data.file)
  })
})

$.getJSON('https://aws.random.cat/meow', data => {
  $('#imgCat').attr('src', data.file)
})

/* ======================================================== */
/*Dog app*/
let XHR = new XMLHttpRequest();
const imgDog = document.querySelector('#imgDog')
const btnDog = document.querySelector('#btnDog')

const mountImage = () => {
  XHR.onreadystatechange = () => {
    if (XHR.readyState == 4) {
      if (XHR.status == 200) {
        let url = JSON.parse(XHR.responseText).message
        imgDog.src = url
      } else {
        console.log('Problem')
      }
    }
  }
}

btnDog.addEventListener('click', () => {
  mountImage();
  XHR.open('GET', 'https://dog.ceo/api/breeds/image/random')
  XHR.send()

});

mountImage();
XHR.open('GET', 'https://dog.ceo/api/breeds/image/random')
XHR.send()

/* ======================================================== */
/* Random User App */
const avatar = document.querySelector('#avatar');
const fullName = document.querySelector('#fullname');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const city = document.querySelector('#city');
const btn = document.querySelector('#btnUser');
const URL = "https://randomuser.me/api/";

btn.addEventListener('click', () => {
  fetch(URL)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError);
});

const handleErrors = req => {
  if (!req.ok) {
    throw Error(req.status)
  }
  return req;
}

const parseJSON = res => {
  return res.json()
}

const updateProfile = data => {
  const profile = data['results'][0]
  avatar.src = profile.picture.large;
  fullName.innerText = `${profile.name.first} ${profile.name.last}`;
  username.innerText = profile.login.username;
  email.innerText = profile.email;
  city.innerText = profile.location.city;
}

const printError = err => {
  return console.log(err)
}

/* ======================================================== */
/* BitCoin App */

let XHRCoin = new XMLHttpRequest();
const USD = document.querySelector('#USD');
const GBP = document.querySelector('#GBP');
const EUR = document.querySelector('#EUR');
const cntr = document.querySelector('#cntr');
const btnCoin = document.querySelector('#btnCoin');
const T = 5
let Interval = T;

XHRCoin.onreadystatechange = () => {
  if (XHRCoin.readyState == 4 && XHRCoin.status == 200) {
    let data = JSON.parse(XHRCoin.responseText).bpi
    USD.innerHTML = `${data.USD.rate} ${data.USD.symbol}`
    GBP.innerHTML = `${data.GBP.rate} ${data.GBP.symbol}`
    EUR.innerHTML = `${data.EUR.rate} ${data.EUR.symbol}`
  }
}

XHRCoin.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
XHRCoin.send();

setInterval(() => {
  XHRCoin.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
  XHRCoin.send();
}, Interval * 1000);

let ID = setInterval(() => {
  cntr.innerHTML = Interval;
  (Interval == 0) ? Interval = 5: Interval--;
}, 1000);

btnCoin.addEventListener('click', () => {
  clearInterval(ID);
  Interval = T;

  XHRCoin.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
  XHRCoin.send();

  ID = setInterval(() => {
    cntr.innerHTML = Interval;
    (Interval == 0) ? Interval = 5: Interval--;
  }, 1000);
})