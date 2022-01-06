 
$( document ).ready(function() {
    onCreate();
});

const onCreate = () => {
    $("#catchButton").click(function(){
        $.get("catch/index.html", function( data ){
            var page = $(".page-content");
            page.html(data);
            componentHandler.upgradeDom();
        }); 
    });
    $("#loginButton").click(function(){
        console.log('click login');
    });
    checkDataBase().then(r=> {
        console.log('GPS loading...');
        $.get( '/gps/index.html', function( data ) {
            $(".page-content").html(data);
            componentHandler.upgradeDom();
            checkLastAcess().then(i =>{
                console.log(i);
            }).catch(e =>{
                console.log(`erro: ${e}`);
            }); 
        });
    }).catch(e=>{
        console.log(`erro: ${e}`);
    });
};


const checkLastAcess = () =>{
    return new Promise((resolve, reject)=>{
        var last = localStorage.getItem('last_acess');
        if(last == undefined){
            const value  = new Date().getTime();
            localStorage.setItem('last_acess', value);
            reject(0);
        }else{
            console.log('já teve acesso ');
            resolve(1);
        }
    });
}; 
const checkDataBase = () => {
    return new Promise((resolve, reject)=>{
        console.log('check database');
        openDataBase();
        resolve(1);
    });
};


 