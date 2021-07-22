import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should add do something', async () => {
    await page.goto(baseUrl);
  });
});

// import { luhnAlgorithm, addEventToField } from '../app';

// jest.setTimeout(30000);// default puppeteer timeout
// describe('Card form',() => {
//   letbrowser=null;
//   letpage=null;
//   constbaseUrl='http://localhost:9000';
//   beforeAll( async () => {
//     browser = await puppetteer.launch({
//       headless:false,// show gui
//       slowMo:100,
//       devtools:true,// show devTools
//     });
//     page = await browser.newPage();
//   });
//   afterAll( async () => {
//     await browser.close();
//   });// test code here (next page)
// });

//  describe('Card form', () => {
//   test('should add .valid class for valid inn',async () => {
//   let browser = null;
//   let page = null;
//   let server = null;
//   const baseUrl = 'http://localhost:9000';

//   beforeAll(async () => {
//     server = fork(`${__dirname}/e2e.server.js`);
//     await new Promise((resolve, reject) => {
//       server.on('error', reject);
//       server.on('message', (message) => {
//         if (message === 'ok') {
//           resolve();
//         }
//       });
//     });

//     browser = await puppetteer.launch({
//       // headless: false, // show gui
//       // slowMo: 250,
//       // devtools: true, // show devTools
//     });
//     page = await browser.newPage();
//   });

//   await page.goto(baseUrl);
//     const field = await page.$('.form__field');
//     //const input = await form.$('[data-id=innogrn-input]');
//     await field.type('5331580625320882');
//     await field.waitForSelector('.valid');

//   afterAll(async () => {
//     await browser.close();
//     server.kill();
//   });

//   test('should add do something', async () => {
//     await page.goto(baseUrl);
//   });
//     await page.goto(baseUrl);
//     const field = await page.$('.form__field');
//     //const input = await form.$('[data-id=innogrn-input]');
//     await field.type('5331580625320882');
//     await field.waitForSelector('.valid');
//   });
// });
// test('checkMasterCard', () => {
//   document.body.innerHTML = '<div class="form-check">'+
//   '<form action="" class="form">'+
//     '<div class="form__card-box">'+
//       '<div class="card-box visa"></div>'+
//       '<div class="card-box masterCard"></div>'+
//       '<div class="card-box jcb"></div>'+
//       '<div class="card-box discover"></div>'+
//       '<div class="card-box diners-club"></div>'+
//       '<div class="card-box american-express"></div>'+
//       '<div class="card-box mir"></div>'+
//       '<div class="card-box maestro"></div>'+
//     '</div>'+
//     '<input type="text" class="form__field"></form>'+
// '</div>';
// let field = document.querySelector('.form__field')
// addEventToField();
// let changeEvent = new Event('input', {bubbles: true});
// field.value = '5331580625320882';
// field.dispatchEvent(changeEvent);
// console.log(field.value);
// //let fieldHasClass = field.classList.contains('valid');
// let imgHasNotMask = document.querySelector('.masterCard').querySelector('.mask');
// let maskArr = document.querySelectorAll('.mask');
// //expect(fieldHasClass).toBe(true);
// expect(imgHasNotMask).toBe(null);
// expect(maskArr.length).toBe(7);
// })