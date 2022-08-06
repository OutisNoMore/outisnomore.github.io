/*
 * loadShader
 *   Compiles a shader with given type
 * ------------------------------------
 * PARAMETER:
 *   gl - webGL canvas
 *   type - type of shader to create
 *   source - source for shader
 * ------------------------------------
 * RETURN:
 *   compiled shader
 */
function loadShader(gl, type, source){
  const shader = gl.createShader(type);
  // Source to shader
  gl.shaderSource(shader, source);

  // compile shader
  gl.compileShader(shader);

  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
    // Failed to compile shader
    console.log(`An error occurred while compiling the shaders: 
                 ${gl.getShaderInfoLog(shader)}
                `);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/*
 * initShaderProgram
 *   Shader program to create shape
 * ----------------------------------
 * PARAMETERS:
 *   gl - webgl canvas
 *   vsSource - vertex shader
 *   fsSource - fragment shader
 * ---------------------------------
 *  RETURN:
 *    initialized shader program
 */
function initShaderProgram(gl, vsSource, fsSource){
  // Load both shaders
  const vertex_shader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragment_shader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create shader program
  const shader_program = gl.createProgram();
  gl.attachShader(shader_program, vertex_shader);
  gl.attachShader(shader_program, fragment_shader);
  gl.linkProgram(shader_program);

  if(!gl.getProgramParameter(shader_program, gl.LINK_STATUS)){
    // Failed to create shader program
    console.log(`Unable to initialize shader program: 
               ${gl.getProgramInfoLog(shader_program)}
               `);
    return null;
  }

  return shader_program
}

/*
 * initBuffers
 *   create buffer to store vertex position
 * ----------------------------------------
 * PARAMETERS:
 *   gl - webGL canvas context
 * ----------------------------------------
 * RETURN
 *   buffer with positions
 */
function initBuffers(gl){
  // Colors
  const colors = [
    1.0, 1.0, 1.0, 1.0, // white
    1.0, 0.0, 0.0, 1.0, // red
    0.0, 1.0, 0.0, 1.0, // green
    0.0, 0.0, 1.0, 1.0, // blue
  ];
  // Create buffer for colors
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Create position array
  const positions = [
    1.0, 1.0,
   -1.0, 1.0,
    1.0,-1.0,
   -1.0,-1.0,
  ];
  // Create buffer with position of square
  const positionBuffer = gl.createBuffer();
  // Use position buffer for gl rendering
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Pass position array to webGL to draw
  // Use float32Array to pass
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

/*
 * drawScene
 *   Draws shape on canvas
 * ----------------------------------------
 * PARAMETERS:
 *   gl - webGL canvas context
 *   programInfo - info handler for shader
 *   buffers - position buffers
 * ----------------------------------------
 * RETURN:
 *   none
 */
function drawScene(gl, programInfo, buffers){
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // clear canvas to black
  gl.clearDepth(1.0);                // clear perspectives
  gl.enable(gl.DEPTH_TEST);          // enable depth testing
  gl.depthFunc(gl.LEQUAL);           // Near things obscure far things

  // clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create perspective matrix
  // Used to simulate camera distortion
  const fieldOfView = Math.PI / 4; // Field of view of 45 degrees
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight; // set w/h ratio to that of canvas
  const zNear = 0.1;  // from 0.1 units
  const zFar = 100.0; // to 100 units away from camera
  const projectionMatrix = mat4.create(); 
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);
  // create matrix
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix,    // destination matrix
                 modelViewMatrix,    // matrix to translate
                 [-0.0, 0.0, -6.0]); // amount to translate

  // Specify how to pull positions from position buffer into vertexPosition
  {
    const numComponents = 2; // pull 2 values per iteration
    const type = gl.FLOAT;   // data type is 32 bit float
    const normalize = false; // don't normalize
    const stride = 0;        // number of bytes to get from one set to next
                             // 0 = use type and numComponents
    const offset = 0;        // which byte inside buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);
  }
  // Specify how to use color buffer
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexColor);
  }
  // set this program to webgl
  gl.useProgram(programInfo.program);
  // set shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocation.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocation.modelViewMatrix,
    false,
    modelViewMatrix);
  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

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

  /*
   * Vertex Shader
   * Creates a shape based on input
   * Vertices and coordinates. Performs
   * transformations, projections ...
   */
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

  /*
   * Fragment Shader
   * Called on every pixel of shape.
   * Applies color to texture of shape
   */
  const FragmentShader = `
    varying lowp vec4 vColor;

    void main(){
      gl_FragColor = vColor;
    }
  `;

  // create new shader program
  const shaderProgram = initShaderProgram(glContext, VertexShader, FragmentShader);
 
  // programInfo - info for shaders
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: glContext.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: glContext.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocation: {
      projectionMatrix: glContext.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: glContext.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // buffer of positions
  const buffers = initBuffers(glContext);
  // draw 2d shape
  drawScene(glContext, programInfo, buffers);
}

// Run main function on load
window.onload = initCanvas;
