// particle animation for canvas practice
// based off this pen as reference https://codepen.io/ace/pen/ICtHK

// high dpi canvas
// https://www.html5rocks.com/en/tutorials/canvas/hidpi/

// MDN canvas resources
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

class smokeParticle {
  constructor() {
    this.init();
  }
  
  init() {
    this.imgQuantity = 500;
    this.maxSize = 450;
    this.imgVelocity = 0.09;
    this.smokeOne = new Image();
    this.smokeTwo = new Image();
    this.smokeOne.src = 'https://raw.githubusercontent.com/RegisBiron/smokeParticles/master/smoke.png';
    this.smokeTwo.src = 'https://raw.githubusercontent.com/RegisBiron/smokeParticles/master/smoke-2.png';
    
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.smoke = [];
    
    this.ratio = 1;
    
    this.bindHandlers();
    this.buildImg();
    this.resizeCanvas();

    this.animateParticles();
  }
  
  bindHandlers() {
    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
  }
  
  buildImg(){
    var smokeImages = [this.smokeOne, this.smokeTwo];

    var maxSize;
    
    for (var i=0; i < this.imgQuantity; i++) {
     var img = smokeImages[Math.floor(Math.random() * smokeImages.length)];
       
      maxSize = Math.round(Math.random() * this.maxSize);
      
      this.smoke.push({
        x: Math.round(Math.random() * window.innerWidth) - maxSize / 2,
        y: Math.round(Math.random() * window.innerHeight) + 150,
        velx: Math.random() * this.imgVelocity * 4 - this.imgVelocity,
        vely: Math.random() * this.imgVelocity * 4 - this.imgVelocity,
        size: maxSize,
        img: img
      });
    }
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.retinaScreen();
  }
  
  retinaScreen() {    
    var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                            this.ctx.mozBackingStorePixelRatio ||
                            this.ctx.msBackingStorePixelRatio ||
                            this.ctx.oBackingStorePixelRatio ||
                            this.ctx.backingStorePixelRatio || 1;
    this.ratio = devicePixelRatio / backingStoreRatio;
    
    if (devicePixelRatio !== backingStoreRatio) {
        var oldWidth = this.canvas.width;
        var oldHeight = this.canvas.height;

        this.canvas.width = oldWidth * this.ratio;
        this.canvas.height = oldHeight * this.ratio;

        this.canvas.style.width = oldWidth + 'px';
        this.canvas.style.height = oldHeight + 'px';

        this.ctx.scale(this.ratio, this.ratio);
    } else {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
  
  animateParticles() {
    window.requestAnimationFrame(this.animateParticles.bind(this));
    this.render();
  }
  
  render() {

    // clear the canvas in-between each animation frame
    this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    var img,
        smokeLength = this.smoke.length;
    
    for(var i = 0; i < smokeLength; i++) {
      img = this.smoke[i];
      
      // Create bounds that are 0.5 the size of the canvas    
      if (img.x < (window.innerWidth * -0.2)) {
        img.velx = this.imgVelocity + Math.random();
      } else if (img.x > (window.innerWidth - img.size) * 2) {
        img.velx = -this.imgVelocity - Math.random();
      } 
        
      if (img.y < (window.innerHeight * -0.2)) {
        img.vely = this.imgVelocity + Math.random();
      } else if (img.y > (window.innerHeight - img.size) * 2) {
        img.vely = -this.imgVelocity - Math.random();
      }
      
      img.x += img.velx;
      img.y += img.vely;
      
      this.ctx.drawImage(img.img, img.x, img.y, img.size, img.size);
    }
    this.ctx.restore();  
  }
}

new smokeParticle();