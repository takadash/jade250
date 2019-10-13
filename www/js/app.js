//var APPLICATIONKEY = "06db2b7bd610563bb16193294cdc6de82c19d2327ffeb8809f6dbfef3f0823f3";
//var CLIENTKEY      = "7517488f7998d991ae26599db9dd64e623bca6cd3ce2c856de334f344648905b";

//var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
//var TestData = ncmb.DataStore('example');
// 改行できるかの実験
var map;
var stampclick = [];
var marker_g;
var circle;

function onload() {
  //前回の値を読み込み
  localStorage.setItem("isOpen", "0");
  var isOpen = localStorage.getItem("isOpen");
  //値が保存されていない、もしくはフラグがオフだった場合
  if (null == isOpen || 0 == isOpen) {
    //スプラッシュ削除
    // navigator.splashscreen.hide();
    //初回起動終了フラグをオンにする。
    localStorage.setItem("isOpen", "0");
    console.log("log1" + "%s", isOpen);
  } else {
    //初回ではないのでトップを開く
    //トップのスコープからオンロード取得時にスプラッシュ削除
    console.log("log2" + "%s", isOpen);
    document.querySelector('#navigator').pushPage("page2.html", {
      animation: "none"
    });
  }
}

//GoogleMapの表示
function initMap() {
  // #mapに地図を埋め込む
  map = new google.maps.Map(document.getElementById('map'), {
    center: { // 地図の中心を指定 (初期:千代田区)
      lat: 35.693944, // 緯度
      lng: 139.753611 // 経度
    },
    zoom: 15 // 地図のズームを指定
  });
};

// function sleep(msec) {
// 	 return new Promise(function(resolve) {
//
// 			setTimeout(function() {resolve()}, msec);
//
// 	 })
// }

function sleep(waitMsec) {
  var startMsec = new Date();

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

async function start() {

  await sleep(5000);
  console.log('5秒経過しました！');

}


// 現在位置プログラム
function getMyPlace() {

  var output = document.getElementById("result");

  if (!navigator.geolocation) { //Geolocation apiがサポートされていない場合
    output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }


  function success(position) {
    // var latitude  = position.coords.latitude;//緯度
    // var longitude = position.coords.longitude;//経度
    var latitude = 35.693944
    var longitude = 139.753611
    //output.innerHTML = '<p>緯度 ' + latitude + '° <br>経度 ' + longitude + '°</p>';

    // 位置情報
    var latlng = new google.maps.LatLng(latitude, longitude);
    // マーカーの新規出力

    if (marker_g) {
      marker_g.setMap(null);
    }

    marker_g = new google.maps.Marker({
      map: map,
      position: latlng,
      icon: {
        url: 'human_pictures/human_black.png', //アイコンのURL
        anchor: new google.maps.Point(25, 25),
        scaledSize: new google.maps.Size(50, 50) //サイズ
      }
    });

    if (circle) {
      circle.setMap(null);
    }

    // circle = new google.maps.Circle({
    //   center: latlng,
    //   map: map,
    //   radius: 100, // 半径（m）
    //   fillColor: '#AFDFE7', // 塗りつぶし色
    //   fillOpacity: 0.2, // 塗りつぶし透過度（0: 透明 ⇔ 1:不透明）
    //   strokeColor: '#3333FF', // 外周色
    //   strokeOpacity: 1, // 外周透過度（0: 透明 ⇔ 1:不透明）
    //   strokeWeight: 5 // 外周太さ
    // });
		//
    // circle.bindTo("center", marker_g, "position");

		var circle = new google.maps.Circle({
				center: latlng,
				radius: 0,
				strokeColor: "rgba(101, 165, 224, 0.73)",
				strokeOpacity: 1,
				strokeWeight: 10,
				fillColor: "rgba(101, 165, 224, 0.73)",
				fillOpacity: 1
		});
		circle.setMap(map);

		var j = 10, k = 1;
		var rMin = 150, rMax = 300;
    var cnt = 0;
		setInterval(function() {
				var radius = circle.getRadius();
				if (radius > rMax) {
					// start();
					sleep(600);
					// circle.setRadius(10);
					radius = 0;
          k = 1
          j = 10;
          cnt = 0;
				}

        var option = {
          fillOpacity: k-0.05,
          strokeWeight: j,
          strokeOpacity: k-0.047,
        };

				if(radius < 3){
					circle.setRadius(radius + 0.3);
          // k -= 0.03;
          cnt++;
          console.log(cnt);
          // circle.setOptions( option ) ;
				}else if(radius < 100){
					circle.setRadius(radius + 14);
          // k -= 0.14;
          cnt++;
          console.log(cnt);
          // circle.setOptions( option ) ;
				}else if(radius < 220){
					circle.setRadius(radius + 12);
          // k -= 0.12;
          cnt++;
          console.log(cnt);
          // circle.setOptions( option ) ;
				}else if(radius < 250){
					circle.setRadius(radius + 8);
          // k -= 0.08;
          cnt++;
          console.log(cnt);
          // circle.setOptions( option ) ;
				}else{
					circle.setRadius(radius + 4);
          // k -= 0.04;
          cnt++;
          console.log(cnt);
          // circle.setOptions( option ) ;
        }

        k -= 0.022;
        j -= 0.15;
        circle.setOptions( option ) ;
        console.log('k : ' + k);

				// if(radius < 10) sleep(10000);

		}, 50);

    if (output.innerHTML) {
      output.innerHTML = "";
    }

    map.setZoom(15);
    map.panTo(latlng);
  };

  function error() {
    //エラーの場合
    output.innerHTML = "座標位置を取得できません";
  };
  navigator.geolocation.getCurrentPosition(success, error); //成功と失敗を判断
}
