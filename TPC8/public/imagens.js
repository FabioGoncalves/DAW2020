function showImage(name, type) {

    if (type == 'image/png' || type == 'image/jpeg') 
        var ficheiro = $('<img src="/' + name + '" width="80%"/>')
    
    else {

        var ficheiro = $('<p>' + name + ', ' + type + '</p>')
    }
        
    var fileObj = $(`
    <div class="w3-row w3-margin-bottom">
        <div class="w3-col s6">
            ${ficheiro[0].outerHTML}
        </div>
        <div class="w3-col s6 w3-border">        
            <p>${name} </p>
            <p>${type} </p>
        </div>
    </div>
    `)
    var download = $('<div><a href="/files/download/' + name +'">Download</a></div>')
    $("#display").empty()
    console.log(ficheiro[0].outerHTML)
    $("#display").append(fileObj, download)
    $("#display").modal()
}

function addInput(){
    var addDiv = $(`
    <div class="w3-row w3-margin-bottom">
        <hr>
        <div class="w3-col s3">
            <label class="w3-text-teal"><b>Description</b></label>
            <input class="w3-input w3-border w3-light-grey" name="desc">

        </div>
    </div>
    <div class="w3-row w3-margin-bottom">
        <div class="w3-col s3">
            <label class="w3-text-teal"><b>Select file</b></label>
        </div>
    </div>
    <div class="w3-col s9">
        <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
    </div>
    `)

    $("#addDiv").append(addDiv)

}
