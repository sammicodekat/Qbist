const axios = require('axios')

const firstAxiosReq = (reqUrl) => new Promise((res, rej) => {
  let url = 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses'

  axios.post(url, reqUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.API_KEY1
    }
  })
  .then((response) => res(response))
  .catch((err) => rej(err))
})

const secondAxiosReq = (reqUrl) => new Promise((res, rej) => {
  let url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'
  axios.post(url, reqUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.API_KEY2
    }
  })
  .then((response) => res(response))
  .catch((err) => rej(err))
})

exports.detectFace = (imgUrl, cb) => {
  let arr = []
  firstAxiosReq(imgUrl)
  .then((response1) => {
    arr.push(response1.data)
    return secondAxiosReq(imgUrl)
  })
  .then((response2) => {
    arr.push(response2.data)
    cb(null, arr)
  })
  .catch((error) => cb(error))
}
