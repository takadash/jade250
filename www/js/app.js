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

    circle = new google.maps.Circle({
      center: latlng,
      map: map,
      radius: 100, // 半径（m）
      fillColor: '#AFDFE7', // 塗りつぶし色
      fillOpacity: 0.2, // 塗りつぶし透過度（0: 透明 ⇔ 1:不透明）
      strokeColor: '#3333FF', // 外周色
      strokeOpacity: 1, // 外周透過度（0: 透明 ⇔ 1:不透明）
      strokeWeight: 5 // 外周太さ
    });
    
    circle.bindTo("center", marker_g, "position");

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

//音源
function click_sound() {
  var my_media;

  my_media = new Audio();
  my_media.src = "components/decision22.mp3";
  my_media.play();

  //console.log("ok");

};

function get_stamp_sound(){
  var get_stamp;

  get_stamp = new Audio();
  get_stamp.src = "components/decision4.mp3";
  get_stamp.play();

  //console.log("ok");
};

function pin_choice_sound(){
  var pin_choice;

  pin_choice = new Audio();
  pin_choice.src = "components/cursor1.mp3"
  pin_choice.play();
};

function stamp_failed_sound(){
  var stamp_failed;

  stamp_failed = new Audio();
  stamp_failed.src = "components/blip02.mp3"
  stamp_failed.play();
};

function menu_open_sound(){
  var menu_open;

  menu_open = new Audio();
  menu_open.src = "components/decision29.mp3"
  menu_open.play();
};

//関数の呼び出し回数などを調べるのに
// function log(){
//   console.log("test");
// };

