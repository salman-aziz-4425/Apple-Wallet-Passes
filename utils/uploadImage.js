const { getStorage, ref, uploadBytes } = require('firebase/storage');

const storage = getStorage();

async function uploadImageBufferToFirebaseStorage(imageBuffer, destinationPathInStorage) {
    const storageRef = ref(storage, destinationPathInStorage);
    try {
      const snapshot = await uploadBytes(storageRef, imageBuffer);
      console.log('Image uploaded successfully:', snapshot.ref.fullPath);
      return snapshot.ref.fullPath;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

module.exports=uploadImageBufferToFirebaseStorage