export function convertBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB'];

  if (!bytes) {
    return 'NaN';
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  const b = i > 0 ? (bytes / Math.pow(1024, i)).toFixed(1) : bytes;

  return `${b} ${sizes[i]}`;
}
