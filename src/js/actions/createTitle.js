export default function fn() {
  const body = document.querySelector('body');

  const div = document.createElement('div');
  div.classList.add('titleDiv');
  body.appendChild(div);

  const title = document.createElement('h1');
  title.classList.add('titleDiv__title');
  title.textContent = 'Coder Runner';
  div.appendChild(title);

  const para = document.createElement('p');
  para.classList.add('titleDiv__para');
  para.textContent = `Press -SPACE- or the mouse's LEFT KEY to jump.
  Press again while in the air to double jump.
  Avoid being pushed by the errors.`;
  div.appendChild(para);
}
