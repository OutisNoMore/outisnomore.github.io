/*
 * initializeCanvas
 *   Initializes a webGL context from an existing canvas. 
 *   Sets the background to black
 */
function initCanvas(){
  const canvas = document.querySelector("#glCanvas"); // get canvas to draw on
  const glContext = canvas.getContext("webgl"); // initialize GL context for canvas

  if(glContext === null){
    // Could not initialize context
    alert("Unable to initialize WebGL");
    return;
  }

  // Set the clear color to black
  glContext.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear context using the clearColor
  glContext.clear(glContext.COLOR_BUFFER_BIT);
}

// Run main function on load
window.onload = initCanvas;
