const { PKPass } = require('passkit-generator');
const fs=require('file-system')
const path=require('path')
const axios=require('axios')
const hextoRgb = require('../utils/hextorgb');
const uploadImage = require('../utils/uploadImage');

async function generatePass(req, res) {

  try {
    
    const wwdrPath = path.join(__dirname, '../certs/wwdr.pem');
    const signerCertPath = path.join(__dirname, '../certs/signerCert.pem');
    const signerKeyPath = path.join(__dirname, '../certs/signerKey.pem');

    const wwdr = fs.readFileSync(wwdrPath);
    const signerCert = fs.readFileSync(signerCertPath);
    const signerKey = fs.readFileSync(signerKeyPath);

    if (!wwdr || !signerCert || !signerKey) {
      throw new Error('One or more certificate files are empty.');
    }

     await PKPass.from({
      model: "./model/custom.pass",
      certificates: {
        wwdr,
        signerCert,
        signerKey,
        signerKeyPassphrase:process.env.SIGNER_PARAPHRASE
      },
    }, {
      authenticationToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      webServiceURL:"https://us-east-central-nawaf-codes.cloudfunctions.net/pass",
      serialNumber:"PASS-213213",
      description: 'Introduction membership',
      logoText:"Meteo-In",
      foregroundColor: hextoRgb("#" + req.body.textColor),
      backgroundColor: hextoRgb("#" + req.body.backgroundColor),
    }).then(async (newPass)=>{
    
      newPass.primaryFields.push({
        key: 'primary0',
        label: req.body.primary.label,
        value: req.body.primary.value,
      });
  
      newPass.secondaryFields.push({
        key: 'secondary0',
        label: req.body.secondary[0].label,
        value: req.body.secondary[0].value,
      },
      {
        key: 'secondary1',
        label: req.body.secondary[1].label,
        value: req.body.secondary[1].value,
      }
      );
  
      newPass.auxiliaryFields.push(
        {
          key: 'auxiliary0',
          label: req.body.auxiliary[0].label,
          value: req.body.auxiliary[0].value,
        },
        {
          key: 'auxiliary1',
          label: req.body.auxiliary[1].label,
          value: req.body.auxiliary[1].value,
        }
      )
      newPass.setBarcodes({
        message:req.body.qrText,
        format : "PKBarcodeFormatQR",
        messageEncoding : "iso-8859-1"
      })
      const resp=await axios.get(req.body.thumbnail,{responseType:"arraybuffer"})
      const respLogo=await axios.get(req.body.icon,{responseType:"arraybuffer"})
     
    const buffer=Buffer.from(resp.data,'utf-8')
    const Logobuffer=Buffer.from(respLogo.data,'utf-8')
    newPass.addBuffer("thumbnail.png",buffer)
    newPass.addBuffer("thumbnail@2x.png",buffer)
    newPass.addBuffer("logo.png",Logobuffer)
    newPass.addBuffer("logo@2x.png",Logobuffer)
    const bufferData=newPass.getAsBuffer()
    await uploadImage( bufferData,"images/custom.pkpass")
    fs.writeFileSync('new.pkpass', bufferData);
    res.send("Pass generated").status(200);
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating pass.');
  }
}

module.exports = {
  generatePass,
};
