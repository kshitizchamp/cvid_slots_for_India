const request=require("request");
let loc={};
let data={};
const slotsByPin=function(pincode,date,callback){
   const options={
       headers:{
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
       }
   }
    request({
        url:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pincode+"&date="+date,
        json:true,
         headers: {
             Host: 'cdn-api.co-vin.in',
             'X-Fowarded-For':'202.91.135.66'
           }
    },(error,response)=>{
        
       
        
        //console.log(arrayOfPlaces);
        if(error){
            callback(`Cannot connect to Co-win API server ${error}`,undefined);
        }
        else if(response.body.error){
            callback("Not a valid entry, Please check the input and try again",undefined);

        }else if(response.body.sessions===undefined){
            callback("sessions is coming as Undefined",undefined);

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