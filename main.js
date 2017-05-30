var blobs = [];

function dropFile(e) {
    var files = e.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
        readFile(files[i]);
    }
}

function readFile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        loadVideo(e.target.result, file.type);
    };

    reader.onprogress = function(data) {
        if (data.lengthComputable) {                                            
            var progress = parseInt(((data.loaded / data.total) * 100), 10);
            $("#progress").text(progress + "%");
        }
    }

    reader.readAsArrayBuffer(file);
}

function loadVideo(file, type) {
    console.log(type);
    blobs.push(new Blob([file], {type: type}));
}

function combineVideos() {
    var blob = new Blob(blobs, { type: "video/mp4" });
    var url = (URL || webkitURL).createObjectURL(blob);
    var video = document.createElement("video");
    video.src = url;
    document.body.appendChild(video);
    video.play();
}

$(document).on("dragenter", function (e) 
{
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = "copy";
});

$(document).on("dragover", function (e) 
{
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = "copy";
});

$(document).on("drop", function(e) {
    e.stopPropagation();
    e.preventDefault();
    dropFile(e.originalEvent);
});