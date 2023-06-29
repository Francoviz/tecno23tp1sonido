let mic;
let analyzer;
let images = [];
let threshold = 0.05;
let rotationSpeed = 1;
let currentRotation = 0;
let currentImage = null;
let imageList = [];
let imageSize = 300; // Tamaño deseado de las imágenes

function preload() {
  //images.push(loadImage('libraries/circulito0.png'));
  //images.push(loadImage('libraries/circulito1.png'));
  images.push(loadImage('libraries/trazo0.png'));
  images.push(loadImage('libraries/trazo1.png'));
  images.push(loadImage('libraries/trazo2.png'));
  images.push(loadImage('libraries/trazo3.png'));
   images.push(loadImage('libraries/trazo4.png'));
  images.push(loadImage('libraries/trazo5.png'));
  images.push(loadImage('libraries/trazo6.png'));
  images.push(loadImage('libraries/trazo7.png'));
   images.push(loadImage('libraries/trazo8.png'));
  images.push(loadImage('libraries/trazo9.png'));
  images.push(loadImage('libraries/trazo10.png'));
  images.push(loadImage('libraries/trazo11.png'));
   images.push(loadImage('libraries/trazo12.png'));
  images.push(loadImage('libraries/trazo13.png'));
  images.push(loadImage('libraries/trazo14.png'));
  images.push(loadImage('libraries/trazo16.png'));
  images.push(loadImage('libraries/trazo17.png'));
   images.push(loadImage('libraries/trazo18.png'));
  images.push(loadImage('libraries/trazo19.png'));
  images.push(loadImage('libraries/trazo20.png'));
  images.push(loadImage('libraries/trazo21.png'));
 
  // Agrega más rutas de imagen si deseas usar diferentes trazos
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  mic = new p5.AudioIn();
  mic.start();

  analyzer = new p5.Amplitude();
  analyzer.setInput(mic);
  userStartAudio();
}

function draw() {
  background(255);

  let volume = analyzer.getLevel();

  if (volume > threshold) {
    if (currentImage === null) {
      let x = random(width);
      let y = random(height);
      let imageIndex = floor(random(images.length));
      currentImage = images[imageIndex];
      currentImage.resize(imageSize, imageSize);

      let imageObj = {
        image: currentImage,
        x: x,
        y: y,
        rotationComplete: false 
      };

      imageList.push(imageObj);
    }
  } else {
    currentImage = null;
  }

  for (let i = 0; i < imageList.length; i++) {
    let imageObj = imageList[i];
    push();
    translate(imageObj.x + imageSize / 2, imageObj.y + imageSize / 2);

    if (!imageObj.rotationComplete) {
      rotate(currentRotation);
      image(imageObj.image, -imageSize / 2, -imageSize / 2);

      if (currentRotation >= 360) {
        imageObj.rotationComplete = true; 
        rotationSpeed = 0; // Detener la rotación
      }
    } else {
      image(imageObj.image, -imageSize / 2, -imageSize / 2); 
    }

    pop();
  }

  currentRotation += rotationSpeed;
}
