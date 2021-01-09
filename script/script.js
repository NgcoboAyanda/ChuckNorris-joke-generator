
function get() {
    const theData = localStorage.getItem('jokes');
    if (theData) {
        JSON.parse(theData).forEach( function(item){
            const newItem = document.createElement('li');
            newItem.className = 'joke';
            newItem.appendChild(document.createTextNode(item));
            jokeOutput.appendChild(newItem);
        } );
    }
}

//get jokes button
const getJokesBtn = document.querySelector('.get-jokes');
//number of jokes input
const jokeInput = document.querySelector('#number');

//jokes output
const jokeOutput = document.querySelector('.jokes');

    //event listener for get jokes button
getJokesBtn.addEventListener('click',getJokes);

    function getJokes(e) {
        if (jokeInput.value.length > 0) {
            const number = jokeInput.value;
        //creating new http request object
        const xmlHTTP = new XMLHttpRequest();

    
    //GET is the method for retrieving data
    //the second parameter is the API url
    //the third is a boolean (true which makes it asynchronous) 
        xmlHTTP.open('GET',`http://api.icndb.com/jokes/random/${number}`, true);

    //what happens when the data loads
        xmlHTTP.onload = function () {
        //condotional to check if data was succesfully retrieved
        if (this.status === 200 ) {
            const response = JSON.parse(this.responseText);
            const jokes = response.value;
            const theData = [];
            //function to add jokes to UI
            function addJokes(theArray) {
                theArray.forEach( function(joke){
                    const newItem = document.createElement('li');
                    newItem.className = 'joke';
                    newItem.appendChild(document.createTextNode(joke.joke));
                    jokeOutput.appendChild(newItem);
                    theData.push(joke.joke);
                } );
            }
            //what to do if some generated jokes exist in the ui 
            //conditional to first check if there any jokes before adding
            if (document.querySelector('.joke')) {
                document.querySelectorAll('.joke').forEach( function(joke){
                    //removing every joke first
                    joke.remove();
                  }       
                );
                addJokes(jokes);
            }
            else {
                addJokes(jokes);
            }

            localStorage.setItem('jokes', JSON.stringify(theData) );
            
            }
        
    }

    xmlHTTP.send();
        }
        
    e.preventDefault();
    }
   