 
$( document ).ready(function() {
    onCreate();
});

const onCreate = () => {
    $("#catchButton").click(function(){
        $.get("catch/index.html", function( data ){
            $("#main-view").html(data);
        }); 
    });
    $("#loginButton").click(function(){
        console.log('click login');
    });
    checkDataBase().then(r => {
        $.get( '/gps/index.html', function( data ) {
            $("#main-view").html(data);
            checkLastAcess().then(i =>{
                localStorage.setItem('last_acess', new Date().getTime());
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
            resolve(1);
        }
    });
}; 
const checkDataBase = () => {
    return new Promise((resolve, reject)=>{
        openDataBase();
        resolve(1);
    });
};


 