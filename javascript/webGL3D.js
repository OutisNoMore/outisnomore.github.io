/*
 * initializeCanvas
 *   Initializes a webGL context from an existing canvas. 
 *   Sets the background to black
 */
function main(){
  const canvas3D = document.querySelector("#glCanvas3D"); // get canvas to draw on
  const glContext3D = canvas3D.getContext("webgl"); // initialize GL context for canvas

  if(glContext3D === null){
    // Could not initialize context
    alert("Unable to initialize WebGL");
    return;
  }

  // Set the clear color to black
  glContext3D.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear context using the clearColor
  glContext3D.clear(glContext3D.COLOR_BUFFER_BIT);

  const VertexShader = `
    attribute vec4 aVertexPosition; // Position of shape
    attribute vec4 aVertexColor;    // color of shape

    uniform mat4 uModelViewMatrix;  // 4x4 matrix view
    uniform mat4 uProjectionMatrix; // 4x4 matrix projection

    varying lowp vec4 vColor;

    void main(){
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
    `;

  const FragmentShader = `
    varying lowp vec4 vColor;

    void main(){
      gl_FragColor = vColor;
    }
  `;

  // create new shader program
  const shaderProgram = initShaderProgram(glContext3D, VertexShader, FragmentShader);
 
  // programInfo - info for shaders
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: glContext3D.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: glContext3D.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocation: {
      projectionMatrix: glContext3D.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: glContext3D.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // Create position array
  const positions = [
    1.0, 1.0,
   -1.0, 1.0,
    1.0,-1.0,
   -1.0,-1.0,
  ];
  // buffer of positions
  const buffers = initBuffers(glContext3D, positions);
  // Re-draw 2d scene every frame
  let translate = [-0.0, 0.0, -6.0];
  let rotate = [1,-1,-1];
  let then = 0;
  function render(now){
    now *= 0.001; // convert to seconds
    const deltaTime = now - then; // calculate change in time between frame
    then = now // update time
    drawScene(glContext3D, programInfo, buffers, deltaTime, translate, rotate); // redraw scene
    requestAnimationFrame(render); // callback render function every frame
  }
  requestAnimationFrame(render); // call render function every frame
}

// Run main function on load
window.addEventListener("load", main);
