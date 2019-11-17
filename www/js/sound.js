//音源
var sound = new Audio();
sound.volume = 0.1;
//document.getElementById('vol_range').style="width:100%";

function click_sound() {
  sound.src = "components/decision22.mp3";
  sound.play();
};

function get_stamp_sound(){
  sound.src = "components/decision4.mp3";
  sound.play();
};


function pin_choice_sound(){
  sound.src = "components/cursor1.mp3";
  sound.play();

};

function stamp_failed_sound(){
  sound.src = "components/blip02.mp3";
  sound.play();
};

function menu_open_sound(){
  sound.src = "components/decision29.mp3";
  sound.play();
};

function sound_plus(){
  if(sound.volume <= 0.9){
    sound.volume = sound.volume + 0.1;
    sound.src = "components/decision29.mp3";
    sound.play();
    console.log(sound.volume);
  }
}
function sound_minus(){
  if(sound.volume >= 0.1){
    sound.volume = sound.volume - 0.1;
    sound.src = "components/decision29.mp3";
    sound.play();
    console.log(sound.volume);
  } 
}