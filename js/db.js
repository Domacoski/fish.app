const VERSION = '0.1-alpha';
const NAME = 'f1sh@pp';
const DESC = 'FishApp DataBase';
const SIZE =  (5 * 1024 * 1024);

var open = () => openDatabase(NAME, VERSION, DESC, SIZE);

 function openDataBase (  ) {
    var dataBase  = open();
        dataBase.transaction(function (tx) {   
            tx.executeSql('CREATE TABLE IF NOT EXISTS user (id REAL unique, webId TEXT, name TEXT, login TEXT, password TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS type (id REAL unique, webId TEXT, name TEXT)'); 
            tx.executeSql('CREATE TABLE IF NOT EXISTS fish (id REAL unique, type REAL, location REAL, img text, data text)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS img (id REAL unique, data TEXT)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS imgFish (id REAL unique, fish REAL, img REAL)');  
            tx.executeSql('CREATE TABLE IF NOT EXISTS location (id REAL unique, timestamp REAL, lat text, lon text)'); 
        });
}

function addLocation( _timestamp, _lat, _lon){ 
    return new Promise((resolve, reject) =>{
        var db = open();
        db.transaction(function (tx) {   
            tx.executeSql('INSERT INTO location (timestamp, lat, lon) values(?, ?, ?)', 
            [_timestamp, new String(_lat), new String(_lon)], function(tx, data){
                resolve({rowid:data.insertId, timestamp: _timestamp, lat: _lat, lon:_lon});
            });
        }); 
    });
};
function getLastLocation () {
    return new Promise((resolve, reject) => {
        var db = open();
        db.transaction(function(tx){
            if(tx == undefined){
                reject('no transaction"');
            }
            tx.executeSql('select * from location limit 1',[],function(tx, data){
               
                console.log(data);
                // tx.close();
                resolve(data.rows[0]);
            });
        });

    });
};