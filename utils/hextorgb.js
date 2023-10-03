function hextorgb(hex) {
  // Remove the hash symbol (#) if it's present
  hex = hex.replace(/^#/, '');

  // Parse the HEX value into separate R, G, and B values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`
}
module.exports=hextorgb

  