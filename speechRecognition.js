var final_transcript = "";
var padType = "";
var itemsForComparison = ['+', '-', '*', '/'];
var finalResult  = "";

if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
  
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
        document.querySelector('.keypad').style.display = 'block';
        document.querySelector('.speech-box').style.display = 'none';
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
        finalResult = ""
;        document.querySelector('.keypad').style.display = 'block';
        document.querySelector('.speech-box').style.display = 'none';
        speechRecognition.stop();

       var finalItems = []; 
       finalItems = final_transcript.split('');

      for(let i = 0; i < finalItems.length; i++){
            finalItems[i] = finalItems[i].toUpperCase();

            for(let j = 0; j < itemsForComparison.length; j++){
                if (finalItems[i] == itemsForComparison[j])
                    finalResult += finalItems[i];
            }
       }

       document.querySelector('.input-box').value = finalResult;
    };
    
  } else {
    console.log("Speech Recognition Not Available");
  }