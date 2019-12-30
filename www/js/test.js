// Mapオブジェクト生成
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

// Markerを生成
var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(35.69, 129.75),
});

// Marker をクリックした時のイベントを定義
google.maps.event.addListener(marker, 'click', function() {
    // infobox 用の div エレメントを生成
    // var infoboxContent = document.createElement('div');
    // infobox に表示するHTML
    var infoboxContent =
        '<div class="infobox">' +
          '<div class="inner">' +
            '<div class="header">' + '<h3>' + 'マルティスープ株式会社' + '</h3>' + '</div>' +
            '<div class="container">' + '東京都千代田区神田錦町3-11' + '<br/>' + '03-3518-9013' + '</div>' +
            '<div class="footer">' + '<button>' + 'Detail' + '</button>' + '</div>' +
          '</div>' +
        '</div>';

    // infobox のオプション
    var infoboxOptions = {
        content: infoboxContent,  //表示するHTML
        disableAutoPan: false,
        dixelOffset: new google.maps.Size(-150, -48), // オフセット値
        zIndex: null,
        alignBottom: true,
        boxClass: "infobox",
        enableEventPropagation: true,
        closeBoxMargin: "0px 0px -30px 0px",
        closeBoxURL: "close.png", // 閉じるボタンのイメージ
        infoBoxClearance: new google.maps.Size(1, 1)
    };
    // infobox を生成して表示
    var infobox = new InfoBox(infoboxOptions);
    infobox.open(map, this);
});
