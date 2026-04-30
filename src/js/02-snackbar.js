'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  let postpone = Number(e.target.elements.delay.value);
  if (isNaN(postpone)) {
    console.log('Sayı giriniz');
    return;
  }
  if (postpone < 0) {
    console.log('girmiş olduğunuz sayı geçerli değil');
    return;
  }
  const state = e.target.state.value === 'fulfilled';
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state) {
        resolve(postpone);
      } else {
        reject(postpone);
      }
    }, postpone);
  });
  p1
    .then((value) => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,
        backgroundColor: 'green',
        position: 'topRight',
        messageColor : 'white'
      })
    }
    )
    .catch((value) => {
      iziToast.show({
        message: `❌ Rejected promise in ${value}ms`,
        backgroundColor: 'red',
        position: 'topRight',
        messageColor : 'white'
      })
    }
    )
});