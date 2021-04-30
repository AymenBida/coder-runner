export default function fn() {
  const input = document.querySelector('input');
  if (input.value === '') { return 'unknown'; }

  return input.value;
}