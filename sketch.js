let dividerY;
let salmons = [];
let system = [];

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
