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
  // image(影像來源, x, y, 寬度, 高度)
  image(capture, x, y, vWidth, vHeight);
}

// 當視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

