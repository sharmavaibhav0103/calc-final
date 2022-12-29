var screen = "";
let padBase = 0;
const history = [];
const apiKey = "2bed3fe195e5fbbca5ac4f69f6998b73";
let mode = 1;
var tempInput = "";
var keyInput = ['+', '-', '*', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

//Tweaking DOM 
const hexpad = document.getElementsByClassName('hexpad');
const binpad = document.getElementsByClassName('binpad');
const octpad = document.getElementsByClassName('octpad');
const decpad = document.getElementsByClassName('decpad');
const inputBox = document.getElementById('input-box');
const historyBtn = document.querySelector(".history-btn");
const historyClose = document.querySelector(".history-close")
const historyUL = document.getElementById('historyUL');
const historyBox = document.querySelector('.history');
const hexValue = document.querySelector('.hex-value');
const octValue = document.querySelector('.oct-value');
const binValue = document.querySelector('.bin-value');
const decValue = document.querySelector('.dec-value');

window.addEventListener('load', () => {
    window.localStorage.setItem('activepad', 'hexpad');
    padBase = 16;
});
window.addEventListener('keydown', (e) => {
    if(keyInput.indexOf(e.key.toUpperCase()) != -1){
        addInput(e.key);
    }
    if(e.key == 'Backspace'){
        ce();
    }
});

function closeActivePad(){
    const activepad = window.localStorage.getItem('activepad');
    const ipad =  document.getElementsByClassName(activepad)[0];
    
    ipad.style.display = "none";
    
}

function changeKeypad(param){
    clearAll();
    closeActivePad(param);
    window.localStorage.setItem('activepad', param);

    if(param == 'decpad'){
        decpad[0].style.display = "block";
        padBase = 10;
    }
    else if(param == 'octpad'){
        octpad[0].style.display = "block";
        padBase = 8;
    }

    else if (param == 'hexpad'){
        hexpad[0].style.display = "block";
        padBase = 16;
    }

    else if(param == 'binpad'){
        binpad[0].style.display = "block";
        padBase = 2;
    }
}


function addInput(input){
    screen = screen + input;
    inputBox.value = screen;
    convertAll();
}
function clearAll(){
    screen = "";
    inputBox.value = screen;
    hexValue.innerHTML = 0;
    octValue.innerHTML = 0;
    decValue.innerHTML = 0;
    binValue.innerHTML = 0;
}
function ce(){
    if(screen.length > 0)
        screen = screen.substring(0, screen.length -1)
        inputBox.value = screen;
        convertAll();
    if(screen.length < 1){
        hexValue.innerHTML = 0;
        octValue.innerHTML = 0;
        decValue.innerHTML = 0;
        binValue.innerHTML = 0;
    }
}


function calculate() {
    //Creating history
    history.push(screen);

    if (screen.indexOf("+") != -1) {
      var ans = 0;  
      var numbers = screen.split("+");
      
      for(let i = 0; i < numbers.length; i++)
        ans += parseInt(numbers[i], padBase);

      screen = ans.toString(padBase);
      inputBox.value = screen;
      history[history.length-1] = history[history.length-1] + " = " + screen;
      appendHistory();

    } else if (screen.indexOf("-") != -1) {
        var numbers = screen.split("-");
        var ans = numbers[0];  
        for(let i = 1; i < numbers.length; i++){
            ans = parseInt(ans, padBase) - parseInt(numbers[i], padBase);
        }
        screen = ans.toString(padBase);
        inputBox.value = screen;
        history[history.length-1] = history[history.length-1] + " = " + screen;
        appendHistory();

    } else if (screen.indexOf("*") != -1) {
        var ans = 1;  
        var numbers = screen.split("*");
        
        for(let i = 0; i < numbers.length; i++){
            ans = ans * parseInt(numbers[i], padBase);
        }
        screen = ans.toString(padBase);
        inputBox.value = screen;
        history[history.length-1] = history[history.length-1] + " = " + screen;
        appendHistory();

    } else if (screen.indexOf("/") != -1) {
        var numbers = screen.split('/');
        var ans = numbers[0];  
        
        for(let i = 1; i < numbers.length; i++){
          ans /= parseInt(numbers[i], padBase);
        }
        screen = ans.toString(padBase);
        inputBox.value = screen;
        history[history.length-1] = history[history.length-1] + " = " + screen;
        appendHistory();
    }
    convertAll();
}

// function calculateEq(){
//     screen = inputBox.value;
//     var eq = screen.split(/([+-/*])/);

//     while(eq.indexOf("/") != -1){
//         let ind = eq.indexOf("/");
//         eq[ind-1] = parseInt(eq[ind-1], padBase) / parseInt(eq[ind+1], padBase); 
//         delete eq[ind];
//         delete eq[ind+1];
//         eq = eq.filter(a => a)
//     }
//      while(eq.indexOf("*") != -1){
//         let ind = eq.indexOf("*");
//         eq[ind-1] = parseInt(eq[ind-1], padBase) * parseInt(eq[ind+1], padBase);
//         delete eq[ind];
//         delete eq[ind+1];
//         eq = eq.filter(a => a)
//     }
//      while(eq.indexOf("+") != -1){
//         let ind = eq.indexOf("+");
//         eq[ind-1] = parseInt(eq[ind-1], padBase) + parseInt(eq[ind+1], padBase);  
//         delete eq[ind];
//         delete eq[ind+1];
//         eq = eq.filter(a => a)
//         console.log("hey", eq)
//     }
//      while(eq.indexOf("-") != -1){
//         let ind = eq.indexOf("-");
//         eq[ind-1] = parseInt(eq[ind-1], padBase) - parseInt(eq[ind+1], padBase);   
//         delete eq[ind];
//         delete eq[ind+1];
//         eq = eq.filter(a => a)
//     }

//     console.log(x.toString(padBase))
//     console.log(eq[0].toString(padBase))
// }

function convertAll(){
    if(screen != ""){
        hexValue.innerHTML = parseInt(screen, padBase).toString(16);
        octValue.innerHTML = parseInt(screen, padBase).toString(8);
        decValue.innerHTML = parseInt(screen, padBase).toString(10);
        binValue.innerHTML = parseInt(screen, padBase).toString(2);
    }
}
// function convert(ct){
//     if(screen.indexOf('/*+-') === 0){
//         screen = "error";
//         inputBox.value = screen;
//     }
//     else{
//         screen = parseInt(screen, padBase).toString(ct);
//         inputBox.value = screen;
//     }
// }

function complement(){
    if(screen.indexOf('/*+-') === 0){
        screen = "error";
        inputBox.value = screen;
    }
    else{
        
    var sBinString = screen
                .replace(/1/g,'x')//convert '1' to temp char('x')
                .replace(/0/g,'1')//convert '0' to '1'
                .replace(/x/g,'0')//finally convert temp char to '0'
    }

    screen = sBinString;
    inputBox.value = screen;
}

function lshift(){
    var lvalue = screen;
    if(screen.indexOf('/*+-') === 0){
        screen = "error";
        inputBox.value = screen;
    }
    else{
        lvalue = screen.substring(1, screen.length) + screen[0];
        screen = lvalue;
        inputBox.value = lvalue;
    }
}
function rshift(){
    var rvalue = screen;
    let len = screen.length; 
    if(screen.indexOf('/*+-') === 0){
        screen = "error";
        inputBox.value = screen;
    }
    else{
        rvalue = screen.substring(1, screen.length) + screen[0];
        screen = rvalue;
        inputBox.value = rvalue;
    }
}

//history work
function openHistory(){
    historyBox.classList.add('history-animation');
}

function closeHistory(){
    historyBox.classList.remove("history-animation");
}
function appendHistory(){
    var li = document.createElement('li');
    var historytext = document.createTextNode(history[history.length-1]);
    li.appendChild(historytext);
    historyUL.appendChild(li); 
}


//Speech Recognition
var final_transcript = "";
var padType = "";
var itemsForComparison = ['+', '-', '*', '/'];
var finalResult  = "";

if ("webkitSpeechRecognition" in window) {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let speechRecognition = new SpeechRecognition();
  
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "India";
  
    speechRecognition.onstart = () => {
        document.querySelector('.keypad').style.display = 'none';
        document.querySelector('.speech-box').style.display = 'block';
    };
    speechRecognition.onerror = () => {
      document.querySelector('.input-box').value = "Error Occured!";
      console.log("Speech Recognition Error");
    };
    speechRecognition.onend = () => {
        document.querySelector('.speech-box').style.display = 'none';
        document.querySelector('.keypad').style.display = 'block';
        console.log('Speech Recognition Ended!');
    };
  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      document.querySelector(".final-speech").innerHTML = final_transcript;
      document.querySelector(".interim-speech").innerHTML = interim_transcript;
    };
  
    function startSpeech(){
      itemsForComparison = ['+', '-', '*', '/'];
      padType = window.localStorage.getItem('activepad');
      switch(padType){
        case 'hexpad' : {
            for(var i = 0; i<=9; i++){
                let temp = i.toString();
                itemsForComparison.push(temp);
            }    
            for(var i = 65; i <= 70; i++){
                let temp = String.fromCharCode(i);
                itemsForComparison.push(temp);
            }     
        }; break;

        case 'decpad' : {
            for(var i = 0; i < 10; i++){
                let temp = i.toString();
                itemsForComparison.push(temp);
            }    
        }; break;
        
        case 'octpad' : {
            for(var i = 0; i < 8; i++){
                let temp = i.toString();
                itemsForComparison.push(temp);
            }    
        }; break;

        case 'binpad' : {
            itemsForComparison.push('0');
            itemsForComparison.push('1');
        }; break;

        default : itemsForComparison = ['+', '-', '*', '/'];
      }
      speechRecognition.start();
      final_transcript = "";
    };

    function stopSpeech(){
        document.querySelector('.speech-box').style.display = 'none';
        document.querySelector('.keypad').style.display = 'block';
        
        var finalItems = []; 
       finalItems = final_transcript.split('');
       
       for(let i = 0; i < finalItems.length; i++){
           finalItems[i] = finalItems[i].toUpperCase();

            for(let j = 0; j < itemsForComparison.length; j++){
                if (finalItems[i] == itemsForComparison[j])
                finalResult += finalItems[i];
            }
        }
        
        screen = finalResult;
        inputBox.value = screen;
        speechRecognition.stop();
    };
    
  } else {
    console.log("Speech Recognition Not Available");
  }

