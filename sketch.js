// let dividerY;
// let salmons = [];
// let system = [];

// function setup() {
//   createCanvas(800, 600);
//   dividerY = height / 2;

//   textAlign(CENTER, CENTER);
//   textSize(32);
// }

// function draw() {
//   background(20, 40, 80);

//   drawRiverZones();

//   // 연어 업데이트 & 그리기
//   for (let i = salmons.length - 1; i >= 0; i--) {
//     salmons[i].update();
//     salmons[i].show();

//     // 다 터지고 더 이상 쓸모 없으면 리스트에서 제거
//     if (salmons[i].finished) {
//       salmons.splice(i, 1);
//     }
//   }

//   // 파티클 시스템 업데이트 & 그리기
//   for (let i = systems.length - 1; i >= 0; i--) {
//     systems[i].run();
//     if (systems[i].isEmpty()) {
//       systems.splice(i, 1);
//     }
//   }

//   // 마우스를 따라다니는 연어 이모티콘
//   drawCursorSalmon();
// }

// function drawRiverZones() {
//   // 상류(위)
//   noStroke();
//   fill(40, 90, 160, 200);
//   rect(0, 0, width, dividerY);

//   // 하류(아래)
//   fill(10, 60, 120, 0);
//   rect(0, dividerY, width, height - dividerY);

//   // 텍스트 라벨
//   noStroke();
//   fill(255);
//   textSize(30);
//   text("🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊", 400, 300);
// }

// function drawCursorSalmon() {
//   // 마우스 따라다니는 연어
//   noStroke();
//   textSize(32);
//   text("🐟", mouseX, mouseY);
// }

// function mousePressed() {
//   // 하류(아래쪽)에서 클릭했을 때만 연어 생성
//   if (mouseY > dividerY) {
//     salmons.push(new Salmon(mouseX, mouseY));
//   }
// }

let dividerY;
let salmons = [];
let systems = [];

function setup() {
  createCanvas(800, 600);
  dividerY = height / 2;

  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  background(20, 40, 80);

  drawRiverZones();

  // 연어 업데이트 & 그리기
  for (let i = salmons.length - 1; i >= 0; i--) {
    salmons[i].update();
    salmons[i].show();

    // 다 터지고 더 이상 쓸모 없으면 리스트에서 제거
    if (salmons[i].finished) {
      salmons.splice(i, 1);
    }
  }

  // 파티클 시스템 업데이트 & 그리기
  for (let i = systems.length - 1; i >= 0; i--) {
    systems[i].run();
    if (systems[i].isEmpty()) {
      systems.splice(i, 1);
    }
  }

  // 마우스를 따라다니는 연어 이모티콘
  drawCursorSalmon();
}

function drawRiverZones() {
  // 상류(위)
  noStroke();
  fill(40, 90, 160); // 약간 밝은 파란색
  rect(0, 0, width, dividerY);

  // 하류(아래)
  fill(10, 60, 120); // 조금 더 어두운 파란색
  rect(0, dividerY, width, height - dividerY);

  // 구분선
  stroke(255);
  strokeWeight(2);
  line(0, dividerY, width, dividerY);

  // 텍스트 라벨
  noStroke();
  fill(255);
  textSize(40);
  text("🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊", 400, 300);
}

function drawCursorSalmon() {
  // 마우스 따라다니는 연어
  noStroke();
  textSize(32);
  text("🐟", mouseX, mouseY);
}

function mousePressed() {
  // 하류(아래쪽)에서 클릭했을 때만 연어 생성
  if (mouseY > dividerY) {
    salmons.push(new Salmon(mouseX, mouseY));
  }
}

/* =========================
   Salmon 클래스 (연어)
   ========================= */

class Salmon {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // 시작 속도는 약하게 위로
    this.vel = createVector(random(-1, 1), random(-1, -3));
    // 중력이 '위쪽'으로 작용 (y 음수)
    this.acc = createVector(0, -0.15);
    this.exploded = false;
    this.finished = false;
  }

  update() {
  if (!this.exploded) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // 상류 중앙 근처에서 터지도록 변경
    if (this.pos.y < dividerY / 2 - 20) {
      this.explode();
    }

    // 화면 위로 너무 멀리 나가버리면 정리
    if (this.pos.y < -50) {
      this.finished = true;
    }
  }
}

  show() {
    if (!this.exploded) {
      noStroke();
      textSize(32);
      text("🐟", this.pos.x, this.pos.y);
    }
  }

  explode() {
    this.exploded = true;
    this.finished = true;

    // 연어알 파티클 시스템 생성
    let ps = new ParticleSystem(this.pos.copy());
    // 한 번에 여러 개의 알을 터뜨리기
    for (let i = 0; i < 60; i++) {
      ps.addParticle();
    }
    systems.push(ps);
  }
}

/* =========================
   Particle & ParticleSystem
   (연어알 이펙트)
   ========================= */

class Particle {
  constructor(position) {
    this.pos = position.copy();
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 3));
    // 연어알도 살짝 위로 뜨는 느낌 (중력 위로)
    this.acc = createVector(0, -0.03);
    this.lifespan = 255;
    this.size = random(6, 10);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 3;
  }

  show() {
    noStroke();
    // 연어알 느낌 나는 주황색
    fill(255, 150, 0, this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.show();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  isEmpty() {
    return this.particles.length === 0;
  }
}
