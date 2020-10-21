
// Переделать в ДЗ не использовать fetch а Promise
/* 
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};
*/

const getRequest = (url) => {
  
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(console.log('Error')); 
      xhr.send();
    });
   
  }
  