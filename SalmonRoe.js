// // Particle class
// class Particle {
//   constructor(position) {
//     this.pos = position.copy();
//     this.vel = p5.Vector.random2D();
//     this.vel.mult(random(1, 3));
//     this.acc = createVector(0, -0.03);
//     this.lifespan = 255;
//     this.size = random(6, 10);
//   }

//   update() {
//     this.vel.add(this.acc);
//     this.pos.add(this.vel);
//     this.lifespan -= 3;
//   }

//   show() {
//     noStroke();
//     // 연어알
//     fill(255, 150, 0, this.lifespan);
//     ellipse(this.pos.x, this.pos.y, this.size, this.size);
//   }

//   isDead() {
//     return this.lifespan <= 0;
//   }
// }

// // ParticleSystem class
// class ParticleSystem {
//     constructor(position) {
//         this.origin = position.copy();
//         this.particles = [];
//     }

//     addParticle() {
//         this.particles.push(new Particle(this.origin));
//     }

//     run() {
//         for (let i = this.particles.length-1; i >= 0; i--) {
//             let p = this.particles[i];
//             p.update();
//             p.show();

//             if (p.isDead()) {
//                 this.particles.splice(i, 1);
//             }
//         }
//     }

//     isEmpty() {
//         return this.particles.length === 0;
//     }
// }