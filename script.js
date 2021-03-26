window.addEventListener("load", function() {
	let form = document.querySelector("form");

	form.addEventListener("submit", function(event) {
		event.preventDefault();
		event.stopPropagation();

		let items = document.getElementById("faultyItems");
		let launchStatus = document.getElementById("launchStatus");
		let fuelStatus = document.getElementById("fuelStatus");
		let cargoStatus = document.getElementById("cargoStatus")
		let ready = true;

		let pilotName = document.querySelector("input[name=pilotName]").value;
		let copilotName = document.querySelector("input[name=copilotName]").value;
		let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
		let cargoMass = document.querySelector("input[name=cargoMass]").value;

		if (pilotName === "" || copilotName === "" || fuelLevel === "" || isNaN(fuelLevel) || cargoMass === "" || isNaN(cargoMass) ) {

			alert("All fields are required!");
			items.style.visibility = "hidden";

			launchStatus.style.color = "black";
			launchStatus.innerHTML = "Awaiting Information Before Launch";

		} else {

			items.style.visibility = "visible";

			document.getElementById("pilotStatus").innerHTML = `Pilot ${ pilotName + " " }Ready`
			document.getElementById("copilotStatus").innerHTML = `Co-pilot ${ copilotName + " " }Ready`

			if (fuelLevel < 10000) {
				ready = false;
				fuelStatus.innerHTML = "More fuel required for launch, you need at least 10000 (L)!";
			} else {
				fuelStatus.innerHTML = "Fuel level high enough for launch, get ready for takeoff.";
			}

			if (cargoMass > 10000) {
				ready = false;
				cargoStatus.innerHTML = "We cannot launch with this much weight, engineering says we cannot take more than 10000 (kg).";
			} else {
				cargoStatus.innerHTML = "Cargo mass low enough for launch, prepare yourself!";
			}

			if (ready) {
				launchStatus.style.color = "green";
				launchStatus.innerHTML = "Shuttle is ready for launch, here we go!";
				retrieveData();
			} else {
				items.style.visibility = "visible";
				launchStatus.style.color = "red";
				launchStatus.innerHTML = "Shuttle not ready for launch, sit back and relax";
			}

		}

	});
});


function retrieveData() {

	fetch("https://handlers.education.launchcode.org/static/planets.json").then( function (response) {
		response.json().then(function (data) {
			let targets = document.getElementById("missionTarget");
			let random = Math.round(Math.random() * data.length);
			let target = data[random];

			targets.innerHTML =
				`<h2>Mission Destination</h2>
				<ol>
				   <li>Name: ${target.name}</li>
				   <li>Diameter: ${target.diameter}</li>
				   <li>Star: ${target.stat}</li>
				   <li>Distance from Earth: ${target.distance}</li>
				   <li>Number of Moons: ${target.moons}</li>
				</ol>
				<img src="${target.image}">`


		});
	})

}