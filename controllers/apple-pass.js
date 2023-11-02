const fs=require('file-system')
const path=require('path')
const axios=require('axios')
const dbInfo=require("../config")
const uploadImage = require('../utils/uploadImage');
const { generateSinglePass } = require('../generateSinglePass');

async function generatePass(req, res) {
  try {
    const {serial,bufferData}=await generateSinglePass(req)
    await uploadImage(bufferData,`images/${serial}.pkpass`)
    fs.writeFileSync(`${serial}.pkpass`,bufferData);
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
    const passRef = await dbInfo.firebaseLite.getDocs(dbInfo.Pass)
    const updateInfo=passRef.docs.filter((doc)=>{
      const data=doc.data()
      
      return data.passIndetifier===req.body.passSerial
    })
 
    const passDoc = updateInfo[0];
    if (passDoc.empty) {
      return res.status(404).send('Pass not found.');
    }
    const updatedPassData = {
      userId: req.body.userId,
      passIndetifier: passSerial,
      passInfo: req.body.passInfo, 
    };
    const { serial, bufferData } = await generateSinglePass({
      body:{
        ...req.body.passInfo
      }
    });
    await dbInfo.firebaseLite.updateDoc(passDoc.ref,updatedPassData);
    await uploadImage(bufferData, `images/${serial}.pkpass`);
    fs.writeFileSync(`${serial}.pkpass`,bufferData);
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
