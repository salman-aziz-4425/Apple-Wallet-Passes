function generateSerialNumber(prefix) {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 10000); // You can adjust the range as needed
    return `${prefix}-${timestamp}-${randomPart}`;
  }

module.exports=generateSerialNumber