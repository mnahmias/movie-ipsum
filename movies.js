
// Vars
var paragraphs = 3;
var paragraphLength = 3;
var button = document.getElementById('run');
var allQuotes = [];
var sfw = [];
var usedQuotes = [];
var output = document.getElementById('output');
var quoteData = "http://matthewnahmias.com/ipsum/quotes.json";

//get data
$.getJSON(quoteData, function (json) {
  $.each( json, function( key, val ) {
    if(val.sfw === 'yes'){
      sfw.push(val.quote);
    }
    allQuotes.push(val.quote);
  });
})
  .done(function() {
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
  })
  .always(function() {
  });

//Add in Knuth shuffle for randomizing quote arrays
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Create function that returns concatenated quotes as html and add it to page
function addParagraphs(){
  var pValue = paragraphs.value;
  var pLengthValue = paragraphLength.value
  var paragraphContainer;
  var currentParagraph;
  var currentQuote;

  //empty output container
  output.innerHTML = '';

  //randomize quote array
  shuffle(allQuotes);

  //Create loop that adds p tags to page
  for(i = 0; i < paragraphs; i++){
    currentParagraph = '';
    for(ii = 0; ii < paragraphLength; ii++){
      currentQuote = allQuotes.shift();
      usedQuotes.push(currentQuote);
      currentParagraph = currentParagraph.concat(currentQuote + " ");
    }
    paragraphContainer = document.createElement('p');
    paragraphContainer.innerHTML = currentParagraph;
    output.appendChild(paragraphContainer);
    console.log(i);
  }
  //rejoin used quotes to array of all quotes and reset used quotes
  allQuotes = allQuotes.concat(usedQuotes);
  usedQuotes = [];
}

button.onclick = addParagraphs;
