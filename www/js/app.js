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
var setCircle;

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
var num_latlng = 0;
function getMyPlace() {
  // circle_cnt++;

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

    //デバッグ用
  //   if(num_latlng % 2 == 0){
  //   var latitude  = position.coords.latitude;//緯度
  //   var longitude = position.coords.longitude;//経度
  // }
  // else{
  //   var latitude = 35.693944
  //   var longitude = 139.753611
  // }
  // num_latlng++;

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

		circle = new google.maps.Circle({
			center: latlng,
			radius: 0,
			strokeColor: "rgba(101, 165, 224, 0.73)",
			strokeOpacity: 1,
			strokeWeight: 10,
			fillColor: "rgba(101, 165, 224, 0.73)",
			fillOpacity: 1
		});
    // if(circle_cnt == 1)
		circle.setMap(map);

		var j = 10, k = 1;
		var rMin = 150, rMax = 300;
    var cnt = 0;

    if(setCircle) clearInterval(setCircle);

		setCircle = setInterval(function() {
				var radius = circle.getRadius();
        // console.log(radius);
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
          // console.log('A');
          // circle.setOptions( option ) ;
				}else if(radius < 100){
					circle.setRadius(radius + 14);
          // k -= 0.14;
          cnt++;
          // console.log('B');
          // circle.setOptions( option ) ;
				}else if(radius < 220){
					circle.setRadius(radius + 12);
          // k -= 0.12;
          cnt++;
          // console.log('C');
          // circle.setOptions( option ) ;
				}else if(radius < 250){
					circle.setRadius(radius + 8);
          // k -= 0.08;
          cnt++;
          // console.log('D');
          // circle.setOptions( option ) ;
				}else if(radius < 280){
					circle.setRadius(radius + 6);
          // k -= 0.04;
          cnt++;
          // console.log('E');
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


function showTemplateDialog_kiyaku_ja() {
  var kiyaku = document.getElementById('kiyaku_dialog');

  function kiyaku_japanese(){
    document.getElementById('scroll_kiyaku').scrollTop = 0;
    document.getElementById('scroll_kiyaku').innerHTML = "<h6 style=\"text-align: center\">ちよダッシュ！アプリプライバシーポリシー</h6>"
                                                       + "<p style=\"padding-left: 0.5em;\">日本大学文理学部（以下，「当大学」といいます。）は，ちよダッシュ！アプリの提供（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。</p>"
                                                       + "<li><strong>第1条（個人情報）</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em;\">「個人情報」とは，「個人情報の保護に関する法律」（以下、「個人情報保護法」といいます。）にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>"
                                                       + "<li><strong>第2条（個人情報の収集方法）</strong></li><p style=\"padding-left: 0.5em;\">当大学は，ユーザーによる本サービスに関するご連絡・お問い合わせを受ける際に氏名，生年月日，住所，電話番号，メールアドレスなどの個人情報を収集することがあります。</p><li><strong>第3条（個人情報を収集・利用する目的）</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em; margin-bottom: -1.5em;\"> 当大学が個人情報を収集・利用する目的は，以下のとおりです。 </p>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>本サービスの提供・運営のため</li>"
                                                       + "  <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>"
                                                       + "  <li>利用規約に違反したユーザーや，不正・不当な目的で本サービスを利用しようとするユーザーの特定をし，ご利用をお断りするため</li>"
                                                       + "  <li>上記の利用目的に付随する目的</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>第4条（利用目的の変更）</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + " <li>当大学は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。</li>"
                                                       + " <li>利用目的の変更を行った場合には，変更後の目的について，当大学所定の方法により，ユーザーに通知し，または当大学が運営するＷｅｂサイト上に公表するものとします。</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>第5条（個人情報の第三者提供）</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\" >"
                                                       + "  <li>当大学は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。</li>"
                                                       + "  <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (1)&nbsp;&nbsp;人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (2)&nbsp;&nbsp;公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (3)&nbsp;&nbsp;国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (4)&nbsp;&nbsp;予め次の事項を告知あるいは公表し，かつ当大学が個人情報保護委員会に届出をしたとき</li>"
                                                       + "    <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "      <li style=\"padding-left: 2.5em;\">① &nbsp;&nbsp;利用目的に第三者への提供を含むこと</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\">② &nbsp;&nbsp;第三者に提供される情報の項目</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\">③ &nbsp;&nbsp;第三者への提供の手段または方法</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\">④ &nbsp;&nbsp;本人の求めに応じて個人情報の第三者への提供を停止すること</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\">⑤ &nbsp;&nbsp;本人の求めを受け付ける方法</li>"
                                                       + "    </ol>"
                                                       + "  </ol>"
                                                       + "  <li>前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。</li>"
                                                       + "  <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (1)&nbsp;&nbsp;当大学が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (2)&nbsp;&nbsp;合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (3)&nbsp;&nbsp;個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合</li>"
                                                       + "  </ol>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>第6条（個人情報の開示）</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>当大学は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。</li>"
                                                       + "  <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (1)&nbsp;&nbsp;本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (2)&nbsp;&nbsp;当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (3)&nbsp;&nbsp;その他法令に違反することとなる場合</li>"
                                                       + "  </ol>"
                                                       + "  <li>前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>第7条（個人情報の訂正および削除）</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>ユーザーは，当大学の保有する自己の個人情報が誤った情報である場合には，当大学が定める手続きにより，当大学に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。</li>"
                                                       + "  <li>当大学は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。</li>"
                                                       + "  <li>当大学は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>第8条（個人情報の利用停止等）</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>当大学は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。</li>"
                                                       + "  <li>前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。</li>"
                                                       + "  <li>当大学は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。</li>"
                                                       + "  <li>前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとることができる場合は，この代替策を講じるものとします。</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>第9条（プライバシーポリシーの変更）</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + " <li>本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</li>"
                                                       + " <li>当大学が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</li>"
                                                       + "</ol>"
                                                       + "<li><strong>第10条（アクセス解析ツールについて）</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em;\"> 本サービスでは，Googleによるアクセス解析ツールGoogle Analyticsを利用しています。このGoogle Analytics は，トラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており，個人を特定するものではありません。Cookieを無効にすることでこの機能を拒否することができます。</p>"
                                                       + "<li><strong>第11条（お問い合わせ窓口）</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em; margin-bottom: 8em\"> 本ポリシーに関するお問い合わせは，下記問い合わせ先へ行うものとします。<br> 問い合わせ先：日本大学文理学部<br>  電話：03(5317)9677<br>  アドレス：nu.chs.edo.tokyo@gmail.com<br><br>  以上</p>"
                                                       + "<ons-bottom-toolbar style=\"text-align: center;\">"
                                                       + "  <ons-button onclick=\"showTemplateDialog_kiyaku_en()\">English</ons-button>"
                                                       + "  <ons-button onclick=\"hideDialog_kiyaku('kiyaku_dialog')\">閉じる</ons-button>"
                                                       + "</ons-bottom-toolbar>";
  }

  if (kiyaku) {
    kiyaku.show();
    kiyaku_japanese();
  }
  else{
    ons.createElement('kiyaku_dialog.html', {append: true})
      .then(function(dialog) {
        dialog.show();
        kiyaku_japanese();
      });
  }
};

function showTemplateDialog_kiyaku_en(){
    var kiyaku_en = document.getElementById('kiyaku_dialog');

  function kiyaku_english(){
    document.getElementById('scroll_kiyaku').scrollTop = 0;
    document.getElementById('scroll_kiyaku').innerHTML = "<h6 style=\"text-align: center\">Chiyo Dash! APP Privacy Policy</h6>"
                                                       + "<p style=\"padding-left: 0.5em;\"> Nihon University, College of Humanities and Sciences (“University,” “we,” “us” or “our”) hereby prescribe certain terms with respect to the handling of Users’ personal information on the provision of Chiyo Dash! APP (the “Services”) as follows (the “Privacy Policy”):</p>"
                                                       + "<li><strong> Article 1 Personal Information</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em;\">“ Personal Information” shall mean personal information about a living individual, specified under the Japanese Act on the Protection of Personal Information (Act No. 57 of May 30, 2003, referred to as the “Act”), which can identify the specific individual by name, date of birth, address, telephone number, contact information or any other matters that are contained in such information, and can identify by the specific pieces of information including looks, fingerprints, voice pattern data or insurance number such as health insurance certificate (the “Individual Identification Information”).</p>"
                                                       + "<li><strong>Article 2 Collection of Personal Information</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em;\">University may collect Personal Information such as name, date of birth, address, telephone number, email address, etc. when Users contact us with respect to the Services.</p>"
                                                       + "<li><strong> Article 3 Purposes of Use and Collection of Personal Information</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em; margin-bottom: -1.5em;\"> The purposes of our collecting and using Personal Information are the following: </p>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>To provide and administer the Services;</li>"
                                                       + "  <li>To respond to Users’ inquiries (including for proof of identity); </li>"
                                                       + "  <li>To identify a User and decline the use by such User who violates the Terms of Use or attempts to use the Services for illegal or unfair purposes; or</li>"
                                                       + "  <li>Any other purposes incidental to the purposes referred to in any of the foregoing items.</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>Article 4 Change of Purposes of Use</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>We may change the purposes of use of Personal Information only when such purposes are reasonably deemed to be relevant to the present purposes.</li>"
                                                       + "  <li>We will notify Users of the change of purposes in the prescribed manner or announce the change of the purposes on our website when we change the purposes of use.</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>Article 5 Provision of Personal Information to Third Parties</strong></li> "
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\" >"
                                                       + "  <li>We will not provide Personal Information to any third party without prior consent from Users except for the following cases, provide, however, that this will not apply to certain cases where the Act or other laws and regulations permit our provision:</li>"
                                                       + "  <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (1)&nbsp;&nbsp; In the case where urgently required for the protection of the life, body or property of an individual and where it is difficult to obtain the consent from the person;</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (2)&nbsp;&nbsp; In the case where it is especially necessary for improving public health or promoting the sound growth of children and when it is difficult to obtain the consent from the person;</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (3)&nbsp;&nbsp; In the case where it is necessary for cooperating with a state organ, a local government, or a contractor entrusted by either of the former two in executing the affairs prescribed by laws and regulations and where obtaining the consent from the person is likely to impede the execution of the affairs concerned; or </li>"
                                                       + "    <li style=\"padding-left: 1.25em;\">(4)&nbsp;&nbsp; When we make an announcement of the following items in advance and we file a report with the Personal Information Protection Committee:</li>"
                                                       + "    <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "      <li style=\"padding-left: 2.5em;\"> i)&nbsp;&nbsp; That the purpose of use will include the provision to a third party;</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\"> ii)&nbsp;&nbsp; The items of information to be provided to a third party;</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\"> iii)&nbsp;&nbsp; The means or method of provision to a third party;</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\"> iv)&nbsp;&nbsp; That we will cease the provision of Personal Information to a third party in pursuant to the request from the person; and</li>"
                                                       + "      <li style=\"padding-left: 2.5em;\"> v)&nbsp;&nbsp; The method of receiving the request from the person.</li>"
                                                       + "    </ol>"
                                                       + "  </ol>"
                                                       + "  <li>Notwithstanding the provision of the preceding paragraph, the following parties shall not fall under the category of third parties:</li>"
                                                       + "    <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (1) &nbsp;&nbsp; In the case where we entrust all or part of handling Personal Information with a third party within the scope necessary to achieve the purposes of use;</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (2) &nbsp;&nbsp; In the case where Personal Information is provided with the succession of business due to mergers or other grounds; or</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (3) &nbsp;&nbsp; In the case where we use Personal Information jointly with certain party, when the person is notified in advance the fact of joint use, items of Person Information to be jointly used, the scope of joint users, the purpose of use of a joint user and a name of a person or organization responsible for management of the relevant Personal Information, or put the person in a readily accessible condition for the person.</li>"
                                                       + "  </ol>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>Article 6 Disclosure of Personal Information</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>University will disclose the relevant Personal Information without delay to the person when he or she requests us to disclose his or her own Personal Information, provided, however, in cases where disclosing such information falls under any of the following, a whole or part thereof may not be disclosed and we will notify the person of such decision of non-disclosure without delay:</li>"
                                                       + "  <ol style=\"padding-left: 0em; list-style: none;\">"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (1) &nbsp;&nbsp; In the case where there is a possibility of harming the person or a third party's life, body, assets or other rights and interests;</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (2) &nbsp;&nbsp; In the case where there is a possibility of interfering seriously with our fair implementation of business; or</li>"
                                                       + "    <li style=\"padding-left: 1.25em;\"> (3) &nbsp;&nbsp; In the case of violating other laws or regulations.</li>"
                                                       + "  </ol>"
                                                       + "  <li>Notwithstanding the provision of the preceding paragraph, we will not in principle disclose any other information than Personal Information, including history information and characteristic information.</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>Article 7 Correction and Deletion of Personal Information</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>Users may demand in accordance with the procedures prescribed by University that we correct, add or delete the relevant Personal Information when your own Personal Information that we handle is erroneous.</li>"
                                                       + "  <li>University will correct, add or delete erroneous Personal Information without delay when we deem it necessary to respond to the demand upon receipt thereof.</li>"
                                                       + "  <li>University will notify Users without delay of our decision to correct, add or delete pursuant to the preceding paragraphor not to correct, add or delete the relevant Personal Information.</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>Article 8 Suspension of Use of Personal Information, etc.</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + " <li>If we are requested to suspend the use or delete the relevant Personal Information due to the reason where such Personal Information is handled beyond the scope of the purposes of use or to the reason where such Personal Information has been obtained by unlawful means, University will without delay do a necessary investigation.</li>"
                                                       + "  <li>When we deem it necessary to respond to the demand on the basis of the result of the investigation under the preceding paragraph, we will suspend the use or delete the relevant Personal Information.</li>"
                                                       + "  <li>University will notify Users without delay of our decision to suspend the use or delete pursuant to the preceding paragraph or not to suspend the use or delete the relevant Personal Information.</li>"
                                                       + "  <li>Notwithstanding the preceding two paragraphs, we may take alternative measures when it will cost us considerable expense or it is difficult to suspend the use or delete the relevant Personal Information and when we could take necessary and alternative measures in order for us to protect Users’ rights and interests.</li>"
                                                       + "</ol>"
                                                       + "<li style=\"margin-bottom: -1em\"><strong>Article 9 Amendment of the Privacy Policy</strong></li>"
                                                       + "<ol type=\"1\" style=\"padding-left: 1em;\">"
                                                       + "  <li>University may amend the Privacy Policy without notice to Users unless otherwise specified under the laws and regulations and/or the Privacy Policy.</li>"
                                                       + "  <li>Unless otherwise separately specified by University, the amended Privacy Policy will become effective immediately when the amendment is posted on our website. </li>"
                                                       + "</ol>"
                                                       + "<li><strong>Article 10 Access Analytics Tools</strong></li>"
                                                       + "<p style=\"padding-left: 0.5em;\"> The services utilize “Google Analytics” which is one of access analytics tools provided Google.  Google Analytics uses cookies in order to collect traffic data. The traffic data is collected anonymously and is not intended to identify an individual.  You may reject this function by nullifying cookies.</p>"
                                                       + "<li><strong>Article 11 Contact </strong></li>"
                                                       + "<p style=\"padding-left: 0.5em; margin-bottom: 8em\"> Users will contact University on the Privacy Policy at the contact information below:<br> Nihon University, College of Humanities and Sciences<br> Telephone: 03-5317-9677<br> Email: nu.chs.edo.tokyo@gmail.com<br><br></p>"
                                                       + "<ons-bottom-toolbar style=\"text-align: center;\">"
                                                       + "  <ons-button onclick=\"showTemplateDialog_kiyaku_ja()\">日本語</ons-button>"
                                                       + "  <ons-button onclick=\"hideDialog_kiyaku('kiyaku_dialog')\">閉じる</ons-button>"
                                                       + "</ons-bottom-toolbar>";
  }

  if (kiyaku_en) {
    kiyaku_en.show();//&nbsp;&nbsp;
    kiyaku_english();
  }
  else{
    ons.createElement('kiyaku_dialog.html', {append: true})
      .then(function(dialog) {
        dialog.show();
        kiyaku_english();
      });
  }
}

//ダイアログ非表示
function hideDialog_kiyaku(id) {
  document.getElementById('scroll_kiyaku').scrollTop = 0;
  document
    .getElementById(id)
    .hide();
};
