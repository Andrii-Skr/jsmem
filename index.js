var canv = document.getElementById("img"),
    c = canv.getContext("2d");

let text = "";
let textNode = document.querySelector("#text1");
textNode.addEventListener("keyup", (e) => {
    text = e.target.value;

    drawText(text);
});

function drawText(text) {
    c.drawImage(img, 0, 0);
    c.font = "60px Arial";
    c.fillText(text, canv.width / 2 - text.length / 2 * 30, canv.height / 4 - 15);
}

function onfil(doc) {
    var file = doc.files[0],
        fileread = new FileReader();
    fileread.onload = function () {
        var img = new Image();
        img.src = fileread.result;
        img.onload = function () {
            canv.width = img.width;
            canv.height = img.height;
            drawText(text);
        }
    }
    fileread.readAsDataURL(file);
}

butt.onclick = function () {
    let imageUrl = document.getElementById('url1').value;
    var img = new Image();
    img.crossOrigin = "use-credentials";
    img.onload = function () {
        canv.width = img.width;
        canv.height = img.height;
        c.drawImage(img, 0, 0);
        c.font = "60px Arial";
        c.fillText(text, canv.width / 2 - text.length / 2 * 30, canv.height / 4 - 15);
    }
    img.src = imageUrl;
};


function get() {
    var link = document.createElement("a");
    var canvurl = canv.toDataURL();
    link.download = "download";
    link.href = canvurl
    link.click();
}

function openMem(evt, Mem) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Mem).style.display = "block";
    evt.currentTarget.className += " active";
}

// function testDrawing(){
//     var canvas = document.getElementById("img");
//     var context = canv.getContext("2d");

//     context.save();
//     context.beginPath();
//     context.moveTo(10, 10);
//     context.lineTo(290, 290);
//     context.stroke();
//     context.restore();
// }

function getImage() {
    var imageData = canv.toDataURL();
    var image = new Image();
    image.src = imageData;
    return image;
}

function saveImage(image) {
    var link = document.createElement("a");

    link.setAttribute("href", image.src);
    link.setAttribute("download", "canvasImage");
    link.click();
}

// testDrawing();

function saveCanvasAsImageFile() {
    var image = getImage(document.getElementById("canvas"));
    saveImage(image);
}

async function add(url, text) {
    const request = new Request(url);
    const result = await fetch(url);

    var image = new Image();
    image.src = result.image;
}
