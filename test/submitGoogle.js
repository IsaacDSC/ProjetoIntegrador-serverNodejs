const gdiu = require('google-drive-image-upload')

gdiu.authAccount().then(async(auth)=>{
    //console.log(auth)
     const {url} =  await gdiu.uploadImage(auth, './exemplo.jpg')
     console.log(url)
}).catch((err)=>{
    console.log(err)
})