//Weather API
function searchWeather(){
    const locationName = document.querySelector('.weather-input').value;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName},India?key=Q6L67RM6BAZ79E33GRG793Q35`;
    locationName.value = "";
    const location = document.querySelector('.location');
    const humid = document.querySelector('.humid');
    const windSpeed = document.querySelector('.windSpeed');
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        snode(data);
        location.innerHTML = data.resolvedAddress;
        document.querySelector('.condition').innerHTML = data.currentConditions.conditions;
        let tempInCelius = (data.currentConditions.temp-32)*(5/9);
        document.querySelector('.temperature').innerHTML = Math.round(tempInCelius) + "&#8451;";
        document.querySelector('.humid').innerHTML = data.currentConditions.humidity;
        document.querySelector('.windSpeed').innerHTML = data.currentConditions.windspeed;
        document.querySelector('.sunrise').innerHTML = data.currentConditions.sunrise;
        document.querySelector('.sunset').innerHTML = data.currentConditions.sunset;
    })
    .catch(() => {
            window.alert("Please search for a valid city 😩");
    });
}

function snode(data){
    console.log('snode')
    fetch('http://localhost:3000/weather-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
        },
        body: JSON.stringify({
            "city": "doon"
        })
    }).then((res) => res.json()).then(data => console.log(data))
}
function openWeather(){
    document.querySelector('.keypad').style.display = 'none';
    document.querySelector('.weather').style.display = 'block';
}

function closeWeather(){
    let w = document.querySelector('.weather');
    w.classList.add('weather-close-animation');
    setTimeout(() => {
        w.style.display = 'none';
        document.querySelector('.keypad').style.display = 'block';
        w.classList.remove('weather-close-animation');
    }, 1000)
}

// Light And Dark Mode
function changeLDMode(){
    const bd = document.querySelector('body');

    if(mode == 1){
        mode = 2;
        bd.style.filter = 'invert(1)';
        bd.style.background = "#f7f7f7";
    }
    else{
        mode = 1;
        bd.style.filter = 'invert(0)';  
        bd.style.background = "#3e3e3e";
    }
}

var element = document.getElementById('zoom');
element.addEventListener('mouseover', () => {
    element.style.fontSize = "25px";
});
element.addEventListener('mouseleave', () => {
    element.style.fontSize = "16px";
});