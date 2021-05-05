const findInputValue = () => document.querySelector('input').value;

export default function fn() {
  if (findInputValue() === '') { return 'unknown'; }
  return findInputValue();
}