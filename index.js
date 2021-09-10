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
let imgcount = 0;
let imgend = false;
let b = 0;
let iwidth = 0;
let iheight = 0;
let cwidth = 0;
formtab2.addEventListener("submit", async (event) => {
    event.preventDefault();
});

const imagetab2 = [];
var imgtab2 = new Array();
/* document.getElementById('btn1').addEventListener('click', resizeCanvas, false); */
const addButtontab2 = document.querySelector("button.add-starttab2");
addButtontab2.addEventListener("click", async () => {
    
    for (let i = 0; i < 5; i++) {
        const urlInputtab2 = document.querySelector("input.add-urltab2-" + i);
        const urltab2 = urlInputtab2.value;
        if (urlInputtab2.value == "") {
            continue
        }
        
        try {
            const resulttab2 = await fetch(`/add?url=${urltab2}`);
            const parsedtab2 = await resulttab2.json();

            if (parsedtab2.image == undefined) {
                continue
            }

            imagetab2.onerror = function (e) {
                console.log(e);
            }

            imagetab2.push(parsedtab2.image);
            const j = imagetab2.length -1
            imgtab2[j] = new Image();
            imgtab2[j].onload = function () {
                if (imgtab2[j].width > cwidth) {
                    cwidth = imgtab2[j].width;
                    iwidth = imgtab2[j].width;
                }
                iheight = imgtab2[j].height + iheight;
                console.log(imgtab2[j].height)
                imgcount++
                onload()
            }
            imgtab2[j].src = imagetab2[j];
            

        }
        catch (e) {
            console.error(e);
        }
    }

    imgend = true;
    onload()

    function onload () {
        if (imgend == true && imgcount == imgtab2.length) {
            canvdrawImage()
        }
    }

    function canvdrawImage() {
        canvtab2.width = iwidth;
        canvtab2.height = iheight;
        for (let i = 0; i < imgtab2.length; i++) {
            if (imgtab2[i] == undefined) {
                continue
            }
                ctab2.drawImage(imgtab2[i], 0, b);
                b = b + imgtab2[i].height;
        }
    }
});
const addButtonSaveTab2 = document.querySelector("button.save4img");
addButtonSaveTab2.addEventListener("click", async () => {
    saveimg()
});

function saveimg() {
    var link = document.createElement("a");
    var canvurl = canvtab2.toDataURL();
    link.download = "download";
    link.href = canvurl
    link.click();
    setFile(canvurl)
}


const baseName 	  = "filesBase";
const storeName 	  = "filesStore";

function logerr(err){
	console.log(err);
}

function connectDB(f){
	let request = indexedDB.open(baseName, 1);
	request.onerror = logerr;
	request.onsuccess = function(){
		f(request.result);
	}
	request.onupgradeneeded = function(e){
		e.currentTarget.result.createObjectStore(storeName, { keyPath: "path" });
		connectDB(f);
	}
}

function setFile(file){
	connectDB(function(db){
		let request = db.transaction([storeName], "readwrite").objectStore(storeName).put(file);
		request.onerror = logerr;
		request.onsuccess = function(){
			return request.result;
		}
	});
}

function getStorage(f){
	connectDB(function(db){
		var rows = [],
			store = db.transaction([storeName], "readonly").objectStore(storeName);

		if(store.mozGetAll)
			store.mozGetAll().onsuccess = function(e){
				f(e.target.result);
			};
		else
			store.openCursor().onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor){
					rows.push(cursor.value);
					cursor.continue();
				}
				else {
					f(rows);
				}
			};
	});
}

console.log(getStorage(f));
