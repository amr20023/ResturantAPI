//loading page
$(document).ready(function () {
    $("#loading-layer").fadeOut(700);
    $("body").css("overflow","visible")
});

//nav animate
let navWid = $(".nav-links").outerWidth();
$(".open-nav").click(function (){ 
    $(".side-nav").animate({"left":"0px"},400,function(){
        $(".open-nav").addClass("d-none");
        $(".close-nav").removeClass("d-none");
        $(".li1").animate({
            opacity: "1",
            marginTop: "25px"
        }, 800), $(".li2").animate({
            opacity: "1",
            marginTop: "25px"
        }, 900), $(".li3").animate({
            opacity: "1",
            marginTop: "25px"
        }, 1000), $(".li4").animate({
            opacity: "1",
            marginTop: "25px"
        }, 1100), $(".li5").animate({
            opacity: "1",
            marginTop: "25px"
        }, 1200) 
    }); 
});
$(".close-nav").click(function (){ 
    $(".side-nav").animate({"left":-navWid},400,function(){
        $(".close-nav").addClass("d-none");
        $(".open-nav").removeClass("d-none");
        $(".li1").animate({
            opacity: "0",
            marginTop: "300px"
        }, 300), $(".li2").animate({
            opacity: "0",
            marginTop: "300px"
        }, 400), $(".li3").animate({
            opacity: "0",
            marginTop: "300px"
        }, 500), $(".li4").animate({
            opacity: "0",
            marginTop: "300px"
        }, 600), $(".li5").animate({
            opacity: "0",
            marginTop: "300px"
        }, 700) 

    }); 
});
$(".link").click(function(){
    $(".side-nav").animate({"left":-navWid},400,function(){
        $(".close-nav").addClass("d-none");
        $(".open-nav").removeClass("d-none");
        $(".li1").animate({
            opacity: "0",
            marginTop: "300px"
        }, 300), $(".li2").animate({
            opacity: "0",
            marginTop: "300px"
        }, 400), $(".li3").animate({
            opacity: "0",
            marginTop: "300px"
        }, 500), $(".li4").animate({
            opacity: "0",
            marginTop: "300px"
        }, 600), $(".li5").animate({
            opacity: "0",
            marginTop: "300px"
        }, 700) 

    }); 
})

/*get data*/

