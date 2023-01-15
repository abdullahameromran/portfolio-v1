let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deleteBtn = document.getElementById("delete-all");
let Update = document.getElementById("update");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let searchInput = document.getElementById("search");


localStorage.setItem("staticInsertIndex", 0);
let staticInsertIndex = JSON.parse(localStorage.getItem("staticInsertIndex"));




// get total
function getTotal() {

    if (price.value != '') {
        total.innerHTML = +price.value + +taxes.value + +ads.value + +discount.value;
        total.style.background = "green";
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }
}


// chech non-empty-inputs
let chechNonEnptyInput = (title, price, category) => {
    if (title != '' && price != '' && category != '')
        return true;
    return false;
}

// create product 
let datapro = JSON.parse(localStorage.getItem("product")) || [];

submit.onclick = () => {

    // turn data into object 
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }

    if (chechNonEnptyInput(title.value, price.value, category.value)) {

        // push element in  array 
        ProCount(+newPro.count, newPro);


        //save data in dataStorage 
        localStorage.setItem("product", JSON.stringify(datapro));


        nulty();

        //show all data content 
        // showData();

        swal("Good job!", "You create it!", "success");
        showData();
    } else {
        swal("Fields required", "You forget it!", "erorr");
    }


}

//nultiy probem
function nulty() {
    //empty Inputs after Saving 
    title.value = '';
    price.value = '';
    taxes.valu = '';
    ads.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML = ''
    category.value = '';
}



// read 


function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {

        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='update(${i})'>update</button></td>
                    <td><button onclick="deleteItem(${i})">delete</button></td>
            <tr>`
    }
    tbody.innerHTML = table;
    console.log(deleteBtn);
    if (datapro.length > 0) {
        console.log(deleteBtn);
        deleteBtn.innerHTML = "<button onclick='deleteAll()'>Delete All</button>";
        document.querySelector("#delete-all button").style.display = "block";
    } else {
        deleteBtn.innerHTML = '';
    }
}


// check count of products created 
let ProCount = (count, pro) => {
    if (count > 1) {
        for (let i = 0; i < count; i++) {
            datapro.push(pro);
        }
    } else {
        datapro.push(pro);
    }
}


// delete 

function deleteItem(index) {
    datapro.splice(index, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}


// delete all 
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    tbody.innerHTML = '';
    showData();

}


// update 
function update(index) {

    Update.style.display = "block";
    submit.style.display = 'none';

    title.value = datapro[index].title;
    price.value = datapro[index].price;
    taxes.value = datapro[index].taxes;
    ads.value = datapro[index].ads;
    discount.value = +datapro[index].discount;
    category.value = datapro[index].category;

    count.style = "display:none";

    getTotal();



    staticInsertIndex = index;


}

function updateContent() {

    datapro[staticInsertIndex].title = title.value;
    datapro[staticInsertIndex].price = price.value;
    datapro[staticInsertIndex].taxes = taxes.value;
    datapro[staticInsertIndex].ads = ads.value;
    datapro[staticInsertIndex].discount = discount.value;
    datapro[staticInsertIndex].category = category.value;

    submit.style.display = 'block';
    document.getElementById("update").style.display = "none";
    localStorage.setItem("product", JSON.stringify(datapro));
    nulty()
    showData();

}


// search 
// searchTitle.onclick = () => {
//     searchInput.placeholder = "Search by title";
// }
// searchCategory.onclick = () => {
//     searchInput.placeholder = "Search by Category";
// }

// function search1(value, id) {
//     console.log(id);
//     let table = '';
//     for (let i = 0; i < datapro.length; i++) {
//         if (id === "searchTitle") {
//             if (datapro[i].title.include("value")) {
//                 table += `
//                 <tr>
//                     <td>${i+1}</td>
//                     <td>${datapro[i].title}</td>
//                     <td>${datapro[i].price}</td>
//                     <td>${datapro[i].taxes}</td>
//                     <td>${datapro[i].ads}</td>
//                     <td>${datapro[i].discount}</td>
//                     <td>${datapro[i].total}</td>
//                     <td>${datapro[i].category}</td>
//                     <td><button onclick='update(${i})'>update</button></td>
//                     <td><button onclick="deleteItem(${i})">delete</button></td>
//                 <tr>
//                         `
//             }

//         } else {
//             if (datapro[i].title.include("value")) {
//                 table += `
//                 <tr>
//                     <td>${i+1}</td>
//                     <td>${datapro[i].title}</td>
//                     <td>${datapro[i].price}</td>
//                     <td>${datapro[i].taxes}</td>
//                     <td>${datapro[i].ads}</td>
//                     <td>${datapro[i].discount}</td>
//                     <td>${datapro[i].total}</td>
//                     <td>${datapro[i].category}</td>
//                     <td><button onclick='update(${i})'>update</button></td>
//                     <td><button onclick="deleteItem(${i})">delete</button></td>
//                 <tr>
//                         `
//             }
//         }
//     }
//     tbody.innerHTML = table;
// }




// clean data
showData();