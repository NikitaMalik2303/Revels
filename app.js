const { ifError } = require('assert');
const fs = require('fs');


try {
    csv = fs.readFileSync("./File/Dummy_Data.csv"); 
} catch (error) {
    console.log(error);
}

const arr = csv.toString().split("\n");

const json = [];

const header = arr[0].split(",");
for(let i = 1; i<arr.length-1; i++){
    
    let obj = {};
    let row = arr[i];
    let str = "";
    for(let ch of row){

        let flag = 0;
        if(ch === '"' && flag == 0){
            flag = 1;
        }
        else if(ch === '"' && flag == 1){
            flag =0;
        }
        if(flag == 0 && ch == ","){
           ch = "|";
        }
        if(ch != '"'){
            
            str += ch;
        }

    }

    let res = str.split("|");

    for(j in header){
        
        if(res[j].includes(",")){
            let temp = res[j].split(",");
            obj[header[j]] = temp.map();
        }
        else{
            obj[header[j]] = res[j];
        }

    }

    json.push(obj);

}

const jsonFile = JSON.stringify(json);
try {
    fs.writeFileSync("jsonFile.json",jsonFile);
} catch (error) {
    console.log(error);
}
finally{
    console.log("Written successfuly");
}
