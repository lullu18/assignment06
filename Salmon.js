// // Salmon class
// class Salmon {
//     constructor(x, y) {
//         this.pos = createVector(x, y);
//         this.vel = createVector(random(-1, 1), random(-1, -3));
//         this.acc = createVector(0, -0.15); // 중력이 위로 작용
//         this.exploded = false;
//         this.finished = false;
//     }

//     update() {
//         if(!this.exploded){
//             this.vel.add(this.acc);
//             this.pos.add(this.vel);

//             if (this.pos.y < dividerY / 2 - 20) {
//                 this.explode();
//             }

//             if (this.pos.y < -50) {
//                 this.finished = true;
//             }
//         }
//     }

//     show() {
//         if (!this.exploded){
//             noStroke();
//             textSize(32);
//             text("🐟", this.pos.x, this.pos.y);
//         }
//     }

//     explode() {
//         this.exploded = true;
//         this.finished = true;

//         let ps = new ParticleSystem(this.pos.copy());

//         for (let i = 0; i < 60; i++){
//             ps.addParticle();
//         }

//         systems.push(ps);
//     }
// }