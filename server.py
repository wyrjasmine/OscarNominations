from http import client
import json
from xxlimited import new
from flask import Flask, redirect, url_for
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

films = {
    "1" : {
    "id": "1",
    "title": "Drive My Car",
    "image": "https://m.media-amazon.com/images/M/MV5BNGY5NzdlOTEtZDk3Yi00MDZhLWI4NDQtODYzZmY0OTcxYzk3XkEyXkFqcGdeQXVyMjY3NDMzMzU@._V1_FMjpg_UY720_.jpg",
    "nominations": ["Best Picture", "Best International Feature"],
    "director": "Teruhisa Yamamoto",
    "actors": ["Reika Kirishima", "Toko Miura", "Hidetoshi Nishijima", "Masaki Okada"], 
    "summary": "An aging, widowed actor seeks a chauffeur. The actor turns to his go-to mechanic, who ends up recommending a 20-year-old girl. Despite their initial misgivings, a very special relationship develops between the two.",
    "runtime" : "179"
    },

    "2" : {
        "id": "2",
        "title": "Nightmare Alley",
        "image": "https://m.media-amazon.com/images/M/MV5BOTI4NDhhNGEtZjQxZC00ZTRmLThmZTctOGJmY2ZlOTc0ZGY0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        "nominations": ["Best Picture", "Best Cinematography", "Best Costume Design", "Best Production Design"],
        "director": "Guillermo del Toro",
        "actors": ["Bradley Cooper", "Cate Blanchett", "Rooney Mara", "Toni Collette"], 
        "summary": "In 1940s New York, down-on-his-luck Stanton Carlisle endears himself to a clairvoyant and her mentalist husband at a traveling carnival. Using newly acquired knowledge, Carlisle crafts a golden ticket to success by swindling the elite and wealthy.",
        "runtime" : "140"
        },

    "3" : {
        "id": "3",
        "title": "Dont Look Up",
        "image": "https://m.media-amazon.com/images/M/MV5BY2FjNTE2MGYtYTU0My00Y2Y4LTlhZDgtODk0NWZhOGUwZjM3XkEyXkFqcGdeQXVyMTE2Mzg1NTEy._V1_FMjpg_UY720_.jpg",
        "nominations": ["Best Picture", "Best Music", "Best Original Screenplay"],
        "director": "Adam McKay",
        "actors": ["Leonardo Dicaprio", "Meryl Streep", "Jennifer Lawrence", "Timothee Chalamet"], 
        "summary": "Two low-level astronomers must go on a giant media tour to warn mankind of an approaching comet that will destroy planet Earth.",
        "runtime" : "138"
        },   

    "4" : {
        "id": "4",
        "title": "Dune",
        "image": "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX509_.jpg",
        "nominations": ["Best Picture", "Best Music", "Best Adapted Screenplay", "Best Visual Effects", "Best Cinematography", "Best Production Design", "Best Costume Design", "Best Sound", "Best Editing"],
        "director": "Denis Villeneuve",
        "actors": ["Zendaya", "Rebecca Ferguson", "Jason Mamoa", "Timothee Chalamet"], 
        "summary": "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence, only those who can conquer their own fear will survive.",
        "runtime" : "156"
        },  
    
    "5" : {
        "id": "5",
        "title": "Belfast",
        "image": "https://m.media-amazon.com/images/M/MV5BODMwYTYyY2ItOWQ5Yi00OTI1LTllYTQtYTdlNWM4YzJhYTM0XkEyXkFqcGdeQXVyMTA2MDU0NjM5._V1_FMjpg_UX972_.jpg",
        "nominations": ["Best Picture", "Best Supporting Actress", "Best Supporting Actor", "Best Original Screenplay", "Best Directing"],
        "director": "Kenneth Branagh",
        "actors": ["Caitríona Balfe", "Judi Dench", "Jamie Dornan", "Ciarán Hinds"], 
        "summary": "A semi-autobiographical film which chronicles the life of a working class family and their young son's childhood during the tumult of the late 1960s in the Northern Ireland capital.",
        "runtime" : "97"
        }, 
        
    "6" : {
        "id": "6",
        "title": "Licorice Pizza",
        "image": "https://m.media-amazon.com/images/M/MV5BZTgxMWJkMzItMzg1YS00NDJiLTljYjctMTc2YzQzZDZjZDAyXkEyXkFqcGdeQXVyODQ2OTIzNDU@._V1_FMjpg_UX640_.jpg",
        "nominations": ["Best Picture", "Best Original Screenplay", "Best Directing"],
        "director": "Paul Thomas Anderson",
        "actors": ["Alana Haim", "Cooper Hoffman", "Bradley Cooper", "George Dicaprio"], 
        "summary": "Alana Kane and Gary Valentine grow up, run around, and fall in love in California's San Fernando Valley in the 1970s.",
        "runtime" : "137"
        },

    "7" : {
        "id": "7",
        "title": "The Power of the Dog",
        "image": "https://m.media-amazon.com/images/M/MV5BZGRhYjE2NWUtN2FkNy00NGI3LTkxYWMtMDk4Yjg5ZjI3MWI2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1013_.jpg",
        "nominations": ["Best Picture", "Best Adapted Screenplay", "Best Directing", "Best Supporting Actress", "Best Supporting Actor", "Best Actor", "Best Sound", "Best Editing", "Best Cinematography", "Best Production Design"],
        "director": "Jane Campion",
        "actors": ["Benedict Cumberbatch", "Kirsten Dunst", "Jesse Plemons", "Kodi Smit-McPhee"], 
        "summary": "Charismatic rancher Phil Burbank inspires fear and awe in those around him. When his brother brings home a new wife and her son, Phil torments them until he finds himself exposed to the possibility of love.",
        "runtime" : "126"
        },

    "8" : {
        "id": "8",
        "title": "West Side Story",
        "image": "https://m.media-amazon.com/images/M/MV5BMzQ5ZDZhZDItZTNmZi00MWQ0LWJlNDUtZTE4ZWJmODNlM2Y3XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_FMjpg_UX743_.jpg",
        "nominations": ["Best Picture", "Best Directing", "Best Supporting Actress", "Best Sound", "Best Cinematography", "Best Production Design"],
        "director": "Steven Spielberg",
        "actors": ["Ariana DeBose", "David Alvarez", "Mike Faist", "Rita Moreno"], 
        "summary": "Charismatic rancher Phil Burbank inspires fear and awe in those around him. When his brother brings home a new wife and her son, Phil torments them until he finds himself exposed to the possibility of love.",
        "runtime" : "156"
        }, 
        
    "9" : {
        "id": "9",
        "title": "King Richard",
        "image": "https://m.media-amazon.com/images/M/MV5BYTcyNmY4ZGEtYmE4Zi00ZDViLTlmYzMtMmQ4ZTM4OWNmZjQxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UY720_.jpg",
        "nominations": ["Best Picture", "Best Actor", "Best Supporting Actress", "Best Music", "Best Editing", "Best Original Screenplay"],
        "director": "Reinaldo Marcus Green",
        "actors": ["Will Smith", "Aunjanue Ellis", "Demi Singleton", "Saniyya Sidney"], 
        "summary": "Armed with a clear vision and a brazen, 78-page plan, Richard Williams is determined to write his two daughters, Venus and Serena, into history. Training on tennis courts in Compton, Calif., Richard shapes the girls' unyielding commitment and keen intuition. Together, the Williams family defies seemingly insurmountable odds and the prevailing expectations laid before them.",
        "runtime" : "144"
        },     

    "10" : {
        "id": "10",
        "title": "Coda",
        "image": "https://m.media-amazon.com/images/M/MV5BNGNmMzJjMTItODA0OC00ZWM0LWJmMTctMDg3MzM2M2Y5NTIyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX675_.jpg",
        "nominations": ["Best Picture", "Best Supporting Actor", "Best Adapted Screenplay"],
        "director": "Sian Heder",
        "actors": ["Emilia Jones", "Marlee Matlin", "Troy Kotsur", "Daniel Durant"], 
        "summary": "Ruby is the only hearing member of a deaf family from Gloucester, Massachusetts. At 17, she works mornings before school to help her parents and brother keep their fishing business afloat. But in joining her high school's choir club, Ruby finds herself drawn to both her duet partner and her latent passion for singing.",
        "runtime" : "91"
        },   
}

