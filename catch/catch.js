$.get('types/all.json', function(data){
    var itens =  data.map(i => `<option value="${i.webId}">${i.name}</option>`);
    $("#especie").html('<option value="0" selected></option>'+itens);
    componentHandler.upgradeDom();

    
    setNowDatePicker();
    
    getLastLocation().then(r=>{
        console.log(`AQUI:  ${JSON.stringify(r)}`);
        $("#location").val(`${r.lat},${r.lon}`);
        $("#locationId").val(r.rowid);
        componentHandler.upgradeDom();
    }).catch(e =>{
        alert('Não foi possível localizar a captura!');
    })
});

function setNowDatePicker(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if(hour< 10) hour = "0"+hour;
    if(minute < 10) minute = "0"+minute;

    var today = year + "-" + month + "-" + day +"T"+hour+":"+minute;       
    $("#date").attr("value", today);
    $("#date").focus();
    componentHandler.upgradeDom();
};

function readURL(input, numberImg){

    if (input.files && input.files[0]) {
        // get user's uploaded image
        const imgPath = document.getElementById('photo'+numberImg).files[0];
        const reader = new FileReader();
    
        reader.addEventListener("load", function () {
            console.log('event listner result!');   
            localStorage.setItem('img'+numberImg, reader.result);
            loadImage('img'+numberImg);
        }, false);
            if (imgPath) {
                reader.readAsDataURL(imgPath);
            }
        }else{
            console.log('file invalid');
        }
}

function loadImage(imgId){
    let img = document.getElementById(imgId);
    img.src = localStorage.getItem(imgId); 
};