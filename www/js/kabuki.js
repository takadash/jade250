var APPLICATIONKEY = "ed1ce2abd40a216eb032b0d94ac80c9dd9b5027f9a28a2283936297e0a7bfe9b";
var CLIENTKEY = "e760446f705aa042f7f2b70e63f29b1f57eed9d71f15532036ce333c44f9f3c1";
var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var kabukiData = ncmb.DataStore('kabuki');

var map;
var marker1 = [];
var infoWindow1 = [];
var currentInfoWindow = null;
var stampclick1 = [];
var stamplat1 = [];
var stamplng1 = [];
//var lat2;
//var lng2;
var maker_is_displayed = 0;
var cnt1 = 0;
var cnt_stamp = 0;
document.getElementById('cnt_stamp').textContent = cnt_stamp;
document.getElementById('bar').value = 0;
var kabuki_kabuki = 0;

// localStorage.clear();
var status = localStorage.getItem('cnt_stamp');
console.log(status);
if (status == "null" || status=="undefined") {
  document.getElementById('cnt_stamp').textContent = cnt_stamp;
} else {
  document.getElementById('cnt_stamp').textContent = status;
  document.getElementById('bar').value = status;
  cnt_stamp = status;
}

kabukiData.order("createData", true)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
    // alert('取得に成功');

    var lat1 = [];
    var lng1 = [];
    var title = [];
    var text = [];
    var name = [];
    var bibliography = [];
    var volume = [];
    var page = [];

    for (var i = 0; i < results.length; i++, cnt1++) {
      var object = results[i];
      lat1[i] = object.lat;
      lng1[i] = object.lng;
      if(lat1[i] != -99) kabuki_kabuki++;
      name[i] = object.name;
      title[i] = object.title;
      text[i] = object.text;
      bibliography[i] = object.bibliography;
      volume[i] = object.volume;
      page[i] = object.page;

      stamplat1[i] = lat1[i];
      stamplng1[i] = lng1[i];
      stampclick1[i] = '<div id="stamp"><ons-button onclick ="stamp_push1(' + i + ')">スタンプ</ons-button></div>' + '<div id="btn">'
      //ピンたて
      markerLatLng = {
        lat: lat1[i],
        lng: lng1[i]
      };

          if(localStorage.getItem("visit_kabuki" + i ) === null){
      marker1[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        visible: false, // 最初は非表示

        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        }
        //animation: google.maps.Animation.DROP
      });
          }else{
            marker1[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        visible: false, // 最初は非表示

        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/green.png'
        }
            });
          }

      infoWindow1[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        content: '<div class="map">' + title[i] + '</div>' + '地名　　　　　　' + name[i] + '<br>参考文献　　　　' + bibliography[i] + volume[i] + page[i] + '<br>' + title[i] + text[i] + '<br>' + stampclick1[i] // 吹き出しに表示する内容
      });
      markerEvent1(i); // マーカーにクリックイベントを追加

    }

    // マーカーにクリックイベントを追加
    function markerEvent1(i) {
      marker1[i].addListener('click', function() { // マーカーをクリックしたとき
        if (currentInfoWindow) { //currentInfoWindowに値があるならば
          currentInfoWindow.close(); //開いていた吹き出しを閉じる
        }
        infoWindow1[i].open(map, marker1[i]); // 吹き出しの表示
        currentInfoWindow = infoWindow1[i];
        //ピンを押した時の音
        // pin_choice_sound();
      });
    }
    document.getElementById('cnt_point_kabuki').textContent = kabuki_kabuki;
    // alert('歌舞伎');
  })
  .catch(function(error) {
    //全件検索に失敗した場合の処理
    //alert('取得に失敗しました');
  });

//スランプを押した時の関数
function stamp_push1(i) {
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
  stamp_lat = stamplat1[i];
  stamp_lng = stamplng1[i];

  var toast = document.getElementById("map");
  var myToast = document.getElementById("myToast");

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
      cnt_stamp++;
      //スタンプ獲得音
      // get_stamp_sound();
      alert(cnt_stamp);
      document.getElementById('cnt_stamp').textContent = cnt_stamp;
      document.getElementById('bar').value = cnt_stamp;

      marker1[i].setIcon({
        url: 'http://maps.google.co.jp/mapfiles/ms/icons/green.png'
      });

      var savedate = cnt_stamp;
        localStorage.setItem('cnt_stamp', savedate);
        // console.log(savedate);


      if(cnt_stamp == kabuki_kabuki) {
        var comp = document.getElementById("comp");
        comp.innerHTML = "<p style=\"margin-bottom: 0em; margin-top: -1em\">C O M P L E T E ！</p>";
      }

      localStorage.setItem('visit_kabuki' + i,true);

    } else {
      //hyouzi.insertAdjacentHTML('afterbegin', '<b>遠いよ</b>');
      alert('遠くてスタンプが押せませんでした');
      //スタンプ獲得失敗音
      // stamp_failed_sound();
    }
  };

  function error() {
    //エラーの場合
    // hyouzi.innerHTML = "座標位置を取得できません";
    // alert('座標位置を取得できません');
    // '<ons-toast id="myToast" animation="ascend">FABs up!<button onclick="myToast.hide()">ok</button></ons-toast>'
    // toast.insertAdjacentHTML('afterbegin',"ons.notification.toast('Hi there!', { timeout: 1000, animation: 'fall' })");
    // toast.insertAdjacentHTML('afterbegin','<div class="toast"><div class="toast__message">Message Message Message Message Message Message</div><button class="toast__button">ACTION</button></div>');
    // myToast.show();
    ons.notification.toast('座標位置を取得できません', { timeout: 2000, animation: 'ascend' });
  };
  navigator.geolocation.getCurrentPosition(Success, error); //成功と失敗を判断

}



// チェックボックスがクリックされると呼び出されるfunction
function kabuki() {
  // checkboxのElementを取得
  // var cb = document.getElementById("check-1");
  var cb = document.form1.check_1.checked;
  //console.log("cb = "+cb);

  if (cb == true) {
    // チェックボックスがチェックされていればマーカ表示
    //alert('true');
    for (var i = 0; i < cnt1; i++) {
      marker1[i].setAnimation(google.maps.Animation.DROP);
      marker1[i].setVisible(true);
    }

    //app.jsのclick_sound関数
    // click_sound();

  } else {
    // チェックボックスがチェックされていなければ非表示
    //alert('false');
    for (var i = 0; i < cnt1; i++) {
      marker1[i].setVisible(false);
    }
  }
}
