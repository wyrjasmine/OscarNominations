function displayOriginalFilm(){

    $.each(films, function(i, films){

        if (films["id"] == id ){
            let filmTitle = films["title"]
            document.getElementById('titleInput').setAttribute('value', filmTitle);

            let filmDr = films["director"]
            document.getElementById('directorInput').setAttribute('value', filmDr);

            let filmPhoto = films["image"]
            document.getElementById('imageInput').setAttribute('value', filmPhoto);

            let filmNoms = films["nominations"]
            document.getElementById('nominationsInput').setAttribute('value', filmNoms);

            let filmActors = films["actors"]
            document.getElementById('actorInput').setAttribute('value', filmActors);

            let filmSum = films["summary"]
            document.getElementById('summaryInput').setAttribute('value', filmSum);

            let filmRun = films["runtime"]
            document.getElementById('runtimeInput').setAttribute('value', filmRun);
        }

    })

}
function displayFilms(films){
    //empty old data

    //insert all new data
    $.each(films, function(i, films){
        let newRow = $("<div class = 'row'>")
        
        let col_title = $("<div class = 'col-md-2'>")
        $(col_title).append(films["title"])
        $(newRow).append(col_title)

        let col_director = $("<div class = 'col-md-4'>")
        $(col_director).append( films["director"])
        $(newRow).append(col_director)

        let col_nom = $("<div class = 'col-md-2'>")
        $(col_nom).append(films["nominations"])
        $(newRow).append(col_nom)

        let col_image = $("<div class = 'col-md-2'>")
        $(col_image).append(films["image"])
        $(newRow).append(col_image)

        let col_actors = $("<div class = 'col-md-4'>")
        $(col_actors).append( films["actors"])
        $(newRow).append(col_actors)

        let col_sum = $("<div class = 'col-md-2'>")
        $(col_sum).append(films["summary"])
        $(newRow).append(col_sum)

        let col_run = $("<div class = 'col-md-2'>")
        $(col_run).append(films["runtime"])
        $(newRow).append(col_run)

    })
}

function saveEdits(){

    let titleInput = $.trim( $("#titleInput").val() )
    let titleInputL = titleInput.length
    let directorInput = $.trim( $("#directorInput").val() )
    let directorInputL = directorInput.length
    let nominations = $.trim($("#nominationsInput").val())
    let nominationsInput = []
    nominationsInput= nominations.split(/[,]+/);
    console.log(nominationsInput)
    let nominationsInputL = nominations.length
    let imageInput = $.trim( $("#imageInput").val() )
    let imageInputL = imageInput.length
    let actor = $.trim($("#actorInput").val())
    let actorInput = []
    actorInput = actor.split(/[,]+/);
    let actorInputL = actor.length
    console.log(actorInput)
    let summaryInput = $.trim( $("#summaryInput").val() )
    let summaryInputL = summaryInput.length
    let runtimeInput = $.trim( $("#runtimeInput").val() )
    let runtimeInputL = runtimeInput.length
    
    let check = isNaN(runtimeInput)
  
    if ( titleInputL == 0 ){
      document.getElementById("titleAlert").innerHTML = "Please enter a title"
      console.log(titleInput);
    }
    if ( directorInputL == 0){
      document.getElementById("directorAlert").innerHTML = "Please enter a director"
      console.log(directorInput);
    }
    if ( nominationsInputL == 0){
        document.getElementById("nominationsAlert").innerHTML = "Please enter the nominations"
        console.log(nominationsInput);
    }
    if ( imageInputL == 0){
        document.getElementById("imageAlert").innerHTML = "Please enter an image"
        console.log(imageInput);
    }
    if ( actorInputL == 0){
        document.getElementById("actorsAlert").innerHTML = "Please enter the actors"
        console.log(actorInput);
    }
    if ( summaryInputL == 0){
        document.getElementById("summaryAlert").innerHTML = "Please enter the summary"
        console.log(summaryInput);
    }

    if ( runtimeInputL == 0){
        document.getElementById("runtimeAlert").innerHTML = "Please enter the runtime"
        console.log(summaryInput); 
    }
    
    if (check == true){
      document.getElementById("runtimeAlert").innerHTML = "Please enter a number"
      console.log(check);
    }

    if(titleInputL!=0){
      document.getElementById("titleAlert").innerHTML = ""
      console.log("org not 0");
    }
    
    if(directorInput!=0){
      document.getElementById("directorAlert").innerHTML = ""
      console.log("org not 0");
    }
    if ( nominationsInputL != 0){
        document.getElementById("nominationsAlert").innerHTML = ""
        console.log(nominationsInput);
    }
    if ( imageInputL != 0){
        document.getElementById("imageAlert").innerHTML = ""
        console.log(imageInput);
    }
    if ( actorInputL != 0){
        document.getElementById("actorsAlert").innerHTML = ""
        console.log(actorInput);
    }
    if ( summaryInputL != 0){
        document.getElementById("summaryAlert").innerHTML = ""
        console.log(summaryInput);
    }
    if(runtimeInputL != 0 && check == false){
        document.getElementById("runtimeAlert").innerHTML = ""
        console.log("check false");
    }
  
    if(titleInputL != 0 && directorInputL !=0 && nominationsInputL != 0 && imageInputL !=0 && actorInputL != 0 && summaryInputL !=0 && runtimeInput !=0 && check == false){
        
        console.log(id)
        console.log(films)

        let new_film_entry = 
        {
            "id" : id,
            "title": titleInput,
            "director": directorInput, 
            "nominations": nominationsInput,
            "image": imageInput,
            "summary": summaryInput, 
            "actors": actorInput,
            "runtime": runtimeInput,
        }         
       
        // console.log(titleInput)
        // console.log(directorInput)
        // console.log(nominationsInput)
        // console.log(imageInput)
        // console.log(actorInput)
        // console.log(summaryInput)
        // console.log(runtimeInput)
        
        console.log(new_film_entry)
    
        $.ajax({
            type: "POST",
            url: "/edit_title",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(new_film_entry),
            success: function(result){
                let allTitles = result["title"]
                data = allTitles
                displayFilms(data)
                
                // $("#titleInput").val("")
                // $("#nominationsInput").val("")
                // $("#directorInput").val("")
                // $("#imageInput").val("")
                // $("#actorInput").val("")
                // $("#summaryInput").val("")
                // $("#runtimeInput").val("") // add other inputs too
                console.log("hello")
                console.log(result)
                document.getElementById("titleInput").focus()
                
                $(".update").append('<a href=" /view/' + id + '">' + "Click here to view" + '</a>');

            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
        // document.getElementById("titleAlert").innerHTML = ""
        // document.getElementById("directorAlert").innerHTML = ""
        window.location.replace('http://127.0.0.1:5000/view/'+id); 

    }
}

function getConfirmation() {
    let retVal = confirm("Are you sure you want to discard changes?");
    if( retVal == true ) {
        window.location.replace('http://127.0.0.1:5000/view/'+id); 
        return true;
    } else {
        return false;
    }
}

$(document).ready(function(){
    //when the page loads, display all the names
    displayOriginalFilm()
    $("#submitChanges").click(function(){                
        saveEdits()

    })
    
    $("#runtimeInput").keypress(function(e){     
        if(e.which == 13) {
            saveEdits()

        }   
    })

    $("#discardChanges").click(function(){                
        getConfirmation()
    })

})