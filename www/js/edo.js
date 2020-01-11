var APPLICATIONKEY = "ed1ce2abd40a216eb032b0d94ac80c9dd9b5027f9a28a2283936297e0a7bfe9b";
var CLIENTKEY = "e760446f705aa042f7f2b70e63f29b1f57eed9d71f15532036ce333c44f9f3c1";

var ncmb = new NCMB(APPLICATIONKEY, CLIENTKEY);
var edoData = ncmb.DataStore('edo4');
var edo_textData = ncmb.DataStore('edo_text2');
var edo_pictureData = ncmb.DataStore('edo_picture4');

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
const cnt_picture = 592;
const cnt_text = 1128;
document.getElementById('cnt_edo').textContent = cnt_edo;
document.getElementById('bar7').value = 0;

var text_id = [];
var head = [];
var category = [];
var text = [];

edo_textData.order("createData", true)
  .limit(200)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
     alert('1-1');
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      text_id[i] = object.text_id;
      head[i] = object.head;
      category[i] = object.category;
      text[i] = object.text;
    }
  });

  edo_textData.order("createData", true)
  .skip(200)
  .limit(300)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
     alert('1-2');
    for (var i = 200; i < 200 + results.length; i++) {
      var object = results[i-200];
      text_id[i] = object.text_id;
      head[i] = object.head;
      category[i] = object.category;
      text[i] = object.text;
    }
  });

  edo_textData.order("createData", true)
  .skip(500)
  .limit(200)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
     alert('1-3');
    for (var i = 500; i < 500+results.length; i++) {
      var object = results[i-500];
      text_id[i] = object.text_id;
      head[i] = object.head;
      category[i] = object.category;
      text[i] = object.text;
    }
  });

  edo_textData.order("createData", true)
  .skip(700)
  .limit(300)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
     alert('1-4');
    for (var i = 700; i < 700+results.length; i++) {
      var object = results[i-700];
      text_id[i] = object.text_id;
      head[i] = object.head;
      category[i] = object.category;
      text[i] = object.text;
    }
  });

edo_textData.order("createData", true)
  .skip(1000)
  .limit(200)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
    alert('1-5');    for (var i = 1000; i < 1000 + results.length; i++) {
      var object = results[i - 1000];
      text_id[i] = object.text_id;
      head[i] = object.head;
      category[i] = object.category;
      text[i] = object.text;
    }
  });

var point_id_pic = [];
//狭域
var point_narrow = [];
//広域
var point_wide = [];
var text_id_main = [];
var text_id_sub = [];
var file = [];
var title_pic = [];


edo_pictureData.order("createData", true)
  .limit(300)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
     alert('2-1');

    for (var i = 0; i < results.length; i++) {
      var object = results[i];

      point_id_pic[i] = object.point_id;
      point_narrow[i] = object.point_narrow;
      point_wide[i] = object.point_wide;
      text_id_main[i] = object.text_id_main;
      text_id_sub[i] = object.text_id_sub;
      file[i] = object.file;
      title_pic[i] = object.title;
    }
  });

edo_pictureData.order("createData", true)
  .skip(300)
  .limit(300)
  .fetchAll()
  .then(function(results) {
    //全件検索に成功した場合の処理
     alert('2-2');

    for (var i = 300; i < 300+results.length; i++) {
      var object = results[i-300];

      point_id_pic[i] = object.point_id;
      point_narrow[i] = object.point_narrow;
      point_wide[i] = object.point_wide;
      text_id_main[i] = object.text_id_main;
      text_id_sub[i] = object.text_id_sub;
      file[i] = object.file;
      title_pic[i] = object.title;
    }
  });