current_id = 10

@app.route('/')
def homePage():
   return render_template('homePage.html', films = films)  

@app.route('/view/<id>')
def view(id=None):
   return render_template('view_id.html', films = films, id=id)  

@app.route('/search_results/<text>', methods=['GET', 'POST'])
def search(text=None):
    global results
    results = []

    global resultsTitle
    resultsTitle = []
    global resultsNoms
    resultsNoms = []
    global resultsDirector
    resultsDirector = []
    global nominations
    nominations = []   
    auxiliaryList = [] 

    for row in films.values():
        print(row)
        if text.lower() in row["title"].lower():
            print(row["title"])
            resultsTitle.append(row)

    for row in films.values():
        print(row)
        if text.lower() in row["director"].lower():
            print(row["director"])
            resultsDirector.append(row)

    
    for row in films.values():
        for nominations in row["nominations"]:
            print(nominations)
            if text.lower() in nominations.lower() and text not in auxiliaryList:
                resultsNoms.append(row)
                break
   
    return render_template('searchResults.html', results = results, resultsTitle = resultsTitle, resultsDirector = resultsDirector, resultsNoms = resultsNoms, text = text)  

@app.route('/add', methods=['GET', 'POST'])
def add():
    return render_template('add.html')  

@app.route('/add_title', methods=['GET', 'POST'])
def add_title():

    global title
    global image 
    global nominations
    global director 
    global actors 
    global summary
    global runtime 
    global current_id
    global films

    json_films = request.get_json()   
    title = json_films["title"] 
    image = json_films["image"] 
    nominations = json_films["nominations"] 
    director = json_films["director"] 
    actors = json_films["actors"]
    summary = json_films["summary"] 
    runtime = json_films["runtime"]  
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    new_film_entry = {
        "id": current_id,
        "title": title,
        "image": image,
        "nominations": nominations,
        "director": director,
        "actors": actors,
        "summary": summary,
        "runtime":  runtime
    }
    outerLayer = {

    }

    films['current_id'] = new_film_entry

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(films = films, new_film_entry = new_film_entry, current_id = current_id)
 
@app.route('/edit/<id>', methods=['GET', 'POST'])
def edit(id=None):
    global films
    return render_template('edit_id.html', id = id, films = films)  


@app.route('/edit_title', methods=['GET', 'POST'])
def edit_title():
   
    global id    

    json_films = request.get_json()   
    id = json_films["id"]  
    title = json_films["title"] 
    image = json_films["image"] 
    nominations = json_films["nominations"] 
    director = json_films["director"] 
    actors = json_films["actors"]
    summary = json_films["summary"] 
    runtime = json_films["runtime"]  
   
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    new_film_entry = {
        "id": id,
        "title": title,
        "image": image,
        "nominations":  nominations,
        "director": director,
        "actors": actors,
        "summary": summary,
        "runtime":  runtime
    }
    
    films[id] = new_film_entry

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(films = films, new_film_entry = new_film_entry, id= id, current_id = current_id)
 


if __name__ == '__main__':
   app.run(debug = True)

 

