var APPLICATIONKEY = "ed1ce2abd40a216eb032b0d94ac80c9dd9b5027f9a28a2283936297e0a7bfe9b";
var CLIENTKEY = "e760446f705aa042f7f2b70e63f29b1f57eed9d71f15532036ce333c44f9f3c1";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var hasiraData = ncmb.DataStore('hasira');

var map;
var marker6 = [];
var infoWindow6 = [];
var currentInfoWindow = null;
var stampclick6 = [];
var stamplat6 = [];
var stamplng6 = [];
//var lat2;
//var lng2;
var maker_is_displayed = 0;
var cnt6 = 0;
var cnt_stamp6 = 0;
 document.getElementById('cnt_stamp6').textContent = cnt_stamp6;
 document.getElementById('bar6').value = 0;

hasiraData.order("createData", true)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
    alert('取得に成功');

    var lat = [];
    var lng = [];
    var text = [];
    var name = [];
    var place = [];
    var type = [];

    for (var i = 0; i < results.length; i++, cnt6++) {
      var object = results[i];
      lat[i] = parseFloat(object.lat);
      lng[i] = parseFloat(object.lng);
      name[i] = object.name;
      text[i] = object.text;
      place[i] = object.place;
      type[i] = object.type;

      stamplat6[i] = lat[i];
      stamplng6[i] = lng[i];
      stampclick6[i] = '<div id="stamp"><ons-button onclick ="stamp_push1(' + i + ')">スタンプ</ons-button></div>' + '<div id="btn">'
      //ピンたて
      markerLatLng = {
        lat: lat[i],
        lng: lng[i]
      };
      marker6[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        visible: false, // 最初は非表示
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
        }
      });

      infoWindow6[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        content: '<div class="map">' + name[i] + '</div>' + '標識の種類　　　　　　' + type[i] + '<br>所在場所　　　　' + place[i] + '<br>' + text[i] + '<br>' + stampclick6[i] // 吹き出しに表示する内容
      });
      markerEvent1(i); // マーカーにクリックイベントを追加

    }

    // マーカーにクリックイベントを追加
    function markerEvent1(i) {
      marker6[i].addListener('click', function() { // マーカーをクリックしたとき
        if (currentInfoWindow) { //currentInfoWindowに値があるならば
          currentInfoWindow.close(); //開いていた吹き出しを閉じる
        }
        infoWindow6[i].open(map, marker6[i]); // 吹き出しの表示
        currentInfoWindow = infoWindow6[i];
      });
    }

  })
  .catch(function(error) {
    //全件検索に失敗した場合の処理
    //alert('取得に失敗しました');
  });

function stamp_push1(i) {
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
  stamp_lat = stamplat6[i];
  stamp_lng = stamplng6[i];


  // 現在位置プログラム
  if (!navigator.geolocation) { //Geolocation apiがサポートされていない場合
    hyouzi.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }

  function Success(pos) {
    var now_lat = pos.coords.latitude; //緯度
    var now_lng = pos.coords.longitude; //経度

    // 位置情報
    var latlng1 = new google.maps.LatLng(now_lat, now_lng);

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
      cnt_stamp6++;
      document.getElementById('cnt_stamp6').textContent = cnt_stamp6;
      document.getElementById('bar').value = cnt_stamp6;

      marker6[i].setIcon({
                url: 'http://maps.google.co.jp/mapfiles/ms/icons/red.png'
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
function hasira() {
  // checkboxのElementを取得
  // var cb = document.getElementById("check-1");
  var cb = document.form6.check_6.checked;
  //console.log(cb);

  if (cb == true) {
    // チェックボックスがチェックされていればマーカ表示
    //alert('true');
    for (var i = 0; i < cnt6; i++) {
      marker6[i].setVisible(true);
    }

  } else {
    // チェックボックスがチェックされていなければ非表示
    //alert('false');
    for (var i = 0; i < cnt6; i++) {
      marker6[i].setVisible(false);
    }
  }
}
