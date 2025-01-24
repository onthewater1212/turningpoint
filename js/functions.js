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

  const images2 = [
  "/images/vs1.png",
  "/images/vs2.png",
  "/images/vs3.png",
  "/images/vs4.png",
  "/images/vs5.png",
  "/images/vs6.png",
  "/images/vs7.png",
  "/images/vs8.png",
  "/images/vs9.png",
  "/images/vs10.png",
  ];
  
  // 画像要素
  const yacht = document.getElementById("yacht"); 
  const vs = document.getElementById("vs"); 
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

        console.log(`Frame Index: ${frameIndex}, Yacht Image: ${images[frameIndex]}`);
        console.log(`Frame Index: ${frameIndex}, VS Image: ${images2[frameIndex]}`);
  

        console.log(`Frame Index: ${frameIndex}, Yacht Image: ${images[frameIndex]}`);
      console.log(`Frame Index: ${frameIndex}, VS Image: ${images2[frameIndex]}`);

      if (yacht) {
        yacht.src = images[frameIndex];
      } else {
        console.error("Yacht element not found!");
      }

      if (vs) {
        vs.src = images2[frameIndex];
      } else {
        console.error("VS element not found!");
      }
      },
    },
  });

  gsap.to(".table-of-contents", {
    scrollTrigger: {
      trigger: ".table-of-contents", // トリガーとなる要素
      start: "top top", // トリガー開始位置
      endTrigger: ".interview",
      end: "bottom top", // トリガー終了位置
      pin: true, // 要素を固定する
      scrub: false, // スクロールに連動する
    },
  });
  

  //文字をふわっとだす
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
          markers: false,
        },
      }
    );
});

ScrollTrigger.refresh();
});
  
    //配列のインデックスは0から始まる
//目次固定
