import { doubleNumbers } from "./test";


// fetch crypto parts 
let coin_data = {}

const fetch_crypto = async () => {
  console.log("fetch data process")
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`;
  console.log(doubleNumbers)
  const options={
    method: 'GET',
    headers: {'X-CMC_PRO_API_KEY': 'a23e101b-9351-4849-a04d-95971038bced'}
    }
    try {
    // prepare varible
    const response = await fetch(url,options)
    const response_json= await response.json()
    const crypto_data = response_json.data
    crypto_data.map((e) => {
      coin_data[`${e.symbol}`] = { slug: e.slug, price: e.quote.USD.price, volume: e.quote.USD.market_cap }
    })
    // localStorage.setItem("crypto_data",coin_data)
    console.log(coin_data)
  }catch (err) {
    return err;
  }
};

// the way to search specific text from input then return in result is it have in fetch data
let search_result = {}
const search_engine = (data,keyword)=>{
    console.log("filter process")
    // check by key
    let keyword_upper = keyword.toUpperCase()
    // console.log(keyword_upper)
    let target_keyword ;
    // if input doesn't math in any key or slug
    if (keyword === ""){
        search_result={}
        return search_engine
    }
    // check is keyword is in data keys 
    if (data.hasOwnProperty(keyword_upper)){
      // console.log("check key")
      const price = data[keyword_upper].price
      target_keyword = data[keyword_upper].slug
      // console.log(target_keyword,price)
      search_result[keyword_upper]={name : target_keyword, price:price, volume : data[keyword_upper].volume}
      return search_result
    }
    // access to all keys forget slug then check keyword and slug
    for (const key in data){
       target_keyword = `${data[key].slug}`
      //  console.log(target_keyword)
      if (target_keyword.includes(keyword)){
        search_result[key] = {name : target_keyword,prcie : data[key].price ,volume : data[key].volume}
      }
      else if (keyword === target_keyword) { 
        search_result={}
        search_result[key] = {name : target_keyword,prcie : data[key].price ,volume : data[key].volume}
      }
    return search_result
  }
}

// html element part
// get element from html
const inp_coin = document.getElementById("inp_crypto")
const coin_container =  document.querySelector(".coin_container")
// create search result 
const create_search_result = ()=>{
    // data show sort by first 3 the most volume
    //coin_container.innerHTML=`<li class="coin_list" > <p class="coin_name">${}</p> <p class="coin_price">${}</p></li>`
    console.log("create html");
}


// call data when first click

// get input coin varible
let inp_coin_value = "" ;
let crypto_fetch = true ;
inp_coin.addEventListener("input",(e)=>{
    e.preventDefault()
    inp_coin_value = `${e.target.value}`
    console.log(inp_coin_value)
    search_engine(coin_data,inp_coin_value)

})

// get data setup when have reload or first opening
fetch_crypto()
