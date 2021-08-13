var canv = document.getElementById("img"),
    canvtab2 = document.getElementById("imgtab2"),
    c = canv.getContext("2d"),
    ctab2 = canvtab2.getContext("2d");

let text = "";
let textNode = document.querySelector("#text1");
textNode.addEventListener("keyup", (e) => {
    text = e.target.value;

    drawText(text);
});


function onfil(doc) {
    var file = doc.files[0],
        fileread = new FileReader();
    fileread.onload = function () {
        var img = new Image();
        img.src = fileread.result;
        img.onload = function () {
            canv.width = img.width;
            canv.height = img.height;
            c.drawImage(img, 0, 0);
            c.font = "60px Arial";
            c.fillText(text, canv.width / 2 - text.length / 2 * 30, canv.height / 4 - 15);
        }
    }
    fileread.readAsDataURL(file);
}

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

const form = document.querySelector("#formid");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
});
const addButton = document.querySelector("button.add-start");
addButton.addEventListener("click", async () => {
    const urlInput = document.querySelector("input.add-url");
    const url = urlInput.value;

    const result = await fetch(`/add?url=${url}`);
    try {
        const parsed = await result.json();

        const image = parsed.image;
        var img = new Image();
        img.onload = function () {
        canv.width = img.width;
        canv.height = img.height;
        c.drawImage(img, 0, 0);
        c.font = "60px Arial";
        c.fillText(text, canv.width / 2 - text.length / 2 * 30, canv.height / 4 - 15);
    }
    img.src = image;
    }
    catch (e) {
        console.error(e);
    }
});

const formtab2 = document.querySelector("#formidtab2");
let b = 0;
formtab2.addEventListener("submit", async (event) => {
    event.preventDefault();
});

const imagetab2 = [];
var imgtab2 = new Array();
const addButtontab2 = document.querySelector("button.add-starttab2");
addButtontab2.addEventListener("click", async () => {
    
    for (var i = 0; i < 5; i++) {
        const urlInputtab2 = document.querySelector("input.add-urltab2-" + i);
        const urltab2 = urlInputtab2.value;
        const resulttab2 = await fetch(`/add?url=${urltab2}`);
        try {
            const parsedtab2 = await resulttab2.json();

            if (parsedtab2.image == undefined) {
                continue
                
            }
            imagetab2.push(parsedtab2.image);
            
            imgtab2[i] = new Image();
            imgtab2[i].onload = function () {
                canvtab2.width = imgtab2[i].width;
                canvtab2.height = imgtab2[i].height+10000;
                
                ctab2.drawImage(imgtab2[i],0,b);
            }
            imgtab2.src = imagetab2[i];
        }
        catch (e) {
            console.error(e);
        }
        
    }
});
