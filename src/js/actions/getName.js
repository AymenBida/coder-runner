export default function () {
  const input = document.querySelector('input');
  if (input.value === '') { return 'unknown'; }

  return input.value;
}