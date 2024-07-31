let content = document.querySelector("#content");
let welcome = document.querySelector("#welcome");
let recipesBtns = document.querySelectorAll(".btn.btn-outline-light");

let arrInfos = [];
localStorage.getItem("arrInfos") != null
	? (arrInfos = JSON.parse(localStorage.getItem("arrInfos")))
	: (arrInfos = []);

userIndex = JSON.parse(localStorage.getItem("index"));

welcome.innerHTML += arrInfos[userIndex].name;

function getRecipes(recipesName) {
	fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipesName}`)
		.then(function (result) {
			let myData = result.json();
			return myData;
		})
		.then(function (myData) {
			allRecipes = myData.recipes;
			return allRecipes;
		})
		.then(function (allRecipes) {
			let cartoona = "";
			for (let i = 1; i < allRecipes.length; i++) {
				cartoona += `
		    <div class="col-md-4 col-lg-3 col-xl-2">
					<div class="text-white bg-black p-1">
						<img class="w-100" src="${allRecipes[i].image_url}" alt="">
						<h5 class="p-1 m-0">${allRecipes[i].title}</h5>
						<a class="anckor ps-2 text-info" href="${allRecipes[i].source_url}">see more</a>
					</div>
				</div>`;
			}
			content.innerHTML = cartoona;
		})
}

getRecipes("pizza")

recipesBtns.forEach(element => {
	element.addEventListener("click", function (e) {
		getRecipes(e.target.innerHTML);
		console.log(e.target.innerHTML);
		console.log(typeof e.target.innerHTML);
	})
});