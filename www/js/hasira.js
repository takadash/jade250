var APPLICATIONKEY = "ed1ce2abd40a216eb032b0d94ac80c9dd9b5027f9a28a2283936297e0a7bfe9b";
var CLIENTKEY = "e760446f705aa042f7f2b70e63f29b1f57eed9d71f15532036ce333c44f9f3c1";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var hasiraData = ncmb.DataStore('hashira2');

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
var total_hasira = localStorage.getItem("total_hasira");
if(total_hasira) var cnt_stamp6 = 0 + parseFloat(total_hasira);
 document.getElementById('cnt_stamp6').textContent = cnt_stamp6;
 document.getElementById('bar6').value = cnt_stamp6;
 var hasira_hasira = 0;

hasiraData.order("createData", true)
  .limit(200)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
    //alert('取得に成功');
    // alert(results.length);

    var lat = [];
    var lng = [];
    var text = [];
    var text2 = [];
    var text3 = [];
    var text4 = [];
    var name = [];
    var place = [];
    var type = [];

    for (var i = 0; i < results.length; i++, cnt6++) {
      var object = results[i];
      lat[i] = parseFloat(object.lat);
      lng[i] = parseFloat(object.lng);
      if(lat[i] != -99) hasira_hasira++;
      name[i] = object.name;
      text[i] = object.text;
      text2[i] = object.text2;
      text3[i] = object.text3;
      text4[i] = object.text4;
      place[i] = object.place;
      type[i] = object.type;

      stamplat6[i] = lat[i];
      stamplng6[i] = lng[i];
      stampclick6[i] = '<div id="stamp"><ons-button onclick ="stamp_push_hasira(' + i + ')">スタンプ</ons-button></div>' + '<div id="btn">'
      //ピンたて
      markerLatLng = {
        lat: lat[i],
        lng: lng[i]
      };
      if(localStorage.getItem("visit_hasira" + i ) === null){
  marker6[i] = new google.maps.Marker({
    position: markerLatLng,
    map: map,
    visible: false, // 最初は非表示

    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    }
    //animation: google.maps.Animation.DROP
  });
      }else{
        marker6[i] = new google.maps.Marker({
    position: markerLatLng,
    map: map,
    visible: false, // 最初は非表示

    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/purple.png'
    }
        });
      }

      infoWindow6[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        // 吹き出しに表示する内容
        content: '<div class="map">' + name[i] + '</div>' + '標識の種類　　　　　　' +
                  type[i] + '<br>所在場所　　　　' + place[i] + '<br>'
                   +'<ons-button onclick="showTemplateDialog_hasira('
                   + '\'' + text[i] + '\'' + '\,'
                   + '\'' + text2[i] + '\'' + '\,'
                   + '\'' + text3[i] + '\'' + '\,'
                   + '\'' + text4[i] + '\'' +
                  ',)">本文</ons-button>' +
                  stampclick6[i]
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
    // alert('標柱');
    document.getElementById('cnt_point_hasira').textContent = hasira_hasira;
  })
  .catch(function(error) {
    //全件検索に失敗した場合の処理
    //alert('取得に失敗しました');
  });

function stamp_push_hasira(i) {
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

    if (now_success == true) {
      //hyouzi.innerHTML('<img src="human_pictures/human_red.png">');
      hyouzi.style.display = "none";

      btn_display.insertAdjacentHTML('afterbegin', '<img src="human_pictures/human_red.png">');
      cnt_stamp6++;
      document.getElementById('cnt_stamp6').textContent = cnt_stamp6;
      document.getElementById('bar6').value = cnt_stamp6;

      marker6[i].setIcon({
                url: 'http://maps.google.co.jp/mapfiles/ms/icons/purple.png'
            });

      if(cnt_stamp6 == hasira_hasira) {
        var comp = document.getElementById("comp6");
        comp.innerHTML = "<p style=\"margin-bottom: 0em; margin-top: -1em\">C O M P L E T E ！</p>";
      }
      localStorage.setItem("total_hasira", cnt_stamp6);
      localStorage.setItem('visit_hasira' + i,true);
    } else {
      //hyouzi.insertAdjacentHTML('afterbegin', '<b>遠いよ</b>');
      // alert('遠くてスタンプが押せませんでした');
      ons.notification.toast('遠くてスタンプが押せませんでした', { timeout: 2000, animation: 'ascend' });
    }
  };

  function error() {
    //エラーの場合
    ons.notification.toast('座標位置を取得できません', { timeout: 2000, animation: 'ascend' });
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
      marker6[i].setAnimation(google.maps.Animation.DROP);
    }

  } else {
    // チェックボックスがチェックされていなければ非表示
    //alert('false');
    for (var i = 0; i < cnt6; i++) {
      marker6[i].setVisible(false);
    }
  }
}


//ダイアログ表示
function showTemplateDialog_hasira(text_i,text2_i,text3_i,text4_i) {
  var dialog = document.getElementById('hasira_dialog');

  function insert_text_hasira(){
    document.getElementById('hasira_text').innerHTML = "本文：　<br>" + text_i;
    document.getElementById('hasira_text2').innerHTML = text2_i;
    document.getElementById('hasira_text3').innerHTML = text3_i;
    document.getElementById('hasira_text4').innerHTML = text4_i;
  }

  if (dialog) {
    insert_text_hasira();
    dialog.show();
  } else {
    ons.createElement('hasira_dialog.html', { append: true })
      .then(function(dialog) {
        insert_text_hasira();
        dialog.show();
      });
  }
};
//ダイアログ非表示
function hideDialog_hasira(id) {
  document.getElementById('scroll_hasira').scrollTop = 0;
  document
    .getElementById(id)
    .hide();
};
