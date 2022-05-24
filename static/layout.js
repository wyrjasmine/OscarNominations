function displayResults(){
    let search = $.trim($("#searchInput").val())
    let searchL = search.length
    console.log(search)
    if(searchL > 0){
        window.location.replace('http://127.0.0.1:5000/search_results/'+search); 
    }

    // $.ajax({
    //     //console.log("inside")
    //     type: "POST",
    //     url: "search_results/"+search,                
    //     dataType : "json",
    //     contentType: "application/json; charset=utf-8",
    //     data : JSON.stringify(search),
    //     success: function(result){
    //         console.log("inside success")
    //         window.location.replace('http://127.0.0.1:5000/search_results/'+search); 
    //         let all_data = result["films"]
    //         films = all_data
    //         displayNames(films)
    //         $("#searchInput").val("")
            
    //     },
    //     error: function(request, status, error){
    //         console.log("Error");
    //         console.log(request)
    //         console.log(status)
    //         console.log(error)
    //     }
    // });
}

$(document).ready(function(){
    
    $("#searchBTN").click(function(){
        displayResults()
    })

    $("#searchInput").keypress(function(e){     
        if(e.which == 13) {
            displayResults()
        }   
    })
})