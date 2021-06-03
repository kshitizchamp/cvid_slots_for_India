const request=require("request");
let loc={};
let data={};
const slotsByPin=function(pincode,date,callback){
    request({
        url:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pincode+"&date="+date,
        json:true
    },(error,response)=>{
        
       
        
        //console.log(arrayOfPlaces);
        if(error){
            callback(`Cannot connect to weather api server ${error}`,undefined);
        }
        else if(response.body.error){
            callback("Not a valid entry",undefined);
        }else if(response.body.sessions.length===0){
            callback("No vaccination centers available for this zip code currently,please try again later",undefined);
        }else{
            const arrayOfPlaces=response.body.sessions;
            callback(undefined,arrayOfPlaces);
            
        }
    
        
        
    });
}
// slotsByPin('110001','1-6-2021',(error,data)=>{
//     console.log(error)
//     console.log(data)
// })

module.exports={slotsByPin};