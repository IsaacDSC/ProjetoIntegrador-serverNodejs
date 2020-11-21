let STATUS = []

async function submitURI() {
    var telaRecognition = document.querySelector('#telaRecognition')//define display page recognition
    var URL = document.querySelector('#URI_value').value //geting value input frontend at modal reconition, get URI
    localStorage.setItem('URL', URL)// submit URL in LocalStorage
    URL.click()
    var dataURL = localStorage.getItem('URL')//geting data localStorage in URL
    console.log(dataURL)
    telaRecognition.innerHTML = `Endereço: ${dataURL}`
}
window.addEventListener("load", function(event) {
    var dataURL = localStorage.getItem('URL')//geting data localStorage in URL
    console.log(dataURL)
    telaRecognition.innerHTML = `Endereço: ${dataURL}`
  });


//function for send array status
  async function sendSTATUS(){
    STATUS.pop()
    await STATUS.push({value: prediction[i].className})
    console.log('enviando status class 2')
    console.log(STATUS)
    /* if(STATUS){
        STATUS.pop()
        await STATUS.push(prediction[i].className)
        console.log('enviando status class 2')
        console.log(STATUS)
    }else{
        await STATUS.push(prediction[i].className)
        console.log('enviando status class 2')
        console.log(STATUS)
    } */
}

//function for sendSTATUS ON or OFF to machine
async function sendStatusESP8266(status){
    var myHeaders = new Headers();
    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'    
    };
    fetch(`http://10.0.0.164/?f=${status}`, myInit)
        .then(function (response) {
            console.log('SEM EPI, ENVIADO AO SERVER')
            return response.blob();
        })
    //alertAnonimus.alertAnonimus()
    console.log('SEM EPI, ENVIANDO AO SERVER...')
}


/* import '../../helpers/alertAnonimus' */
//import * as alertAnonimus from '../../helpers/alertAnonimus'  //import helpers functions backend submit off for machine

const URL = localStorage.getItem('URL');
let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(500, 500, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        //console.log(prediction[i].className + '\n' + prediction[i].probability)
        if (prediction[i].className == 'Class 2' && prediction[i].probability > 0.60) {
            //console.log(prediction[i].probability)
            sendSTATUS()
        }
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

