document.addEventListener("DOMContentLoaded", function () {
  let highestZ = 1;

  class Paper {
    constructor(paper) {
      this.paper = paper;
      this.holding = false;
      this.startX = 0;
      this.startY = 0;
      this.x = 0;
      this.y = 0;
      this.prevX = 0;
      this.prevY = 0;
      this.velX = 0;
      this.velY = 0;
      this.rotation = Math.random() * 30 - 15;
      this.rotating = false;

      this.init();
    }

    init() {
      this.paper.style.transform = `translate(0px, 0px) rotate(${this.rotation}deg)`;

      this.paper.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.button === 2) {
          this.rotating = true;
        } else {
          this.start(e.clientX, e.clientY);
        }
      });

      this.paper.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        this.start(touch.clientX, touch.clientY);
      });

      document.addEventListener('mousemove', (e) => {
        this.move(e.clientX, e.clientY);
      });

      document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        this.move(touch.clientX, touch.clientY);
      }, { passive: false });

      document.addEventListener('mouseup', () => this.end());
      document.addEventListener('touchend', () => this.end());
    }

    start(x, y) {
      this.holding = true;
      this.paper.style.zIndex = highestZ++;
      this.startX = this.prevX = x;
      this.startY = this.prevY = y;
    }

    move(x, y) {
      if (!this.holding) return;

      this.velX = x - this.prevX;
      this.velY = y - this.prevY;
      this.x += this.velX;
      this.y += this.velY;
      this.prevX = x;
      this.prevY = y;

      if (this.rotating) {
        const dx = x - this.startX;
        const dy = y - this.startY;
        const angle = Math.atan2(dy, dx);
        this.rotation = angle * (180 / Math.PI);
      }

      this.paper.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }

    end() {
      this.holding = false;
      this.rotating = false;
    }
  }

  document.querySelectorAll('.paper').forEach(paper => {
    new Paper(paper);
  });
});
