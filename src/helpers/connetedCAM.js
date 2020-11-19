Stream = require('node-rtsp-stream')

function connectCam() {
    const options = {
        name: 'name',
        streamUrl: 'rtsp://10.0.0.183:554/11',
        wsPort: 9999,
        ffmpegOptions: { // options ffmpeg flags
            '-stats': '', // an option with no neccessary value uses a blank string
            '-r': 30 // options with required values specify the value after the key
        }
    }
    stream = new Stream(options)
}
//rtsp://admin:admin@10.0.0.131/onvif1
//rtsp://10.0.0.183:554/11
exports.connectCam = connectCam