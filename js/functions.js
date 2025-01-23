window.onload = () => {
    const images = document.querySelectorAll('.scroll-image');
    images.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.5}s`; // 各画像が少しずつずれてアニメーション
    });
  };
  
  $(document).ready(function() {
      $('#wave, #wave-bottom').wavify({
      height: 100,
      bones: 10,//波の山と谷の数
      amplitude: 20,//振幅
      color: '#2731AD',
      speed: .25//速度
    });
  });
  
  
  const images = [
    "/images/yacht1.png",
    "/images/yacht2.png",
    "/images/yacht3.png",
    "/images/yacht4.png",
    "/images/yacht5.png",
    "/images/yacht6.png",
    "/images/yacht7.png",
    "/images/yacht8.png",
    "/images/yacht9.png",
    "/images/yacht10.png",
  ];
  
  // 画像要素
  const yacht = document.getElementById("yacht"); 
  const totalFrames = images.length; // フレームの数

// デバイスによってendの値を動的に設定
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const endValue = isMobile ? "+=500" : "+=700"; // スマホなら500、それ以外なら700

    // GSAPとScrollTriggerを使ってアニメーションを設定
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.to({}, {// アニメーションさせる要素は特定じゃないからなし
    scrollTrigger: {//進行状況を監視する役割
      trigger: ".animation-container", // トリガーとなる要素
      start: "center center", //animation-containerのtopがブラウザのcenterに来たらピン留め
      end: endValue, // ピン留め範囲
      scrub: true, // スクロールに連動させる
      pin: true, // トリガー要素のピン留めを有効にする
      markers: false,
     //srcを切り替え、スクロールするごとに呼び出される関数
      onUpdate: (self) => {//selfはScrolltriggerのこと
        const progress = self.progress;//スクロールトリガーの進行状況を表す
        const frameIndex = Math.min(
          totalFrames - 1,// 計算結果が配列の範囲を越えないように制限
          Math.floor(progress * totalFrames)//小数点以下切り捨て進行度に応じたフレーム番号を計算
        );
        yacht.src = images[frameIndex];//画像を新しいファイルに置き換え
      },
    },
  });

  window.addEventListener('load', () => {
  gsap.utils.toArray('.hidden-text').forEach((element) => {
    gsap.fromTo(
      element,// 対象
      { opacity: 0, translateY: 50 }, // 初期状態（透明で下にずれている）
      { //変化後状態
        opacity: 1, 
        translateY: 0, //元の位置に戻る
        duration: 1, //アニメーション時間
        ease: 'power2.out', //イージング
        scrollTrigger: {
          trigger: element, // アニメーションを開始するトリガー要素
          start: 'top 90%', // 要素の上端がビューポートの90%地点に来たら開始
          end: 'top 60%', 
          toggleActions: 'play none none reverse', // アニメーションの挙動
          markers: true,
        },
      }
    );
});

ScrollTrigger.refresh();
});
  
    //配列のインデックスは0から始まる

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("table-of-contents");//変数に格納
  const tocOffsetTop = toc.offsetTop;//toc 要素の 親要素の上端からの距離を取得

  window.addEventListener("scroll", () => {//スクロールのたびに実行される
    if (window.scrollY > tocOffsetTop) {//現在のスクロール位置（ページの最上部からのピクセル数）を取得
      toc.classList.add("fixed");//固定
    } else {
      toc.classList.remove("fixed");//固定を削除
    }
  });
});
