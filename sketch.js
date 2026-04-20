let capture;
let pg; // 用於存放圖效的繪圖層

function setup() {
  // 建立與視窗大小相同的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  
  // 隱藏預設出現在畫布下方的 HTML 攝影機元件
  capture.hide();

  // 初始化繪圖層，大小先設為 1x1，draw 中會動態調整
  pg = createGraphics(1, 1);
  
  // 設定繪圖層色彩模式為 HSB (色相, 飽和度, 明度)，範圍設為 360, 100, 255
  pg.colorMode(HSB, 360, 100, 255);
  pg.ellipseMode(CORNER); // 讓圓形畫法與矩形一樣從左上角開始計算，方便座標對齊
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

  // 動態調整繪圖層大小以符合視訊比例
  if (pg.width !== floor(vWidth) || pg.height !== floor(vHeight)) {
    pg.resizeCanvas(vWidth, vHeight);
  }

  // 依照滑鼠 X 軸位置決定取樣間距 (span)
  let span = floor(map(mouseX, 0, width, 10, 80, true));

  // 清除繪圖層背景，使其透明
  pg.clear();

  // 取得攝影機像素數據
  capture.loadPixels();
  if (capture.pixels.length > 0) {
    // 遍歷攝影機畫面（以 span 為間隔取樣）
    for (let cy = 0; cy < capture.height; cy += span) {
      for (let cx = 0; cx < capture.width; cx += span) {
        let index = (cx + cy * capture.width) * 4;
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        
        // 取得亮度：(pixel[0] + pixel[1] + pixel[2])/3
        let bright = (r + g + b) / 3;

        // 在繪圖層上繪製方塊，將攝影機座標映射到繪圖層座標
        let pgX = map(cx, 0, capture.width, 0, pg.width);
        let pgY = map(cy, 0, capture.height, 0, pg.height);
        let rectSize = map(span, 10, 80, 5, 75); // 方塊大小隨 span 變化

        // 顏色隨時間改變：Hue 隨 frameCount 累加，明度則使用您提供的亮度公式
        let hueValue = (frameCount + bright) % 360;
        pg.fill(hueValue, 80, bright); 
        pg.noStroke();
        pg.ellipse(pgX, pgY, rectSize, rectSize);
      }
    }
  }
  
  // 在畫布上顯示攝影機影像
  push();
  // 將座標原點移至畫布右側，並水平翻轉 X 軸以達到鏡像效果
  translate(width, 0);
  scale(-1, 1);
  
  // 繪製影像，此時的 x 座標會自動從反轉後的右側計算，保持置中
  // 先畫底層原始視訊
  image(capture, x, y, vWidth, vHeight);
  // 再疊加處理過的 graphics 內容
  image(pg, x, y, vWidth, vHeight);
  pop();
}

// 當視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
