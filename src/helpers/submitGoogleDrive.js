const gdiu = require('google-drive-image-upload')

gdiu.authAccount().then(async(auth, img)=>{
    //console.log(auth)
     const {url} =  await gdiu.uploadImage(auth, img)
     console.log(url)
}).catch((err)=>{
    console.log(err)
})
