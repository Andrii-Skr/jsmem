var canv=document.getElementById("img"),
c=canv.getContext("2d");

var imageUrl = document.getElementById('url1').value;

function onfil(doc)
{
    var file=doc.files[0],
    fileread=new FileReader();
    fileread.onload=function()
    {
        var img=new Image();
        img.src=fileread.result;
        img.onload=function()
        {
            canv.width=img.width;
            canv.height=img.height;
            c.drawImage(img,0,0);
            c.font="60px Arial";
            var text=document.getElementById('text1').value;
            c.fillText(document.getElementById('text1').value ,canv.width/2-text.length/2*30,canv.height/4-15);
        }
    }
     fileread.readAsDataURL(file);
};

 butt.onclick = function()
 {
   
     var img=new Image();
     img.src= document.getElementById('url1').value;
     img.onload=function()
     {
     canv.width=img.width;
     canv.height=img.height;
     c.drawImage(img,0,0);
     c.font="60px Arial";
     var text=document.getElementById('text1').value;
     c.fillText(document.getElementById('text1').value ,canv.width/2-text.length/2*30,canv.height/4-15);
     }
   
 };


function get()
{
    var link=document.createElement("a");
    link.download="download";
    link.href=canv.toDataURL(["image/png"]);
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
