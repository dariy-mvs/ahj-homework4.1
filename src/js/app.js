function luhnAlgorithm(value) {
  value = value.replace(/\D/g, '');

  let nCheck = 0;
  let bEven = false;

  for (let n = value.length - 1; n >= 0; n--) {
    let nDigit = parseInt(value.charAt(n), 10);

    if (bEven && (nDigit *= 2) > 9) {
      nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) === 0;
}
const field = document.querySelector('.form__field');

field.addEventListener('input', () => {
  const identificators = {
    2: ['.mir'],
    3: ['.american-express', '.jcb', '.diners-club'],
    4: ['.visa'],
    5: ['.masterCard', '.maestro'],
    6: ['.maestro', '.discover'],
    30: ['.diners-club'],
    36: ['.diners-club'],
    38: ['.diners-club'],
    31: ['.jcb'],
    35: ['.jcb'],
    34: ['.american-express'],
    37: ['.american-express'],
    50: ['.maestro'],
    56: ['.maestro'],
    57: ['.maestro'],
    58: ['.maestro'],
    51: ['.masterCard'],
    52: ['.masterCard'],
    53: ['.masterCard'],
    54: ['.masterCard'],
    55: ['.masterCard'],
    63: ['.maestro'],
    67: ['.maestro'],
    60: ['.discover'],
  };
  let cardIdentificator;
  if (field.value.slice(0, 1) === '2' || field.value.slice(0, 1) === '4') {
    cardIdentificator = field.value.slice(0, 1);
  } else {
    cardIdentificator = field.value.slice(0, 2);
  }
  const images = document.querySelectorAll('.card-box');
  [...images].forEach((el) => {
    if (!el.querySelector('.mask')) {
      const mask = document.createElement('div');
      mask.classList.add('mask');
      el.appendChild(mask);
    }
  });
  const classCard = identificators[cardIdentificator];
  if (classCard) {
    classCard.forEach((el) => {
      document.querySelector(el).querySelector('.mask').remove();
    });
  }
  const fieldIsValid = luhnAlgorithm(field.value);
  field.classList.remove('valid');
  field.classList.remove('error');
  if (fieldIsValid) {
    field.classList.add('valid');
  } else {
    field.classList.add('error');
  }
});
