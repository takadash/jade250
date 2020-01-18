// ロック用関数
function screenLock(){
    // ロック用のdivを生成
    var element = document.createElement('div'); 
    element.id = "screenLock";
    // ロック用のスタイル
    element.style.height = '100%'; 
    element.style.left = '0px'; 
    element.style.position = 'fixed';
    element.style.top = '0px';
    element.style.width = '100%';
    element.style.zIndex = '9999';
    // element.style.opacity = '1';
    // element.style.backgroundColor="#4040FF";

    var img = document.createElement('img');
    img.src = 'img/loading_animation2.gif';
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%,-50%)";
    img.alt = 'loadingのgif';

    element.appendChild(img);

    var objBody = document.getElementsByTagName("body").item(0); 
    objBody.appendChild(element);
    }
// div削除関数
function delete_dom_obj( id_name ){
    var dom_obj = document.getElementById(id_name);
    var dom_obj_parent=dom_obj.parentNode;
    dom_obj_parent.removeChild(dom_obj);
}
screenLock();