const gdiu = require('google-drive-image-upload')


function sendGoogleDrive(dir) {
    gdiu.authAccount().then(async(auth, dir) => {
        //console.log(auth)
        const { url } = await gdiu.uploadImage(auth, dir)
        console.log(url)
        return url
    }).catch((err) => {
        console.log(err)
    })
}



exports.sendGoogleDrive = sendGoogleDrive