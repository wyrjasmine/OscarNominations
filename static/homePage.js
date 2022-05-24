

function displayStaffPicks(films){


    //empty old data
    $("#staffPicks").empty()

    
    //insert all new data
    
    $.each(films, function(i, films){    
        if (films["id"] == 1 || films["id"] ==2 || films["id"] == 3){
            let newCol = $("<div class = 'col-4'>")

            let filmName = films["title"]; 
            let filmPoster = films["image"]

            $(newCol).append('<a href=" /view/' + films["id"] + '">' + '<img id="filmPoster" src ='+ filmPoster+' alt = "Movie Poster"/>' +  filmName + '</a>');

            $("#picks").append(newCol)

            console.log(filmPoster)
        
        }
    })
}
$(document).ready(function(){
    //when the page loads, display all the names
    
    displayStaffPicks(films)

})