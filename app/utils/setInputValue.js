export function setInputValue(input, value) {
  const {selectionStart, selectionEnd, selectionDirection} = input;

  input.value = value || '';
  input.selectionStart = selectionStart;
  input.selectionEnd = selectionEnd;
  input.selectionDirection = selectionDirection;
}
