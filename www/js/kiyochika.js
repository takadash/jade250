var APPLICATIONKEY = "26cec09426087ef56de1ba79b2291caccf7990b7165dac6910465d5334355ab5";
var CLIENTKEY = "0ee8fb824e95468f1d7cff3d933ae7373c462f6f523d4bfdee63c7861856be23";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var kiyochikaData = ncmb.DataStore('kiyochika');

var map;
var marker5 = [];
var infoWindow5 = [];
var currentInfoWindow = null;
var stampclick = [];
var stamplat5 = [];
var stamplng5 = [];
//仮url
var url_click = [];
var url_infoWindow = [];
//var lat2;
//var lng2;
var maker_is_displayed = 0;
var cnt5 = 0;
var cnt_kiyochika = 0;
document.getElementById('cnt_kiyochika').textContent = cnt_kiyochika;
document.getElementById('bar5').value = 0;

kiyochikaData.order("createData", true)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
    // alert('取得に成功');

    var lat5 = [];
    var lng5 = [];
    //var kumi = [];
    var kiyotitle = [];
    var city = [];
    var kiyo_area1 = [];
    var kiyo_area2 = [];
    var obj = [];

    var img_url = [];
    var file_url = [];

    for (var i = 0; i < results.length; i++, cnt5++) {
      var object = results[i];
      lat5[i] = object.lat;
      lng5[i] = object.lng;
      kiyotitle[i] = object.title;
      city[i] = object.city;
      kiyo_area1[i] = object.area1;
      kiyo_area2[i] = object.area2;
      obj[i] = object.obj;

      //仮
      img_url[i] = object.img_url;
      file_url[i] = object.file_url;


      stamplat5[i] = lat5[i];
      stamplng5[i] = lng5[i];
      stampclick[i] = '<div id="stamp"><ons-button onclick="stamp_push5(' + i + ')">スタンプ</button></div>' + '<div id="btn">'
      //仮urlボタン
      //url_click[i] = '<div id="kiyo_img"><ons-button onclick="kiyo_img_push(' + i + ')">url</button></div>'
      url_click[i] = '<ons-button onclick="showTemplateDialog()">Show Dialog</ons-button>';
      //ピンたて
      markerLatLng = {
        lat: lat5[i],
        lng: lng5[i]
      };
      marker5[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        visible: false, // 最初は非表示
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
      });

      infoWindow5[i] = new google.maps.InfoWindow({ // 吹き出しの追加
        maxWidth: 1000,
        // 吹き出しに表示する内容
        content:
        '<div class="map">' + kiyotitle[i] + '</div>' + '地域　　　　　　' + city[i] + kiyo_area1[i] + ' ' + kiyo_area2[i] + 
        '<br>景物　　　　　　' + obj[i] + '<br>' + stampclick[i] + '<br>' + '<img src= "https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=kiyochika&file='+ file_url[i] + '.jpg&size=100" onclick="showTemplateDialog()">'
        + '<br>' //+ url_click[i]
        //サンプル画像のurl
        //https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=kiyochika&file=G2-28.jpg&size=100
        //content: '<iframe src=' + img_url[i] + ' >' + '</iframe>'
      });

      //仮画像のinfoWindow
      url_infoWindow[i] = new google.maps.InfoWindow({
        content: '<iframe src=' + img_url[i] + ' >' + '</iframe>'
        //content: '<img src= https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=kiyochika&file=G2-31.jpg&size=890>'
        //イラストやurl '<img src= https:www.rbbtoday.com/imgs/p/RqJIzsl7cmxG8-cARbeaqilNLEDQQ0JFREdG/510534.jpg>'
      });

      markerEvent5(i); // マーカーにクリックイベントを追加
      //仮清親画像表示
      urlEvent(i);

    }

    // マーカーにクリックイベントを追加
    function markerEvent5(i) {
      marker5[i].addListener('click', function() { // マーカーをクリックしたとき
        if (currentInfoWindow) { //currentInfoWindowに値があるならば
          currentInfoWindow.close(); //開いていた吹き出しを閉じる
        }
        infoWindow5[i].open(map, marker5[i]); // 吹き出しの表示
        currentInfoWindow = infoWindow5[i];
      });
    }

    //仮urlボタンをクリックしたとき
    function urlEvent(i){
      //currentInfoWindow.close();
      currentInfoWindow = url_infoWindow[i];
    }

  })
  .catch(function(error) {
    //全件検索に失敗した場合の処理
    //alert('取得に失敗しました');
  });

function stamp_push5(i) {
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
  stamp_lat = stamplat5[i];
  stamp_lng = stamplng5[i];


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
      cnt_kiyochika++;
      document.getElementById('cnt_kiyochika').textContent = cnt_kiyochika;
      document.getElementById('bar5').value = cnt_kiyochika;

      marker5[i].setIcon({
                url: 'http://maps.google.co.jp/mapfiles/ms/icons/blue.png'
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

//仮清親画像表示
function kiyo_img_push(i){
  //後で入れる
  //var hyouzi = document.getElementById("kiyo_img");
  //alert('true');
  //url_infoWindow[i].open(map, marker5[i]);

}


// チェックボックスがクリックされると呼び出されるfunction
function kiyochika() {
  // checkboxのElementを取得
  //var cb5 = document.getElementById("cb5");
  var cb5 = document.form5.check_5.checked;

  if (cb5 == true) {
    // チェックボックスがチェックされていればマーカ表示
    //alert('true');
    for (var i = 0; i < cnt5; i++) {
      marker5[i].setVisible(true);

    }
  } else {
    // チェックボックスがチェックされていなければ非表示
    //alert('false');
    for (var i = 0; i < cnt5; i++) {
      marker5[i].setVisible(false);
    }
  }
}

//仮
var showTemplateDialog = function() {
  var dialog = document.getElementById('my-dialog');

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

var hideDialog = function(id) {
  document
    .getElementById(id)
    .hide();
};
