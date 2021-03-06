
/*=================Creating a canvas=========================*/
var canvas = document.getElementById('my_Canvas');
gl = canvas.getContext('experimental-webgl');

/*===========Defining and storing the geometry==============*/
var vertices = [
    0.0, 0.0, 0.0,
    0.5, 0.0, 0.0,

    0.0, 0.0, 0.0,
    0.0, 0.5, 0.0,

    0.5, 0.0, 0.0,
    0.5, 0.5, 0.0,


    0.0, 0.5, 0.0,
    0.5, 0.5, 0.0,

    0.0, 0.0, 0.5,
    0.5, 0.0, 0.5,

    0.0, 0.0, 0.5,
    0.0, 0.5, 0.5,

    0.5, 0.0, 0.5,
    0.5, 0.5, 0.5,


    0.0, 0.5, 0.5,
    0.5, 0.5, 0.5,



    0.0, 0.0, 0.0,
    0.0, 0.0, 0.5,

    0.5, 0.0, 0.0,
    0.5, 0.0, 0.5,

    0.0, 0.5, 0.0,
    0.0, 0.5, 0.5,

    0.5, 0.5, 0.0,
    0.5, 0.5, 0.5,

];

//Create an empty buffer object and store vertex data

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

/*========================Shaders============================*/

//Vertex shader source code
var vertCode =
    'attribute vec4 coordinates;' +
    'uniform mat4 u_xformMatrix,u_yformMatrix,u_zformMatrix;' +
    'void main(void) {' +
    //'gl_Position = 	coordinates;'+
    '  gl_Position =   u_zformMatrix * u_yformMatrix *u_xformMatrix * coordinates;' +

    '}';

//Create a vertex shader program object and compile it                
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

//fragment shader source code
var fragCode =
    'void main(void) {' +
    '   gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
    '}';

//Create a fragment shader program object and compile it 
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

//Create and use combiened shader program
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);

gl.useProgram(shaderProgram);

/*===================scaling==========================*/

var Sx = 1.0, Sy = 1.0, Sz = 1.0;
var angle = 30.0;
var cosB = Math.cos(angle * Math.PI / 180.0);

var sinB = Math.sin(angle * Math.PI / 180.0);
var xformMatrix = new Float32Array([
    cosB, -sinB, 0.0, 0.0,
    sinB, cosB, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var u_xformMatrix = gl.getUniformLocation(shaderProgram, 'u_xformMatrix');
var u_yformMatrix = gl.getUniformLocation(shaderProgram, 'u_yformMatrix');
var u_zformMatrix = gl.getUniformLocation(shaderProgram, 'u_zformMatrix');


/* ===========Associating shaders to buffer objects============*/
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

var coordinatesVar = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coordinatesVar, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coordinatesVar);
//////////////////////////////////////

canvas.onmousedown = function (ev) { click(); };
var angle = 10.0;
function click() {

    //document.write(d);
    angle = angle + 10.0;
    var cosB = Math.cos(angle * Math.PI / 180.0);

    var sinB = Math.sin(angle * Math.PI / 180.0);
    var xformMatrix = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, cosB, sinB, 0.0,
        0.0, -sinB, cosB, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    // angle=angle-5.0;
    var yformMatrix = new Float32Array([
        cosB, 0.0, -sinB, 0.0,
        0.0, 1.0, 0.0, 0.0,
        sinB, 0.0, cosB, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);

    var zformMatrix = new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
    gl.uniformMatrix4fv(u_yformMatrix, false, yformMatrix);
    gl.uniformMatrix4fv(u_zformMatrix, false, zformMatrix);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.LINES, 0, 24);


}

setInterval(click, 100);



/*=================Drawing the Quad========================*/
gl.clearColor(0.5, 0.5, 0.5, 0.9);
gl.enable(gl.DEPTH_TEST);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.drawArrays(gl.LINES, 0, 24);


