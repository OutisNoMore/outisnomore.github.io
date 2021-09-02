const GIF = 'https://media3.giphy.com/media/l3q2IYN87QjIg51kc/giphy.gif?cid=ecf05e47i54foxrjh7e4w2mbwabd77019c4j5drqu66uittr&rid=giphy.gif'

let Recording = function(cb){
	let recorder = null;
  let recording = true;
  let audioInput = null;
  let volume = null;
  let audioContext = null;
  let callback = cb;

  navigator.getUserMedia = navigator.getUserMedia    || navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia || navigator.msGetUserMedia;

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
};

let lastClap = (new Date()).getTime();

function detectClap(data){
	let t = (new Date()).getTime();
  if(t - lastClap < 200) return false; // TWEAK HERE
  	let zeroCrossings = 0, highAmp = 0;
    for(let i = 1; i < data.length; i++){
    	if(Math.abs(data[i]) > 0.10) highAmp++; // TWEAK HERE
      if(data[i] > 0 && data[i-1] < 0 || data[i] < 0 && data[i-1] > 0) zeroCrossings++;
	  }
    if(highAmp > 20 && zeroCrossings > 30){ // TWEAK HERE
      //console.log(highAmp+' / '+zeroCrossings);
      lastClap = t;
    	return true;
    }
	return false;
}

let rec = new Recording(function(data){
	if(detectClap(data)){
		console.log('clap!');
		let url = document.getElementById("hourglass").src;
		if(url == GIF){
			document.getElementById("hourglass").src = "./hourglass/hourglass.jpg";
		} else{
			document.getElementById("hourglass").src = GIF;
		}
	}
});
