    // Page init event
    document.addEventListener('init', function(event) {
      var page = event.target;

      if (page.matches('#first-page')) {

        page.querySelector('#push-button').onclick = function() {
          if(document.agree_ja.agree1.checked)document.querySelector('#navigator').pushPage('page2.html');
        };

      } else if (page.matches('#second-page')) {

        // page.querySelector('#pop-button').onclick = function() {
        //   document.querySelector('#navigator').popPage();
        // };


               //var pagex = event.target;

        //if(page.matches.('#second-page')){

          //page.querySelector('#status-button').onclick = function(){
            //document.querySelector('#navigator').pushPage('status.html');
          //};
        //}

      }

    } );

    if (ons.platform.isIPhoneX()) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }
