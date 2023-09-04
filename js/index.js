let mealByLetter = []
let meals = []
async function getMeals(url) {
    let allMeals = await fetch(url)
    meals = await allMeals.json()
    meals = JSON.parse(JSON.stringify(meals))
}

$(document).ready(function () {
    $('#loading').fadeOut(1000)
    $("body").css('overflow', 'auto')
})
$('#open-Nav').click(function () {
    $('.btns').toggle(1000);
    $('.btns').css('display', 'flex');
});

async function playApp(){
    await getMeals("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    displayMeals()
    console.log(meals.meals)
    getAllmeals ("test")
    addevent()
}
$("#search").click(()=>{
    $("#test").empty()
    $('.btns').toggle(1000);

    box=`
<div class="row">
    <div class="col-md-6 my-3 ">
        <input id="tab"  class="form-control bg-black  bckgrnd" type="text" placeholder="Search By Name">
    </div>

    <div class="col-md-6 my-3 ">
        <input id="tab2" maxlength="1" class="form-control bg-black bckgrnd " type="text" placeholder="Search By First Letter">
    </div>

    <div id="srchMeal" class="row g-3"></div>
</div>`;
$("#test").html(box);
$("#tab").keyup(async function(){
    let v=this.value;
    await getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${v}`)
    getAllmeals ("srchMeal")
    addevent()
})
$("#tab2").keyup(async function(){
    let v=this.value;
    await getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${v}`)
    getAllmeals ("srchMeal")
    addevent()
}) 
    })
    
$("#Categories").click(async()=>{
    $("#test").empty()
    $('.btns').toggle(1000);

    await getMeals("https://www.themealdb.com/api/json/v1/1/categories.php")
    mealsCategory()
    addevEntCategory()
    })
    
