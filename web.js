function copyString(str) {
	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}
//as search input changes, filter the icon classes if their id includes the search field
function search(e) {
	console.log(e.target.value);
	document.querySelectorAll(".icon").forEach((el) => {
		el.classList.remove("hidden");
		if (!el.id.includes(e.target.value)) {
			el.classList.add("hidden");
		}
	});
}
//as base color input changes, change the base css variable
function baseColor(e) {
	document.documentElement.style.setProperty("--base", e.target.value);
}
function accentColor(e) {
	document.documentElement.style.setProperty("--accent", e.target.value);
	document.documentElement.style.setProperty(
		"--bgAccent",
		e.target.value + "54"
	);
}
