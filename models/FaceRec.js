const axios = require('axios');

exports.detectFace = (imgurl,cb) => {
   let url = 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true';
   console.log('imgurl:',imgurl);
   axios.post(url,imgurl ,{
       headers:{
         'Content-Type': 'application/json',
         'Ocp-Apim-Subscription-Key': process.env.API_KEY
       }
     })
     .then(res=> res.data)
     .then(data => {
      cb(null,data)
     })
     .catch( err => {
       cb(err)
     })
}
