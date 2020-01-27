var APPLICATIONKEY = "ed1ce2abd40a216eb032b0d94ac80c9dd9b5027f9a28a2283936297e0a7bfe9b";
var CLIENTKEY = "e760446f705aa042f7f2b70e63f29b1f57eed9d71f15532036ce333c44f9f3c1";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var TestData = ncmb.DataStore('matoi2');
//var taiheiStamp = ncmb.DataStore('stamp');

var map;
var marker4 = [];
var infoWindow4 = [];
var currentInfoWindow = null;
var stampclick4 = [];
var stamplat = [];
var stamplng = [];
var stamp_lat;
var stamp_lng;
var maker_is_displayed = 0;
var cnt = 0;
var cnt_taihei = 0;
var total_taihei = localStorage.getItem("total_taihei");
if(total_taihei) var cnt_taihei = 0 + parseFloat(total_taihei);
document.getElementById('cnt_taihei').textContent = cnt_taihei;
document.getElementById('bar4').value = cnt_taihei;
var taihei_taihei = 0;


TestData.order("createData", true)
  .fetchAll()
  .then(function(results) {
    // alert('太平');
    //全件検索に成功した場合の処理
    // alert('取得に成功');

    var lat = [ /*results.length*/ ];
    var lng = [ /*results.length*/ ];
    var kumi = [ /*results.length*/ ];
    var town_name = [];
    var center_town = [];
    var center_moji = [];
    var town_name_cur = [];
    var tyo_in = [];
    var zinsoku = [];
    var file_name = [];
    var file_name2 = [];

    for (var i = 0; i < results.length; i++, cnt++) {
      var object = results[i];
      lat[i] = parseFloat(object.lat);
      lng[i] = parseFloat(object.lng);
      if(lat[i] != -99) taihei_taihei++;
      kumi[i] = object.kumi;
      town_name[i] = object.town_name;
      center_town[i] = object.center_town;
      center_moji[i] = object.center_moji;
      town_name_cur[i] = object.town_name_cur;
      tyo_in[i] = object.tyo_in;
      zinsoku[i] = object.zinsoku;
      file_name[i] = object.file_name;
      file_name2[i] =object.file_name2;

      stamplat[i] = lat[i];
      stamplng[i] = lng[i];
      // stampclick4[i] =  '<button onclick="stamp_push4(' + i + ')">スタンプ' + '</button><div id="stamp"></div>'
      stampclick4[i] = '<div id="stamp"><ons-button onclick ="stamp_push4(' + i + ')">スタンプ</ons-button></div>' + '<div id="btn">'

      var infoWindowContent = [];

      if(file_name2[i] == ''){
        infoWindowContent +=
        '<img src= "https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=taihey&file='+ file_name[i] + '.jpg&size=100" onclick="showTemplateDialog2(\'' + file_name[i] + '\')">'
      }
      else{
        infoWindowContent +=
        '<img src= "https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=taihey&file='+ file_name[i] + '.jpg&size=100" onclick="showTemplateDialog2(\'' + file_name[i] + '\')">' +
        '<br>' +
        '<img src= "https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=taihey&file='+ file_name2[i] + '.jpg&size=100" onclick="showTemplateDialog2(\'' + file_name2[i] + '\')">'
      }

      //ピンたて
      markerLatLng = {
        lat: lat[i],
        lng: lng[i]
      };
      if(localStorage.getItem("visit_taihei" + i ) === null){
      marker4[i] = new google.maps.Marker({
      position: markerLatLng,
      map: map,
      visible: false, // 最初は非表示

      icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      }
      //animation: google.maps.Animation.DROP
      });
      }else{
        marker4[i] = new google.maps.Marker({
      position: markerLatLng,
      map: map,
      visible: false, // 最初は非表示

      icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/red.png'
      }
        });
      }


        infoWindow4[i] = new google.maps.InfoWindow({ // 吹き出しの追加
          // 吹き出しに表示する内容
          maxWidth: 1000,
          content:
          '<div class="map">' + kumi[i]  + '</div>' + '町員　　　　　' + tyo_in[i] + '<br>人足　　　　　' + zinsoku[i] +
          '<br>中心地(文字配当図)' + center_moji[i] + '<br>中心地(先頭町名)　' + center_town[i] + '<br><br>' + town_name[i] +
          '<br>' + infoWindowContent + '<br>' + stampclick4[i]
        });

      markerEvent4(i); // マーカーにクリックイベントを追加
    }

    // $(document).on("click", "#button", function() {
    //   // clickイベントの処理
    //   //<div id="stamp"></div>
    // });

    // マーカーにクリックイベントを追加
    function markerEvent4(i) {
      marker4[i].addListener('click', function() { // マーカーをクリックしたとき
        if (currentInfoWindow) { //currentInfoWindowに値があるならば
          currentInfoWindow.close(); //開いていた吹き出しを閉じる
        }
        infoWindow4[i].open(map, marker4[i]); // 吹き出しの表示
        currentInfoWindow = infoWindow4[i];
      });
    }
    document.getElementById('cnt_point_taihei').textContent = taihei_taihei;
  })
  .catch(function(error) {
    //全件検索に失敗した場合の処理
    //alert('取得に失敗しました');
  });