function callback() {
  edoData.order("createData", true)
    .limit(500)
    .fetchAll()
    .then(function(results) {
      //全件検索に成功した場合の処理
      alert('3');
      var lat = [];
      var lng = [];
      var title = [];
      var point_id = [];
      var noData = [];
      var samePlace = [];

      for (var i = 0; i < results.length; i++, pinCnt_edo++) {
        var object = results[i];
        lat[i] = parseFloat(object.lat);
        lng[i] = parseFloat(object.lng);
        title[i] = object.title;
        point_id[i] = object.point_id;

        var ar_point = [];

        for (var j = 0; j < cnt_picture; j++) {
          if (point_id[i] == point_id_pic[j]) ar_point.push(j);
        }

        var ar_text_main = [];
        var ar_text_sub = [];
        for (var j = 0; j < cnt_text; j++) {
          for (var k = 0; k < ar_point.length; k++) {
            if (text_id_main[ar_point[k]] == text_id[j]){
              ar_text_main.push(j);
            }
            if (text_id_sub[ar_point[k]] == text_id[j]) ar_text_sub.push(j);
          }
        }

        if (ar_point.length == 0) noData.push(title[i]);

        var reset = 0;
        if (lat[i] > 0) {
          for (var j = 0; j < results.length; j++) {
            if (lat[i] == lat[j] && lng[i] == lng[j]) {
              reset++;
              samePlace.push(title[i]);
            }
          }
        }

        var infoWindowContent = [];
        for (var k = 0; k < ar_point.length; k++) {
          if(file[ar_point[k]] == '画像なし'){
            infoWindowContent +=
            '<div style="padding: 2.5px;">'+
            '<img src="img/noimage2.png" width="80" height="60" onclick="showTemplateDialog_edo('
            + '\'' + point_wide[ar_point[k]]   + '\'' + '\,'
            + '\'' + point_narrow[ar_point[k]] + '\'' + '\,'
            + '\'' + text[ar_text_sub[k]]      + '\'' + '\,'
            + '\'' + text[ar_text_main[k]]     + '\'' + '\,'
            + '\'' + file[ar_point[k]]         + '\''
            + ')">'
            + '</div>'
          }
          else{
            infoWindowContent +=
            '<div style="padding: 2.5px;">'+
            '<img src="https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=edo&file='
            + file[ar_point[k]]
            + '.jpg&size=100" onclick="showTemplateDialog_edo('
            + '\'' + point_wide[ar_point[k]]   + '\'' + '\,'
            + '\'' + point_narrow[ar_point[k]] + '\'' + '\,'
            + '\'' + text[ar_text_sub[k]]      + '\'' + '\,'
            + '\'' + text[ar_text_main[k]]     + '\'' + '\,'
            + '\'' + file[ar_point[k]]         + '\''
            + ')">'
            + '</div>'
          }
        }

        stamplat_edo[i] = lat[i];
        stamplng_edo[i] = lng[i];
        stampclick_edo[i] = '<div id="stamp" style="padding: 2.5px;"><ons-button onclick ="stamp_push_edo(' + i + ')">スタンプ</ons-button></div>' + '<div id="btn">'
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
          content: '<div class="map">' + title[i] +
            '<br>' + infoWindowContent + '</div>' +
            '<br>' + stampclick_edo[i]
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
    })
    .catch(function(error) {
      //全件検索に失敗した場合の処理
      //alert('取得に失敗しました');
    });
}
setTimeout(callback, 1000);

function stamp_push_edo(i) {
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

      if (result <= 1.0) return true;
      return false;
    }
    //結果
    var now_success = getDistance(now_lat, now_lng, stamp_lat, stamp_lng);

    if (true) {
      hyouzi.style.display = "none";

      btn_display.insertAdjacentHTML('afterbegin', '<img src="human_pictures/human_red.png">');
      cnt_edo++;
      document.getElementById('cnt_edo').textContent = cnt_edo;
      document.getElementById('bar7').value = cnt_edo;

      marker_edo[i].setIcon({
        url: 'http://maps.google.co.jp/mapfiles/ms/icons/pink.png'
      });

    } else {
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
  var cb = document.form7.check_7.checked;

  if (cb == true) {
    // チェックボックスがチェックされていればマーカ表示
    for (var i = 0; i < pinCnt_edo; i++) {
      marker_edo[i].setVisible(true);
    }

  } else {
    // チェックボックスがチェックされていなければ非表示
    for (var i = 0; i < pinCnt_edo; i++) {
      marker_edo[i].setVisible(false);
    }
  }
}

var gatyushi;
var honbun;
//ダイアログ表示
function showTemplateDialog_edo(a,b,c,d,e) {
  var dialog = document.getElementById('edo_dialog');


  function insert_text(){
    var kouiki = a;
    var kyouiki = b;
    var picture_edo_url
    if(e == '画像なし') picture_edo_url = 'img/noimage2.png';
    else              picture_edo_url = 'https://dep.chs.nihon-u.ac.jp/japanese_lang/nichigo-nichibun/web-edo-tokyo/pic.php?type=edo&file=' + e + '.jpg&size=350';
    gatyushi = c;
    honbun = d;


    document.getElementById('kouiki').innerHTML = "地名（広域）：　" + kouiki;
    document.getElementById('kyouiki').innerHTML = "地名（狭域）：　" + kyouiki;
    document.getElementById('edo_picture').src = picture_edo_url;
  }

  if (dialog) {
    dialog.show();
    insert_text();
  }
  else{
    ons.createElement('edo_dialog.html', {append: true})
      .then(function(dialog) {
        dialog.show();
        insert_text();
      });
  }
};

// テストテンプレート
function showTemplateDialog_edo2() {
  var dialog2 = document.getElementById('edo_dialog2');

  function insert_text(){
    document.getElementById('gatyushi2').innerHTML = "画中詞：　" + gatyushi;
    document.getElementById('honbun2').innerHTML = "本文：　" + honbun;
  }

  if (dialog2) {
    dialog2.show();
    insert_text();
  }
  else{
    ons.createElement('edo_dialog.html2', {append: true})
      .then(function(dialog) {
        dialog.show();
        insert_text();
      });
  }
};

//ダイアログ非表示
function hideDialog_edo(id) {
  document
    .getElementById(id)
    .hide();
};

function hideDialog_edo_scroll(id) {
  document.getElementById('scroll').scrollTop = 0;
  document
    .getElementById(id)
    .hide();
};
