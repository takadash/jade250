//var APPLICATIONKEY = "06db2b7bd610563bb16193294cdc6de82c19d2327ffeb8809f6dbfef3f0823f3";
//var CLIENTKEY      = "7517488f7998d991ae26599db9dd64e623bca6cd3ce2c856de334f344648905b";

//var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
//var TestData = ncmb.DataStore('example');
// 改行できるかの実験
var map;
var stampclick = [];
var marker_g;
var circle;
var circle_cnt = 0;

var localStorage_setItem_value = 0;
var func_cnt_ja = 0;
var func_cnt_en = 0;
var cnt_agree_ja = 0;
var cnt_agree_en = 0;

function onload() {
  //前回の値を読み込み
  // localStorage.setItem("isOpen", "0");
  var isOpen2 = localStorage.getItem("isOpen");
  // console.log("log1 " + isOpen2);
  //今後表示しないのチェックボックスが押されていた場合
  if (isOpen2 == 1) {
    document.querySelector('#navigator').pushPage("page2.html", {
      animation: "none"
    });
  }
}

function one() {
  func_cnt_en = 0;
  localStorage_setItem_value = 0;
  cnt_agree_ja = 0;
  // alert("func_cnt = " + func_cnt_en);
  document.querySelector('#navigator').pushPage("page1.html",{animation:"none"});
  // document.querySelector('#navigator').popPage("en.html",{animation:"none"});
}

function two() {
  func_cnt_ja = 0;
  localStorage_setItem_value = 0;
  cnt_agree_en = 0;
  // alert("func_cnt = " + func_cnt_ja);
  document.querySelector('#navigator').pushPage("en.html",{animation:"none"});
}


function kiyakuhyouzi_japanese(){
  // var checkbox = document.kiyakubox.label0.checked;
  // var checkbox_japanese = document.getElementById('label_japanese');
  // alert(checkbox_japanese.checked);
  // if (checkbox_japanese.checked) localStorage_setItem_value = 1;
  // else                           localStorage_setItem_value = 0;
  func_cnt_ja++;
  if(func_cnt_ja % 2 == 1){
    localStorage_setItem_value = 1;
    // alert("localStorage_setItem_value = " + localStorage_setItem_value);
  }
  else{
    localStorage_setItem_value = 0;
    // alert("localStorage_setItem_value = " + localStorage_setItem_value);
  }
}

function agree_ja() {
  cnt_agree_ja++;
  // alert(cnt_agree_ja);
}

function agree_en() {
  cnt_agree_en++;
}


function kiyakuhyouzi_english(){
  // var checkbox2 = document.kiyakubox2.label01.checked;
  // var checkbox_english = document.getElementById('label1_english');
  // alert(checkbox_english.checked);
  // if (checkbox_english.checked) localStorage_setItem_value = 1;
  // else                          localStorage_setItem_value = 0;
  func_cnt_en++;
  if(func_cnt_en % 2 == 1){
    localStorage_setItem_value = 1;
    // alert("localStorage_setItem_value = " + localStorage_setItem_value);
  }
  else{
    localStorage_setItem_value = 0;
    // alert("localStorage_setItem_value = " + localStorage_setItem_value);
  }
}




//GoogleMapの表示
function initMap() {
  // screenLock();
  // async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaScoUyAXueT8O-UOJmfh2M-1Xh1IbfKWNXv-";
  // #mapに地図を埋め込む
  map = new google.maps.Map(document.getElementById('map'), {
    center: { // 地図の中心を指定 (初期:千代田区)
      lat: 35.693944, // 緯度
      lng: 139.753611 // 経度
    },
    zoom: 15, // 地図のズームを指定
    styles:
    [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
  });
  // alert('initMap');
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
  circle_cnt++;

  var output = document.getElementById("result");

  if (!navigator.geolocation) { //Geolocation apiがサポートされていない場合
    output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }


  function success(position) {
    var latitude  = position.coords.latitude;//緯度
    var longitude = position.coords.longitude;//経度
    // var latitude = 35.693944
    // var longitude = 139.753611
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
    if(circle_cnt == 1)
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
          strokeOpacity: k-0.049,
        };

				if(radius < 3){
					circle.setRadius(radius + 0.3);
          // k -= 0.03;
          cnt++;
          // console.log(cnt);
          // circle.setOptions( option ) ;
				}else if(radius < 100){
					circle.setRadius(radius + 14);
          // k -= 0.14;
          cnt++;
          // console.log(cnt);
          // circle.setOptions( option ) ;
				}else if(radius < 220){
					circle.setRadius(radius + 12);
          // k -= 0.12;
          cnt++;
          // console.log(cnt);
          // circle.setOptions( option ) ;
				}else if(radius < 250){
					circle.setRadius(radius + 8);
          // k -= 0.08;
          cnt++;
          // console.log(cnt);
          // circle.setOptions( option ) ;
				}else if(radius < 280){
					circle.setRadius(radius + 6);
          // k -= 0.04;
          cnt++;
          // console.log(cnt);
          // circle.setOptions( option ) ;
        }else{
          circle.setRadius(radius + 4);
        }

        k -= 0.0245;
        j -= 0.1525;
        circle.setOptions( option ) ;
        // console.log('k : ' + k);

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


function showTemplateDialog_kiyaku() {
  var kiyaku = document.getElementById('kiyaku_dialog');


  if (kiyaku) {
    kiyaku.show();
  }
  else{
    ons.createElement('kiyaku_dialog.html', {append: true})
      .then(function(dialog) {
        dialog.show();
      });
  }
};

//ダイアログ非表示
function hideDialog_kiyaku(id) {
  document.getElementById('scroll_kiyaku').scrollTop = 0;
  document
    .getElementById(id)
    .hide();
};
