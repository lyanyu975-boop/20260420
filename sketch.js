let capture;

function setup() {
  // 建立與視窗大小相同的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設出現在畫布下方的 HTML 攝影機元件
  capture.hide();
}

function draw() {
  // 設定背景顏色為 e7c6ff
  background('#e7c6ff');
  
  // 計算影像顯示的寬高（全螢幕寬高的 60%）
  let vWidth = width * 0.6;
  let vHeight = height * 0.6;
  
  // 計算置中座標
  let x = (width - vWidth) / 2;
  let y = (height - vHeight) / 2;
  
  // 在畫布上顯示攝影機影像
  push();
  // 將座標原點移至畫布右側，並水平翻轉 X 軸以達到鏡像效果
  translate(width, 0);
  scale(-1, 1);
  
  // 繪製影像，此時的 x 座標會自動從反轉後的右側計算，保持置中
  image(capture, x, y, vWidth, vHeight);
  pop();
}

// 當視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
