export const validateNumber = (e) => {
  const key = e.key;
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "Tab"
  ) {
    return;
  }
  if (!/^[0-9]$/.test(key)) {
    e.preventDefault();
  }
};