$("#Area").click(async ()=>{
    $("#test").empty()
    $('.btns').toggle(1000);

    await getMeals("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    mealsArea()
    addevEntArea()
    })
    
$("#Ingredients").click(async ()=>{
    $("#test").empty()
    $('.btns').toggle(1000);

    await getMeals("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    mealsingrediant()
    addevEntIngrediant()
    })
    
$("#ContactUs").click(()=>{
    $("#test").empty()
    $('.btns').toggle(1000);

    vali()
    })
    


    function vali(){
        let box;
        box=`
        
    <div class="container">
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75">
            <div class="row gy-3 d-flex ">
                <div class="col-md-6">
                    <input type="text" id="nameInput" class="form-control" placeholder="Enter Your Name">
                </div>
                <div class="col-md-6">
                    <input type="text" id="nameInput" class="form-control" placeholder="Enter Your Email">
                </div>
                <div class="col-md-6">
                    <input type="number" id="nameInput" class="form-control" placeholder="Enter Your Phone">
                </div>
                <div class="col-md-6">
                    <input type="number" id="nameInput" class="form-control" placeholder="Enter Your Age">
                </div>
                <div class="col-md-6">
                    <input type="password" id="nameInput" class="form-control" placeholder="Enter Your Password">
                </div>
                <div class="col-md-6">
                    <input type="password" id="nameInput" class="form-control" placeholder="Repassword">
                </div>
            </div>
            <div class="text-center">
            <button class="btn btn-outline-danger my-3 " disabled>Submit</button>
            </div>
        </div>
        
    </div>
    </div>

        `
        $("#test").html(box);
    }



//  Dah By3rd Kol El Data (Sub Category)
function getAllmeals (place){
    let box = ``

    for (let i = 0; i < meals.meals.length; i++) {
        box += `
<div class="col-md-3 first" id="${meals.meals[i].idMeal}">
    <div class=" position-relative  border border-0 rounded-3 overflow-hidden">
        <img src="${meals.meals[i].strMealThumb}" class="w-100 " alt="">
                    
           <div class="layer  d-flex align-items-center ">
             <h3 class="ps-2">${meals.meals[i].strMeal}</h3>
            </div>
                    
    </div>
                
</div>
`
    }
    document.getElementById(place).innerHTML = box;
}

let par;

function addevEntCategory(){
$(".col-md-3").click(function(){
    let categoryName=this.getAttribute("id");
    par=$(".col-md-3").parent();
    par.empty();
    serchCatName(categoryName);
})
}
function addevEntArea(){
$(".col-md-3").click(function(){
    let categoryName=this.getAttribute("id");
    par=$(".col-md-3").parent();
    par.empty();
    serchAreaName(categoryName);
})
}
function addevEntIngrediant(){
$(".col-md-3").click(function(){
    let categoryName=this.getAttribute("id");
    par=$(".col-md-3").parent();
    par.empty();
    serchingName(categoryName);
})
}

function addevent(){
$(".col-md-3").click(function(){
    let anchor=this.getAttribute("id");
    par=$(".col-md-3").parent();
    par.empty();
    serchIdMeal(anchor);
})
}
async function serchIdMeal(id){
    await getMeals(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    displayMeals();
}
async function serchCatName(catName){
    await getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
    getAllmeals ("test")
    addevent()
}
async function serchAreaName(areaName){
    await getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    getAllmeals ("test")
    addevent()
}
async function serchingName(catName){
    await getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${catName}`);
    getAllmeals ("test")
    addevent()
}

function displayMeals(){
    let box= `<div class="row">
    <div class="col-md-4">
        <img src="${meals.meals[0].strMealThumb}" class=" w-100 border border-0 rounded-3 " alt="">
        <h2 class="text-white ">${meals.meals[0].strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2 >Instructions</h2>
        <p>${meals.meals[0].strInstructions}</p>
        <h3 class="fw-bold" >Area : <span class="fw-medium">${meals.meals[0].strArea}</span> </h3>
        <h3 class="fw-bold" >Category : <span class="fw-medium">${meals.meals[0].strCategory}</span> </h3>
        <h3 >Recipes :</h3>
        <div class="d-flex flex-wrap pb-2">
            <p class="recipes-clr p-1 border border-0 rounded-2 m-2">${meals.meals[0].strMeasure1} ${meals.meals[0].strIngredient1} </p>
            <p class="recipes-clr p-1 border border-0 rounded-2 m-2">${meals.meals[0].strMeasure2} ${meals.meals[0].strIngredient2} </p>
            <p class="recipes-clr p-1 border border-0 rounded-2 m-2">${meals.meals[0].strMeasure3} ${meals.meals[0].strIngredient3} </p>
            <p class="recipes-clr p-1 border border-0 rounded-2 m-2">${meals.meals[0].strMeasure4} ${meals.meals[0].strIngredient4} </p>
            <p class="recipes-clr p-1 border border-0 rounded-2 m-2">${meals.meals[0].strMeasure5} ${meals.meals[0].strIngredient5} </p>
            <p class="recipes-clr p-1 border border-0 rounded-2 m-2">${meals.meals[0].strMeasure6} ${meals.meals[0].strIngredient6} </p>
        </div>
        <h3 >Tags :</h3>
        <div class="d-flex mb-3" >
        <p class="tag px-2 py-1  border border-0 rounded-2 m-2 ">${meals.meals[0].strTags}</p>
        </div>
        <a href="${meals.meals[0].strSource}" class="btn btn-success text-white border border-0 rounded-1 ">Source</a>
        <a href="${meals.meals[0].strYoutube}"class="btn btn-danger text-white border border-0 rounded-1">Youtube</a>
    </div>
</div>`
$(par).html(box);
}
function mealsCategory() {
    let box = "";
    for (let i = 0; i < meals.categories.length; i++) {
        let dis="";
        for(let x=0;x<135;x++){
                dis+=meals.categories[i].strCategoryDescription[x];
        }
        
        box+=
            `
    <div class="col-md-3" id="${meals.categories[i].strCategory}">
        <div class="position-relative parent overflow-hidden border border-0 rounded-3">
            <img src="${meals.categories[i].strCategoryThumb}" class="w-100" />
            <div class="layer position-absolute text-center">
            <h3 class="">${meals.categories[i].strCategory}</h3>
            <p class="p-2 overflow-hidden">${dis}</p>
            </div>
        </div>
    </div>
        `;
    }
    $("#test").html(box);
}
function mealsArea() {
    let container = "";
    for (let i = 0; i < meals.meals.length; i++) {
        container +=
            `
    <div class="col-md-3" id="${meals.meals[i].strArea}">
        <div class=" text-white  parent overflow-hidden border border-0 rounded-3 text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            
            <h3 class="">${meals.meals[i].strArea}</h3>
            
        </div>
    </div>
        `
    }
    $("#test").html(container);
}

function mealsingrediant() {

    let container = "";
    for (let i = 0; i<25; i++) {
        let discribtion="";
        for(let x=0;x<100;x++){
                discribtion+=meals.meals[i].strDescription[x];
        }
        container +=
            `
    <div class="col-md-3" id="${meals.meals[i].strIngredient}">
        <div class="p-2 text-white  parent overflow-hidden border border-0 rounded-3 text-center">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3 class="">${meals.meals[i].strIngredient}</h3>
            <p class="p-2 overflow-hidden">${discribtion}</p>
        </div>
    </div>
        `
    }
    $("#test").html(container);
}


playApp()




