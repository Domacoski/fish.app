console.log('[GPS START]');
var loop = undefined;
const IS_LOOP = false;
const CHECK_GPS = 'gps-check';

var dialog = document.querySelector('dialog'); 
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.querySelector('.no').addEventListener('click', function() {
      dialog.close();
      alert('O app não pode funcionar!');
    });
    dialog.querySelector('.yes').addEventListener('click', function() {
      dialog.close();
      localStorage.setItem(CHECK_GPS, 1);
      getLocation(updateLocation);

    });
setTimeout(function(){
  var isCheck = localStorage.getItem(CHECK_GPS);
  if(isCheck == undefined){
    dialog.showModal();
  }else{
    getLocation(updateLocation);
  }
}, 333);

function getLocation(showPosition) {
  if (navigator.geolocation) {
      console.log('Obtendo localização...');
      navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
      alert('não foi possível obter a localização!');
  }
}

function updateLocation(position){
  if(loop != undefined){
    clearInterval(loop);
  }
  if(position == undefined){
    console.log('position undefined...');
  }else{ 
    addLocation(position.timestamp, position.coords.latitude,position.coords.longitude).
    then(r => {
      console.log(r);
      var view = $('#view-position');
      if(view != undefined){
        view.html(`📍 seu local`);
        view.attr('href', `https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lon}`);
      }
      if(IS_LOOP){
        loop = setInterval(getLocation, 32100, updateLocation);
      }
    }).catch(e => {
      console.log(`ERRO: ${e}`);
    }); 
  }
};