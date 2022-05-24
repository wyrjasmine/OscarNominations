function displayNames(results){

    // $(".resultHeader").empty()
    
    //empty old data
    let num = resultsTitle.length
    let num2 = resultsDirector.length
    let num3 = resultsNoms.length
    let sumNum = num + num2 + num3;
    
    
    // let num = resultsDirector.length
    // let num = resultsNoms.length
    if (num + num2 + num3 > 0 ){
        $(".resultHeader").append("There are " + sumNum + " results for '" + text.replaceAll(text,"<span class = 'highlighted'>"+ text +"</span>") + "'");
        $(".resultHeader").append("</br>");
        $(".resultHeader").append("Search results for '" + text + "':");
    }
    else{
        $(".resultHeader").append("No results were found");
    }

    //insert all new data
    if(num > 0){
        let titleHeader= $("<div id = 'resultsH' >"+"Titles: "+"</div>")
        $("#resultsT").append(titleHeader);
        $.each(resultsTitle, function(i, datum){
            let title= datum["title"]
            var search = new RegExp(text, 'gi');
            var newText = title.replace(search, "<span class = 'highlighted'>"+ text +"</span>");
            $("#resultsT").append('<ul>');
            $("#resultsT").append('<a href=" /view/' + datum["id"] + '">'  + newText + '</a>');
            console.log(text)
        })
    }

    if (num2>0){
        let directorHeader= $("<div id = 'resultsH' >"+"Directors: "+"</div>")
        $("#resultsDr").append(directorHeader);
        $.each(resultsDirector, function(i, datum){
            let dr = datum["director"]
            var search = new RegExp(text, 'gi');
            var newText = dr.replace(search, "<span class = 'highlighted'>"+ text +"</span>");
            console.log(newText)
            $("#resultsDr").append('<ul>');
            $("#resultsDr").append('<a href=" /view/' + datum["id"] + '">' + newText + ", " + " (" + datum["title"] + ") " + '</a>');
            console.log(datum["id"])
        })
    }

    if (num3 > 0) {
        let nominationHeader= $("<div id = 'resultsH' >"+"Nominations: "+"</div>")

        $("#resultsNoms").append(nominationHeader);
        $.each(resultsNoms, function(i, datum){
            let nom = []
            let nomFinal = []
            let newText
            nom = datum["nominations"]
            $.each(nom, function(i, datum){
                noms = nom[i]
                let search = new RegExp(text, 'gi');
                if(noms.includes(text)){
                    noms = noms.replace(search, "<span class = 'highlighted'>"+ text +"</span>")
                    nomFinal.push(noms)
                    console.log(newText)
                }
                if(noms.toLowerCase().includes(text)){
                    noms = noms.replace(search, "<span class = 'highlighted'>"+ text +"</span>")
                    nomFinal.push(noms)
                    console.log(newText)
                }

            //     let index = $.inArray(text.toLowerCase(), nom[i].toLowerCase());
            //     console.log(index)
            
            })
            // let noms = nom[index]
            
            $("#resultsNoms").append('<ul>');
            $("#resultsNoms").append('<a href=" /view/' + datum["id"] + '">' + nomFinal + ", " +  " (" + datum["title"] + ") "  + '</a>'); //fix
        })

    }
}


$(document).ready(function(){
    displayNames(resultsTitle)

})