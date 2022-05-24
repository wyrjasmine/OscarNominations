function displayView(films){
    //empty old data
    $(".filmTitle").empty()
    $(".filmPhoto").empty()
    $(".nominations").empty()
    $(".director").empty()
    $(".actors").empty()
    $(".summary").empty()
    $(".runtime").empty()
    //insert all new data
    
    $.each(films, function(i, films){    
        if (films["id"] == id ){

            $(".filmTitle").empty()
            $(".director").empty()
            $(".filmPhoto").empty()
            $("#summaryHeader").empty()
            $("#summary").empty()
            $("#summary").empty()
            $("#runtimeHeader").empty()
            $("#runtime").empty()
            $("#runtime").empty()
            $(".nominationHeader").empty()
            $(".nominations").empty()
            $("#actorsHeader").empty()
            $("#actors").empty()
            $(".editBTN").empty()


            let title = films["title"]
            let photo = films["image"]
            const nominations = films["nominations"]
            let director = films["director"]
            const actors = films["actors"]
            let summary = films["summary"]
            let runtime = films["runtime"]
    
            $(".filmTitle").append(title)
            $(".director").append("Directed by: " + director)
            $(".filmPhoto").append('<img id="filmPoster" src ='+ photo+' alt = "Movie Poster"/>')
            $("#summaryHeader").append("Summary: ")
            $("#summary").append("</br>")
            $("#summary").append(summary)
            $("#runtimeHeader").append("Runtime: ")
            $("#runtime").append("</br>")
            $("#runtime").append(runtime + " minutes")
            $(".nominationHeader").append("Nominations: ")
            $.each(nominations, function(i, nominations){
                $(".nominations").append('<ul>')
                $(".nominations").append('<a href="/search_results/' + nominations + '">' + nominations + '</a>')
                $(".nominations").append("</br>")
            })
            $("#actorsHeader").append("Actors: ")
            $("#actors").append("</br>")
            
            $.each(actors, function(i, actors){
                $("#actors").append(actors)
                $("#actors").append(", ")
            })
            let editBTN = $("<button class = 'btn btn warning' id = 'editBTN'>Edit</button>")

            $(".editBTN").append(editBTN)

            $(".editBTN").click(function(){
                window.location.replace('http://127.0.0.1:5000/edit/'+id); 
            })

            console.log(actors)
            console.log(id)

        }
    })

}





$(document).ready(function(){
    //when the page loads, display all the names
    $("#searchBTN").click(function(){
        displayResults()
    })

    $("#searchInput").keypress(function(e){     
        if(e.which == 13) {
            displayResults()
        }   
    })

    displayView(films)
    
})