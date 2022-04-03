const GIF = 'https://media3.giphy.com/media/l3q2IYN87QjIg51kc/giphy.gif?cid=ecf05e47i54foxrjh7e4w2mbwabd77019c4j5drqu66uittr&rid=giphy.gif'

let Recording = function(cb){
  let recorder = null;
  let recording = true;
  let audioInput = null;
  let volume = null;
  let audioContext = null;
  let callback = cb;

//  navigator.mediaDevices.getUserMedia = navigator.getUserMedia    || navigator.webkitGetUserMedia ||
//                                        navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.mediaDevices.getUserMedia({audio: true})
  .then(function(stream){
    if(stream != null){
      // stream was successfully created and initialized
      let AudioContext = window.AudioContext || window.webkitAudioContext; // create audio context
      audioContext = new AudioContext();
      volume = audioContext.createGain(); // creates a gain node
      audioInput = audioContext.createMediaStreamSource(stream); // creates an audio node from the mic stream - allows for data manipulation
      audioInput.connect(volume);// connect the stream to the gain node

      recorder = audioContext.createScriptProcessor(2048, 1, 1);

      recorder.onaudioprocess = function(e){
        if(!recording) return; // check if recording
        let left = e.inputBuffer.getChannelData(0); // use left channel from audio
        //let right = e.inputBuffer.getChannelData(1); // for audio with multiple channels
        callback(new Float32Array(left)); // callback function
      };
      volume.connect(recorder);// connect the recorder
     	recorder.connect(audioContext.destination);
    }
    else{
      alert("Error capturing audio");
    }
  })
  .catch(function(err){
    // stream could not be established
    alert("ERROR: navigator.mediaDevices.getUserMedia not supported");
    console.log(err);
  });

/*
  if(navigator.getUserMedia){
    navigator.getUserMedia({audio:true},
    function(e){ //success
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
      volume = audioContext.createGain(); // creates a gain node
      audioInput = audioContext.createMediaStreamSource(e); // creates an audio node from the mic stream
      audioInput.connect(volume);// connect the stream to the gain node
      recorder = audioContext.createScriptProcessor(2048, 1, 1);

      recorder.onaudioprocess = function(e){
        if(!recording) return;
        let left = e.inputBuffer.getChannelData(0);
        //let right = e.inputBuffer.getChannelData(1);
      	callback(new Float32Array(left));
      };
      volume.connect(recorder);// connect the recorder
    	recorder.connect(audioContext.destination);
    },
    function(e){ //failure
    	alert('Error capturing audio.');
    }
    );
  } else {
    alert('getUserMedia not supported in this browser.');
	}
  */
};

let lastClap = (new Date()).getTime();

// accepts an array of sound data
let SENSITIVITY = 0.10
let MAXAMPLITUDE = 20
let ZEROCROSS = 30
let TIME = 200
function detectClap(data){
	let t = (new Date()).getTime();
  if(t - lastClap < TIME) return false; // Time between claps
  	let zeroCrossings = 0, highAmp = 0;
    // Iterate through all sound bytes in given array
    for(let i = 1; i < data.length; i++){
    	if(Math.abs(data[i]) > SENSITIVITY) highAmp++; // Add all sounds louder than sensitivity threshold
      if(data[i] > 0 && data[i-1] < 0 || data[i] < 0 && data[i-1] > 0) zeroCrossings++; // zero crossing or change in pitch/sound exists
	  }
    if(highAmp > MAXAMPLITUDE && zeroCrossings > ZEROCROSS){ // Check how long clap is and that sound is recognizable
      lastClap = t;
    	return true;
    }
	return false;
}

let rec = new Recording((data) => {
  if(detectClap(data)){
		console.log('clap!');
		let url = document.getElementById("hourglass").src;
		if(url == GIF){
			document.getElementById("hourglass").src = "util/hourglass.jpg";
		} else{
			document.getElementById("hourglass").src = GIF;
		}
	}
});
