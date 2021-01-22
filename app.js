var unirest = require("unirest");
const axios = require ("axios");
var data = {
    "query":"milk"
}
axios(                                                                                                                                                                                                                                                   
    {                                                                                                                                                                                                                                                        
    method:'post',                                                                                                                                                                                                                                          
    url:"https://trackapi.nutritionix.com/v2/natural/nutrients",                                                                                                                                                                                           
    data:data,                                                                                                                                                                                                                                             
    headers:{                                                                                                                                                                                                                                              
        "x-app-id": "d98335d7",
        "x-app-key": "77117116fe8c06aa921644dfc7026397"                                                                                                                                                                                                               
        }                                                                                                                                                                                                                                                      
    }).then((res)=>{
        console.log(res.data);--
    },(err)=>{
        console.log(err.response.status);
    })


// axios(                                                                                                                                                                                                                                                   
//     {                                                                                                                                                                                                                                                        
//     method:'get',                                                                                                                                                                                                                                          
//     url:"https://nutritionix-api.p.rapidapi.com/v1_1/search/cheddar%20cheese",                                                                                                                                                                                          
//     query : {"fields": "item_name,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate,nf_serving_weight_grams,nf_dietary_fiber,nf_photo"
//     },                                                                                                                                                                                                                                           
//     headers:{                                                                                                                                                                                                                                              
//         "x-rapidapi-key": "80713954bdmshc3fff0a13b1f454p10ae4fjsn48426373fc48",
// 	    "x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
// 	    "useQueryString": true                                                                                                                                                                                                              
//         }                                                                                                                                                                                                                                                      
//     }).then((res)=>{
//         console.log(res.data.hits);
//     })
// var req = unirest("POST", "https://trackapi.nutritionix.com/v2/natural/nutrients");

// req.query({
// 	"fields": "item_name,brand_name,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate,nf_serving_weight_grams,nf_dietary_fiber,nf_photo"
// });

// req.headers({
	// "x-app-id": "d98335d7",
	// "x-app-key": "77117116fe8c06aa921644dfc7026397"
// });

// req.body({
//     "query":"fried rice"
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });