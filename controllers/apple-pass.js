const { PKPass } = require('passkit-generator');
const fs=require('file-system')
const path=require('path')
const axios=require('axios')
const dbInfo=require("../config")
const hextoRgb = require('../utils/hextorgb');
const uploadImage = require('../utils/uploadImage');
const generateSerialNumber = require('../utils/generateSerialNumber');
const { generateSinglePass } = require('../generateSinglePass');

async function generatePass(req, res) {
  try {
    const {serial,bufferData}=await generateSinglePass(req)
    await uploadImage(bufferData,`images/${serial}.pkpass`)
    fs.writeFileSync('PASS-213213.pkpass',bufferData);
    dbInfo.firebaseLite.addDoc(dbInfo.Pass,{
      userId:req.body.userId,
      passIndetifier:serial,
      passInfo:req.body,

    }).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
    res.send({
      userId:req.body.userId,
      passIndetifier:serial,
      passInfo:req.body,

    }).status(200);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating pass.');
  }
}

async function updatePass(req, res) {
  try {
    const passSerial = req.body.passSerial;
    const passRef = dbInfo.db.collection('Pass').where('passIndetifier', '==', passSerial);
    const snapshot = await passRef.get();

    if (snapshot.empty) {
      return res.status(404).send('Pass not found.');
    }
    const passDoc = snapshot.docs[0];
    const updatedPassData = {
      userId: req.body.userId,
      passIndetifier: passSerial,
      passInfo: req.body.passInfo, 
    };
    const { serial, bufferData } = await generateSinglePass(req);
    await uploadImage(bufferData, `images/${serial}.pkpass`);
    await passDoc.ref.update(updatedPassData);
    res.status(200).send('Pass updated successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating pass.');
  }
}


module.exports = {
  generatePass,
  updatePass
};
