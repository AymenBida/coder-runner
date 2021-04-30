export default function () {
  const body = document.querySelector('body');

  const div = document.createElement('div');
  div.classList.add('nameForm');
  body.appendChild(div);

  const label = document.createElement('label');
  label.classList.add('nameForm__label');
  label.textContent = 'Enter your name here';
  div.appendChild(label);

  const input = document.createElement('input');
  input.setAttribute('id', 'name');
  input.setAttribute('type', 'text');
  input.classList.add('nameForm__input');
  input.setAttribute('autofocus', true);
  div.appendChild(input);
}
