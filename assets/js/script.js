// nav bar shapes
var circle = document.getElementById("circle-canvas");
var circleCtx = circle.getContext("2d");
circleCtx.clearRect(0, 0, circle.width, circle.height);
circleCtx.beginPath();
circleCtx.arc(37.5, 37.5, 21, 0, 2 * Math.PI);
circleCtx.stroke();

var square = document.getElementById("square-canvas");
var squareCtx = square.getContext("2d");
squareCtx.clearRect(0, 0, square.width, square.height);
squareCtx.beginPath();
squareCtx.rect(15, 15, 45, 45);
squareCtx.stroke();

var triangle = document.getElementById("triangle-canvas");
var triangleCtx = triangle.getContext("2d");
triangleCtx.clearRect(0, 0, triangle.width, triangle.height);
triangleCtx.beginPath();
triangleCtx.moveTo(37.5, 14);
triangleCtx.lineTo(56, 56);
triangleCtx.lineTo(14, 56);
triangleCtx.closePath();
triangleCtx.stroke();


const inputText = document.getElementById('input');
const button = document.getElementById('submit-button');
let shapeChoose;
let value1 = null;
let value2 = null;

// Disable input and button initially
inputText.placeholder = "Choose the shape to draw!";
inputText.disabled = true;
button.disabled = true;

function handleTriangleClick() {
    shapeChoose = "triangle";
    inputText.placeholder = "Enter the Height of the Triangle";
    inputText.disabled = false;
    button.disabled = false;
    button.textContent = "Next";
    value1 = null;
    value2 = null;
    console.log("Triangle clicked");
}

function handleCircleClick() {
    shapeChoose = "circle";
    inputText.placeholder = "Enter the Radius of the Circle";
    inputText.disabled = false;
    button.disabled = false;
    button.textContent = "Generate";
    value1 = null;
    console.log("Circle clicked");
}

function handleSquareClick() {
    shapeChoose = "square";
    inputText.placeholder = "Enter the Length of the Square";
    inputText.disabled = false;
    button.disabled = false;
    button.textContent = "Generate";
    value1 = null;
    console.log("Square clicked");
}


function handleButtonClick() {
    const inputVal = parseFloat(inputText.value);
    console.log(`Input value: ${inputVal}, Shape: ${shapeChoose}`);

    if (isNaN(inputVal)) {
        alert("Please enter a valid number.");
        return;
    }

    if (shapeChoose === "triangle") {
        if (!value1) {
            value1 = inputVal;
            inputText.value = "";
            inputText.placeholder = "Enter the Width of the Triangle";
            button.textContent = "Generate";
        } else if (!value2) {
            value2 = inputVal;
            console.log(`Generating triangle with height: ${value1}, width: ${value2}`);
            generateShape();
        }
    } else if (shapeChoose === "circle" || shapeChoose === "square") {
        value1 = inputVal;
        console.log(`Generating ${shapeChoose} with size: ${value1}`);
        generateShape();
    }
}

const areaDescription = document.querySelector('.area-description');


function generateShape() {
    let area = 0; 

    if (shapeChoose === "triangle") {
        generateTriangle(value1, value2);
        area = 0.5 * value1 * value2;
    } else if (shapeChoose === "circle") {
        generateCircle(value1);
        area = Math.PI * Math.pow(value1, 2);
    } else if (shapeChoose === "square") {
        generateSquare(value1);
        area = Math.pow(value1, 2);
    }

    areaDescription.textContent = `The area of the ${shapeChoose} is: ${area.toFixed(2)} square units.`;

    inputText.value = "";
    inputText.placeholder = "Choose another shape to continue...";
    inputText.disabled = true;
    button.disabled = true;
    value1 = null;
    value2 = null;
}

const canvas = document.getElementById("super-canvas");
const ctx = canvas.getContext("2d");

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared");
}

function generateTriangle(height, breadth) {
    clearCanvas();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(centerX - breadth / 2, centerY + height / 2); 
    ctx.lineTo(centerX + breadth / 2, centerY + height / 2); 
    ctx.lineTo(centerX, centerY - height / 2);               
    ctx.closePath();
    ctx.stroke();
    console.log(`Triangle drawn with height: ${height}, breadth: ${breadth}`);
}

function generateCircle(radius) {
    clearCanvas();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    ctx.stroke();
    console.log(`Circle drawn with radius: ${radius}`);
}

function generateSquare(side) {
    clearCanvas();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const halfSide = side / 2;
    ctx.beginPath();
    ctx.rect(centerX - halfSide, centerY - halfSide, side, side);
    ctx.stroke();
    console.log(`Square drawn with side: ${side}`);
}
