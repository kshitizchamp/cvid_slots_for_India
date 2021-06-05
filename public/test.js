console.log("Script is loaded!")
const form=document.querySelector("form")
const pincode=document.querySelector("#pin")
const userDate=document.querySelector('#date')
const table=document.querySelector(".table")
let tbody=document.querySelector('#table')
const msg=document.querySelector("#error")
let trname;
let tr,td,td1,td2,td3,td4,td5,td6;
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    if(tr){
    tbody.remove()
    tbody=document.createElement("tbody")
    table.appendChild(tbody)
    }
    msg.textContent="Processing Data...";
    
    console.log(pincode.value)
    console.log(userDate.value)
    fetch("/covid?pincode="+pincode.value+"&date="+userDate.value).then((response)=>{
        response.json().then((data)=>{
           if(data.error){
               //console.log(error)
               console.log("Parsing the body response here:",data.error)
            msg.textContent=data.error.message;
           }else{
            
            
            console.log("data=>",data.data)
            const filterBySlots= function(el) {
                if(el.available_capacity===0){
                    return false
                }else{
                    return true;
                }
               
            }
            const filtered= data.data.filter(filterBySlots);
            
            console.log("filter data=>",filtered);
                if(filtered.length===0){
                    msg.textContent="No available vaccine slots currently, please try again later"
                }else{
                    for(let i=0;i<filtered.length;i++){
                        tr=document.createElement("tr")
                       trName=tbody.appendChild(tr);
                            td=document.createElement("td")
                           td.innerText=filtered[i].name
                           trName.appendChild(td);
                            td1=document.createElement("td")
                           td1.innerText=filtered[i].available_capacity_dose1;
                           trName.appendChild(td1);
                            td2=document.createElement("td")
                           td2.innerText=filtered[i].available_capacity_dose2;
                           trName.appendChild(td2);
                            td3=document.createElement("td")
                           td3.innerText=filtered[i].vaccine;
                           trName.appendChild(td3);
                           td4=document.createElement("td")
                           td4.innerText=filtered[i].address;
                           trName.appendChild(td4);
                           td5=document.createElement("td")
                           td5.innerText=filtered[i].min_age_limit;
                           trName.appendChild(td5);
                           td6=document.createElement("td")
                           td6.innerText=filtered[i].fee_type;
                           trName.appendChild(td6);
                       
                       
                       //tbody.appendChild(tr).appendChild(td)
                   }
                   msg.textContent="Data Processed";
                }
            
           }
            
            

        })
    })
})
