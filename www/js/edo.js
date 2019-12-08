var APPLICATIONKEY = "ed1ce2abd40a216eb032b0d94ac80c9dd9b5027f9a28a2283936297e0a7bfe9b";
var CLIENTKEY = "e760446f705aa042f7f2b70e63f29b1f57eed9d71f15532036ce333c44f9f3c1";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var edoData = ncmb.DataStore('edo');
var edo_textData = ncmb.DataStore('edo_text');
var edo_pictureData = ncmb.DataStore('edo_picture');

var map;
var marker_edo = [];
var infoWindow_edo = [];
var currentInfoWindow = null;
var stampclick_edo = [];
var stamplat_edo = [];
var stamplng_edo = [];

var maker_is_displayed = 0;
var pinCnt_edo = 0;
var cnt_edo = 0;
document.getElementById('cnt_edo').textContent = cnt_edo;
document.getElementById('bar7').value = 0;

edoData.order("createData", true)
  .limit(500)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
    alert('取得に成功');
    var lat = [];
    var lng = [];
    var title = [];

    for (var i = 0; i < results.length; i++, pinCnt_edo++) {
      console.log(results.length);
      var object = results[i];
      lat[i] = parseFloat(object.lat);
      lng[i] = parseFloat(object.lng);
      title[i] = object.title;

      stamplat_edo[i] = lat[i];
      stamplng_edo[i] = lng[i];
      stampclick_edo[i] = '<div id="stamp"><ons-button onclick ="stamp_push1('
                      + i + ')">スタンプ</ons-button></div>' + '<div id="btn">'
      //ピンたて
      markerLatLng = {
        lat: lat[i],
        lng: lng[i]
      };
      marker_edo[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        visible: false, // 最初は非表示
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png'
        }
      });

      infoWindow_edo[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        // content: '<div class="map">' + title[i] + '</div>' + '地名　　　　　　' +
        // name[i] + '<br>参考文献　　　　' + bibliography[i] + volume[i] + page[i] +
        // '<br>' + title[i] + text[i] + '<br>' + stampclick_edo[i] // 吹き出しに表示する内容
        content: '<div class="map">' + title[i] + '</div>' + '<br>' + stampclick_edo[i]
      });
      markerEvent_edo(i); // マーカーにクリックイベントを追加

    }

    // マーカーにクリックイベントを追加
    function markerEvent_edo(i) {
      marker_edo[i].addListener('click', function() { // マーカーをクリックしたとき
        if (currentInfoWindow) { //currentInfoWindowに値があるならば
          currentInfoWindow.close(); //開いていた吹き出しを閉じる
        }
        infoWindow_edo[i].open(map, marker_edo[i]); // 吹き出しの表示
        currentInfoWindow = infoWindow_edo[i];
      });
    }
    alert(pinCnt_edo);
  })
  .catch(function(error) {
    //全件検索に失敗した場合の処理
    //alert('取得に失敗しました');
  });

function stamp_push1(i) {
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
  stamp_lat = stamplat_edo[i];
  stamp_lng = stamplng_edo[i];


  // 現在位置プログラム
  if (!navigator.geolocation) { //Geolocation apiがサポートされていない場合
    hyouzi.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }

  function Success(pos) {
    var now_lat = pos.coords.latitude; //緯度
    var now_lng = pos.coords.longitude; //経度

    // 位置情報
    var latlng = new google.maps.LatLng(now_lat, now_lng);

    //距離の計算//
    function getDistance(now_lat, now_lng, stamp_lat, stamp_lng) {

      function radians(deg) {
        return deg * Math.PI / 180;
      }

      var result = 6378.14 * Math.acos(Math.cos(radians(now_lat)) *
        Math.cos(radians(stamp_lat)) *
        Math.cos(radians(stamp_lng) - radians(now_lng)) +
        Math.sin(radians(now_lat)) *
        Math.sin(radians(stamp_lat)));

      result = result / 0.62137;

      if (result <= 1.0) {
        return true;
      }
      return false;
    }
    //結果
    var now_success = getDistance(now_lat, now_lng, stamp_lat, stamp_lng);

    if (true) {
      //hyouzi.innerHTML('<img src="human_pictures/human_red.png">');
      hyouzi.style.display = "none";

      btn_display.insertAdjacentHTML('afterbegin', '<img src="human_pictures/human_red.png">');
      cnt_edo++;
      document.getElementById('cnt_edo').textContent = cnt_edo;
      document.getElementById('bar').value = cnt_edo;

      marker_edo[i].setIcon({
                url: 'http://maps.google.co.jp/mapfiles/ms/icons/pink.png'
            });

    } else {
      //hyouzi.insertAdjacentHTML('afterbegin', '<b>遠いよ</b>');
      alert('遠くてスタンプが押せませんでした');
    }
  };

  function error() {
    //エラーの場合
    hyouzi.innerHTML = "座標位置を取得できません";
  };
  navigator.geolocation.getCurrentPosition(Success, error); //成功と失敗を判断

}



// チェックボックスがクリックされると呼び出されるfunction
function edo() {
  // checkboxのElementを取得
  // var cb = document.getElementById("check-1");
  var cb = document.form7.check_7.checked;
  //console.log(cb);

  if (cb == true) {
    // チェックボックスがチェックされていればマーカ表示
    //alert('true');
    for (var i = 0; i < pinCnt_edo; i++) {
      marker_edo[i].setVisible(true);
    }

  } else {
    // チェックボックスがチェックされていなければ非表示
    //alert('false');
    for (var i = 0; i < pinCnt_edo; i++) {
      marker_edo[i].setVisible(false);
    }
  }
}