function stamp_push4(i) {
  //alert('true');
  var hyouzi = document.getElementById("stamp");
  var btn_display = document.getElementById("btn");
  stamp_lat = stamplat[i];
  stamp_lng = stamplng[i];


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
      hyouzi.style.display = "none";
      //console.log("cnt_stamp1");

      btn_display.insertAdjacentHTML('afterbegin', '<img src="human_pictures/human_red.png">');
      cnt_taihei++;
      //console.log("cnt_stamp2");
      document.getElementById('cnt_taihei').textContent = cnt_taihei;
      document.getElementById('bar4').value = cnt_taihei;

      marker4[i].setIcon({
                url: 'http://maps.google.co.jp/mapfiles/ms/icons/red.png'
            });

      if(cnt_taihei == taihei_taihei) {
        var comp = document.getElementById("comp4");
        comp.innerHTML = "<p style=\"margin-bottom: 0em; margin-top: -1em\">C O M P L E T E ！</p>";
      }
      localStorage.setItem("total_taihei", cnt_taihei);
      localStorage.setItem('visit_taihei' + i,true);
    } else {
      //hyouzi.insertAdjacentHTML('afterbegin', '<b>遠いよ</b>');
      alert('遠くてスタンプが押せませんでした');
    }
  };

  function error() {
    //エラーの場合
    ons.notification.toast('座標位置を取得できません', { timeout: 2000, animation: 'ascend' });
  };
  navigator.geolocation.getCurrentPosition(Success, error); //成功と失敗を判断

}


// チェックボックスがクリックされると呼び出されるfunction
function taihei() {
  // checkboxのElementを取得
  //var cb = document.getElementById("cb4");
  var cb = document.form4.check_4.checked;
  if (cb == true) {
    // チェックボックスがチェックされていればマーカ表示
    // alert('true');
    for (var i = 0; i < cnt; i++) {
      marker4[i].setAnimation(google.maps.Animation.DROP);
      marker4[i].setVisible(true);

    }
  } else {
    // チェックボックスがチェックされていなければ非表示
    // alert('false');
    for (var i = 0; i < cnt; i++) {
      marker4[i].setVisible(false);
    }
  }
}


//ダイアログ表示
function showTemplateDialog2(name_url_i) {
  var dialog = document.getElementById('my-dialog');

    function urlchange_taihey(){
    var url = 'https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=taihey&file='+ name_url_i +  '.jpg&size=500';
    document.getElementById('picture').src = url;
  }

  if (dialog) {
    urlchange_taihey();
    dialog.show();
  } else {
    ons.createElement('picture_dialog.html', { append: true })
      .then(function(dialog) {
        urlchange_taihey();
        dialog.show();
      });
  }
};
//ダイアログ非表示
function hideDialog(id) {
  document
    .getElementById(id)
    .hide();
};
