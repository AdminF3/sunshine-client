export function download(text, options) {
  const {
    filename,
    type,
  } = options;

  const a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(new Blob([text], { type }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}
