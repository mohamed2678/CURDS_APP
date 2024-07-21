let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
// console.log(title,price,taxes,ads,discount,count,category,submit,total,)
let mood = 'create';
let tmp;

// get total
function getTotal(){
    if (price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value 
        total.innerHTML = result;
        total.style.background = "#040"
    }else{
        total.innerHTML = ''
        total.style.background = "#a00d02"
    }
}
// create product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}


submit.onclick =  function(){
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != ''
        && category.value != '' &&
        price.value != '' &&
        newPro.count <= 100){
        if (mood === 'create'){
            // count
            if (newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    datapro.push(newPro);
                    // total.style.background = "#a00d02"
                        

                  
                clearInput()
                    
                }
            }else{
                datapro.push(newPro);
                clearInput()
            // total.style.background = "#a00d02"
        }
    }else{
        datapro[tmp] = newPro;
        mood = 'create'
        submit.innerHTML = 'create'
        count.style.display = 'block'
        // total.style.background = "#a00d02"
        clearInput()
    }
}else{
    if (newPro.count >= 100){
        alert('you cant add more than 100 product')
        count.style.color = "red"
    }
    alert("you can`t let input empty")
}
    // save localstorge
    localStorage.setItem("product", JSON.stringify(datapro))
    // console.log(dataPro);
    readData()
}
// clear inputs ,, when i send data to array he clear all input
function clearInput(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// read 
function readData(){
        getTotal();
        let table = "";

        for(let i = 0; i < datapro.length; i++){
        
        table += `<tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].count}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="onDelete( ${i} )" id="delete">Delete</button></td>
            <td><button onclick='updateProudct(${i})' id="update">update</button></td>
        </tr>`;
    }
    
    document.getElementById("tbody").innerHTML = table;
    let btndeleteAll = document.getElementById("deleteAll");
    if(datapro.length > 0 ){
        btndeleteAll.innerHTML = `
        <button onclick='deleteAll()'>Delete All (${datapro.length})</button>`
    }else{
        btndeleteAll.innerHTML = "";
    }
} 
readData()
// delete data
    function onDelete(i){
        datapro.splice(i,1);
        localStorage.product = JSON.stringify(datapro);
        readData();
    }
   function deleteAll(){
    if (confirm("Are you sure you want to delete all data?")) {
        localStorage.clear();
        datapro.splice(0);
        readData();
    }
   }
     
    

// update
   function updateProudct(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none';
    if(count.value == ""){
        count.value = 1;
    }
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    });
   }
// search
let searchMood = "title";
function getSearchMood(id){
    let search = document.getElementById("seacrh")
    if(id == 'searchTitle'){
        searchMood = "title"
        search.style.transition = "0.4s"
        search.style.display = "block"
    }else{
        searchMood = "category"
        search.style.transition = "0.4s"
        search.style.display = "block"

    }
    search.placeholder = "search by " + searchMood;
    search.focus()
    search.value = ""
    readData()
}
function searchDate(value){
    let table = '';
    for (let i= 0; i < datapro.length; i++){
        if (searchMood == "title"){
            if (datapro[i].title.includes(value.toLowerCase())){
                table += `<tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="onDelete( ${i} )" id="delete">Delete</button></td>
                <td><button onclick='updateProudct(${i})' id="update">update</button></td>
            </tr>`;
              
        }
        }else{
            if (datapro[i].category.includes(value.toLowerCase())){
                  table += `<tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="onDelete( ${i} )" id="delete">Delete</button></td>
                <td><button onclick='updateProudct(${i})' id="update">update</button></td>
            </tr>`;
        }
    }
}
    
    document.getElementById("tbody").innerHTML = table;
}

// clean data

