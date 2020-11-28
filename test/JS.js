var getStill = document.getElementById('get-still');
var ShowImage = document.getElementById('stream');
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var modelPath = document.getElementById('modelPath');
var result = document.getElementById('result');
let Model;

async function LoadModel() {
    if (modelPath.value == "") {
        result.innerHTML = "Please input model path.";
        return;
    }

    result.innerHTML = "Please wait for loading model.";

    const URL = modelPath.value;
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    Model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = Model.getTotalClasses();
    result.innerHTML = "";

    getStill.style.display = "block";
    getStill.click();
}

async function predict() {
    var data = "";
    var maxClassName = "";
    var maxProbability = "";

    canvas.setAttribute("width", ShowImage.width);
    canvas.setAttribute("height", ShowImage.height);
    context.drawImage(ShowImage, 0, 0, ShowImage.width, ShowImage.height);

    const prediction = await Model.predict(canvas);
    if (maxPredictions > 0) {
        for (let i = 0; i < maxPredictions; i++) {
            if (i == 0) {
                maxClassName = prediction[i].className;
                maxProbability = prediction[i].probability;
            } else {
                if (prediction[i].probability > maxProbability) {
                    maxClassName = prediction[i].className;
                    maxProbability = prediction[i].probability;
                }
            }
            data += prediction[i].className + "," + prediction[i].probability.toFixed(2) + "<br>";
        }
        result.innerHTML = data;
        result.innerHTML += "<br>Result: " + maxClassName + "," + maxProbability;

        $.ajax({ url: document.location.origin + '/control?serial=' + maxClassName + ";" + maxProbability + ';stop', async: false });
    } else
        result.innerHTML = "Unrecognizable";

    getStill.click();
}

ShowImage.onload = function(event) {
    if (Model) {
        try {
            document.createEvent("TouchEvent");
            setTimeout(function() { predict(); }, 250);
        } catch (e) {
            predict();
        }
    }
}