async function getMeals(name="",frist="s")
{
    $(".meal-info").addClass("d-none");
        let link = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${frist}=${name}`);
        let mealData = await link.json();
        let meals = mealData.meals;
        let htmlCode="";
        for(let i=0;i<meals.length;i++)
        {
            htmlCode+=`<div class="col-lg-3 col-md-6 col-12">
            <div class="both-item meal-item">
            <p class="myId d-none"></p>
                <img alt="${meals[i].idMeal}" src="${meals[i].strMealThumb}" class="AA w-100 rounded-2">
                <div class="lay d-flex align-items-center">
                    <p class="fs-2 ps-1">${meals[i].strMeal}</p>
                </div>
            </div>
        </div>`
        }
        document.querySelector(".myRow").innerHTML=htmlCode;
        return getId()
}
getMeals()
function getId()
{
   $(".both-item").click(function (e) { 
    $("#loading-layer").fadeIn(100);
    let t = $(this).find("img")[0];
    let id = Number($(t).attr("alt"));
    $(".meals").addClass("d-none");
    $(".listOfCateg").addClass("d-none");
    $(".categ-body").addClass("d-none");
    $(".meals-country").addClass("d-none");
    $(".ingred-body").addClass("d-none");
    $(".meal-info").removeClass("d-none");
    $("#loading-layer").fadeOut(100);
    getInfo(id)
   });
}
async function getInfo(id)
{
    let link = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let info = await link.json();
    let meal = info.meals[0]
   
    let code ="";
    let mealRecipe="";
    let mealTags="";
    console.log(id);
    let tag = meal.strTags;
    let tags = ""
    if(tag==null)
    {
        tags = ""
    }
    else
    {
        tags = tag.split(",");
    }
   
     code += `  <div class="row">
                    <div class="col-md-4">
                        <div class="info-item">
                            <img src="${meal.strMealThumb}" class="w-100">
                            <h3 class="text-center fw-light">${meal.strMeal}</h3>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="about-item">
                            <h3 class="fs-2 fw-light">Instructions</h3>
                            <p>${meal.strInstructions}</p>
                            <p><span>Area :</span>${meal.strArea} </p>
                            <p><span>Category :</span>${meal.strCategory}</p>

                            <h3 class="fs-2 fw-light">Recipes :</h3>
                            <div class="">
                                <div class="Recipes row">
                                
                                </div>
                            </div>

                            <h3 class="fs-2 fw-light pt-4 pb-3 ">Tags :</h3>
                            <div class="strTag tags">  </div>
                            <div class="mt-5">
                                <a href="${meal.strSource}" target="_blank" class="p-2 rounded-1 btn-success text-decoration-none">Source</a>
                                <a href="${meal.strYoutube}" target="_blank" class="p-2 rounded-1 btn-danger text-decoration-none">Youtube</a>
                            </div>
                        </div>
                    </div>
                </div>`
        document.getElementById("myInfo").innerHTML= code;
        for(let i=1; i<20; i++)
        {
            if(meal[`strIngredient${i}`])
            {
                mealRecipe +=`<div class="col-lg-4"><p class="p-3 m-1">${meal[`strMeasure${i}`]}${meal[`strIngredient${i}`]}</p> </div>`
            }
        }
        document.querySelector(".Recipes").innerHTML= mealRecipe;   
        
        for(let i=0; i <tags.length; i++)
        {
            mealTags +=`<p class="p-3 m-1 d-inline">${tags[i]}</p>`
        }
        document.querySelector(".tags").innerHTML= mealTags;   
 }

/*Search*/

$(".search").click(function(){
    $(".meals").addClass("d-none");
    $(".meal-info").addClass("d-none");
    $("#Category").addClass("d-none");
    $("#Area").addClass("d-none");
    $("#Contact").addClass("d-none");
    $("#ingredient").addClass("d-none");
    $("#Search").removeClass("d-none");
})

let searchInput=document.getElementById("byName");
searchInput.addEventListener("input",function(){
    $("#loading-layer").fadeIn(100);
    let Name = searchInput.value;
    $(".meals").removeClass("d-none");
    $(".meal-info").removeClass("d-none");
    getMeals(Name);
    $("#loading-layer").fadeOut(100);
})

let searchLetter = document.getElementById("byLetter");
searchLetter.addEventListener("input",function(){
    $("#loading-layer").fadeIn(100);
    let char = searchLetter.value;
    $(".meals").removeClass("d-none");
    $(".meal-info").removeClass("d-none");
    getMeals(char,"f");
    $("#loading-layer").fadeOut(100);
})



/*category*/
$("#categor").click(function(){
    $("#loading-layer").fadeIn(100);
    $(".meals").addClass("d-none");
    $(".meal-info").addClass("d-none");
    $("#Search").addClass("d-none");
    $("#Contact").addClass("d-none");
    $("#ingredient").addClass("d-none");
    $("#Category").removeClass("d-none");
    $(".categ-body").removeClass("d-none");
    getCateg()
    $("#loading-layer").fadeOut(100);
})

async function getCateg()
{
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await api.json();
    let categ = data.categories;
    let len = categ.length;
    if(len>20)
    {
        len=20;
    }
    let htmlCode ="";
    for(let i=0;i<len;i++)
    {
        htmlCode+=`<div class="categ col-lg-3 col-md-6">
                        <div class="categ-item ">
                            <img src="${categ[i].strCategoryThumb}" alt="" class="w-100">
                            <div class="categ-layer text-center">
                                <h3 class="fw-light">${categ[i].strCategory}</h3>
                                <p>${categ[i].strCategoryDescription.split(" ").splice(0,12).join(" ")}</p>
                            </div>
                        </div>
                    </div>`
        document.getElementById("categ-row").innerHTML=htmlCode;
    }
    return getTypeOfGateg();
}
function getTypeOfGateg()
{
    $(".categ-item").click(function(){
        $("#loading-layer").fadeIn(100);
        let category =$(this).find("h3").text();
        $(".categ").addClass("d-none");
        getListOfCateg(category);
        $("#loading-layer").fadeOut(100);
    })
}
async function getListOfCateg(category)
{
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let list = await api.json();
    let data = list.meals;
    let htmlCode ="";
    for(let i=0;i<data.length;i++)
    {
        htmlCode+=`<div class="listOfCateg col-lg-3 col-md-6">
                        <div class="both-item categ-item">
                            <img src="${data[i].strMealThumb}" alt="${data[i].idMeal}" class="w-100">
                            <div class="categ-layer text-center d-flex justify-content-center align-items-center">
                                <p class="fw-light fs-3">${data[i].strMeal}</p>
                            </div>
                        </div>
                    </div>`
        document.getElementById("categ-row").innerHTML=htmlCode;
    }
    return getId();
}


/*Area*/

$("#Are").click(function(){
    $("#loading-layer").fadeIn(100);
    $(".meals").addClass("d-none");
    $(".meal-info").addClass("d-none");
    $("#Search").addClass("d-none");
    $("#Category").addClass("d-none");
    $("#Contact").addClass("d-none");
    $("#ingredient").addClass("d-none");
    $("#Area").removeClass("d-none");
    getAreas()
    $("#loading-layer").fadeOut(100);
})
getAreas();
async function getAreas()
{
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await api.json();
    let areas = data.meals
    let htmlcode = "";
    for(let i=0;i<20;i++)
    {
        htmlcode+= ` <div class="listOfCoun col-lg-3 col-md-6">
                        <div class="area-item p-3 shadow-lg">
                            <i class="fa-solid fa-city fa-3x text-danger"></i>
                            <h3 class="fw-lighter">${areas[i].strArea}</h3>
                        </div>
                     </div>`
    }
    document.getElementById("area-row").innerHTML=htmlcode;
    getCountry()
}
function getCountry()
{
    $(".area-item").click(function(){
        $("#loading-layer").fadeIn(100);
        let that = this;
        let country = $(that).find("h3").text();
        $(".listOfCoun").addClass("d-none");
        getCountrymeals(country)
        $("#loading-layer").fadeOut(100);
    })
}
async function getCountrymeals(country)
{
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    let data = await api.json();
    let meal = data.meals;
    let len = meal.length;
    
    if(len>20)
    {
        len=20;
    }
    let htmlCode ="";
    for(let i = 0; i<len ;i++)
    {
        htmlCode+=`<div class="col-lg-3 col-md-6 meals-country">
                        <div class="area-it both-item">
                            <img src="${meal[i].strMealThumb}" alt="${meal[i].idMeal}" class="w-100">
                            <div class="area-layer text-center d-flex justify-content-center align-items-center">
                                <p class="fw-light fs-3">${meal[i].strMeal}</p>
                            </div>
                        </div>
                    </div>`
    }
    document.getElementById("area-row").innerHTML=htmlCode;
     getId()
}


/*ingrediants*/

$("#Ingredients").click(function(){
    $("#loading-layer").fadeIn(100);
    $(".meals").addClass("d-none");
    $(".meal-info").addClass("d-none");
    $("#Search").addClass("d-none");
    $("#Category").addClass("d-none");
    $("#Area").addClass("d-none");
    $(".ingred-body").removeClass("d-none");
    $("#Contact").addClass("d-none");
    $("#ingredient").removeClass("d-none");
    getIngred()
    $("#loading-layer").fadeOut(100);
})

async function getIngred()
{
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let data = await api.json();
    let ingred = data.meals;
    let htmlCode = "";
    for(let i=0; i<20; i++)
    {
        htmlCode += `<div class="col-lg-3 col-md-6 listOfIngred">
                        <div class="ingred-item shadow-lg">
                            <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
                            <h3 class="fw-lighter">${ingred[i].strIngredient}</h3>
                            <p>${ingred[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
                        </div>
                    </div>`
    }
    document.getElementById("ingredient-row").innerHTML=htmlCode;
    getIngredName()
}

function getIngredName ()
{
     $(".ingred-item").click(function(){
        $("#loading-layer").fadeIn(100);
        let that = this;
        $(".listOfIngred").addClass("d-none");
        let name = $(that).find("h3").text();
         getIngredMeals(name) 
         $("#loading-layer").fadeOut(100);
    })
}

async function getIngredMeals(name)
{
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    let data = await api.json();
    let meal = data.meals;
    let htmlCode ="";
    for(let i=0; i<meal.length ;i++)
    {
        htmlCode+=`<div class="col-lg-3 col-md-6">
                        <div class="both-item ingrediant-item">
                            <img src="${meal[i].strMealThumb}" alt="${meal[i].idMeal}" class="w-100">
                            <div class="ingred-layer text-center d-flex justify-content-center align-items-center">
                                <p class="fw-light fs-3">${meal[i].strMeal}</p>
                            </div>
                        </div>
                    </div>`
    }
    console.log(htmlCode);
    document.getElementById("ingredient-row").innerHTML = htmlCode;
     getId()
}


/*Contact*/

$("#Contact-Us").click(function(){
    $("#Search").addClass("d-none");
    $(".meals").addClass("d-none");
    $(".meal-info").addClass("d-none");
    $("#Category").addClass("d-none");
    $("#Area").addClass("d-none");
    $("#ingredient").addClass("d-none");
    $("#Contact").removeClass("d-none");
})


let nameInput =document.getElementById("nameInput");
let emailInput =document.getElementById("emailInput");
let phoneInput =document.getElementById("phoneInput");
let ageInput =document.getElementById("ageInput");
let passInput =document.getElementById("passInput");
let repassInput =document.getElementById("repassInput");

let nameReg = /^[a-z]{1,30}$/i
let emailReg = /^\w{0,30}@\w{0,30}\.\w{0,30}$/
let phoneReg = /^[0-9]{10,12}$/
let ageReg = /^([1-8][0-9]|90|[0-9])$/
let passReg = /^([a-z]{8,}[0-9]{1,}|[0-9]{8,}[a-z]{1,})$/
nameInput.addEventListener("input", function () { 
    if(nameReg.test(nameInput.value)==true)
    {
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        $(".nameAlert").addClass("d-none");
    }
    else
    {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        $(".nameAlert").removeClass("d-none");
    }
    
if(nameReg.test(nameInput.value)==true&&emailReg.test(emailInput.value)==true&&phoneReg.test(phoneInput.value)==true&&ageReg.test(ageInput.value)==true&&passReg.test(passInput.value)==true&&repassInput.value == passInput.value)
{
    document.getElementById("submit-btn").removeAttribute("disabled")

}else
{
    document.getElementById("submit-btn").disabled=true
}
})
emailInput.addEventListener("input", function () { 
    if(emailReg.test(emailInput.value)==true)
    {
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        $(".emailAlert").addClass("d-none");

    }
    else
    {
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        $(".emailAlert").removeClass("d-none");
    }
    
if(nameReg.test(nameInput.value)==true&&emailReg.test(emailInput.value)==true&&phoneReg.test(phoneInput.value)==true&&ageReg.test(ageInput.value)==true&&passReg.test(passInput.value)==true&&repassInput.value == passInput.value)
{
    document.getElementById("submit-btn").removeAttribute("disabled")

}
else
{
    document.getElementById("submit-btn").disabled=true
}
})
phoneInput.addEventListener("input", function () { 
    if(phoneReg.test(phoneInput.value)==true)
    {
        phoneInput.classList.add("is-valid");
        phoneInput.classList.remove("is-invalid");
        $(".phoneAlert").addClass("d-none");

    }
    else
    {
        phoneInput.classList.add("is-invalid");
        phoneInput.classList.remove("is-valid");
        $(".phoneAlert").removeClass("d-none");
    }
    
if(nameReg.test(nameInput.value)==true&&emailReg.test(emailInput.value)==true&&phoneReg.test(phoneInput.value)==true&&ageReg.test(ageInput.value)==true&&passReg.test(passInput.value)==true&&repassInput.value == passInput.value)
{
    document.getElementById("submit-btn").removeAttribute("disabled")

}
else
{
    document.getElementById("submit-btn").disabled=true
}

})
ageInput.addEventListener("input", function () { 
    if(ageReg.test(ageInput.value)==true)
    {
        ageInput.classList.add("is-valid");
        ageInput.classList.remove("is-invalid");
        $(".ageAlert").addClass("d-none");

    }
    else
    {
        ageInput.classList.add("is-invalid");
        ageInput.classList.remove("is-valid");
        $(".ageAlert").removeClass("d-none");
    }
    
if(nameReg.test(nameInput.value)==true&&emailReg.test(emailInput.value)==true&&phoneReg.test(phoneInput.value)==true&&ageReg.test(ageInput.value)==true&&passReg.test(passInput.value)==true&&repassInput.value == passInput.value)
{
    document.getElementById("submit-btn").removeAttribute("disabled")

}
else
{
    document.getElementById("submit-btn").disabled=true
}

})
passInput.addEventListener("input", function () { 
    if(passReg.test(passInput.value)==true)
    {
        passInput.classList.add("is-valid");
        passInput.classList.remove("is-invalid");
        $(".passAlert").addClass("d-none");

    }
    else
    {
        passInput.classList.add("is-invalid");
        passInput.classList.remove("is-valid");
        $(".passAlert").removeClass("d-none");
    }
    if(repassInput.value == passInput.value)
    {
        repassInput.classList.add("is-valid");
        repassInput.classList.remove("is-invalid");
        $(".rePassAlert").addClass("d-none");

    }
    else
    {
        repassInput.classList.add("is-invalid");
        repassInput.classList.remove("is-valid");
        $(".rePassAlert").removeClass("d-none");
    }
    
if(nameReg.test(nameInput.value)==true&&emailReg.test(emailInput.value)==true&&phoneReg.test(phoneInput.value)==true&&ageReg.test(ageInput.value)==true&&passReg.test(passInput.value)==true&&repassInput.value == passInput.value)
{
    document.getElementById("submit-btn").removeAttribute("disabled")

}
else
{
    document.getElementById("submit-btn").disabled=true
}
})
repassInput.addEventListener("input", function () { 
    if(repassInput.value == passInput.value)
    {
        repassInput.classList.add("is-valid");
        repassInput.classList.remove("is-invalid");
        $(".rePassAlert").addClass("d-none");

    }
    else
    {
        repassInput.classList.add("is-invalid");
        repassInput.classList.remove("is-valid");
        $(".rePassAlert").removeClass("d-none");
    }
    
if(nameReg.test(nameInput.value)==true&&emailReg.test(emailInput.value)==true&&phoneReg.test(phoneInput.value)==true&&ageReg.test(ageInput.value)==true&&passReg.test(passInput.value)==true&&repassInput.value == passInput.value)
{
    document.getElementById("submit-btn").removeAttribute("disabled")

}
else
{
    document.getElementById("submit-btn").disabled=true
}
})
