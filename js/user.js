const links = document.querySelector("#links");
const personalInfo = document.querySelector("#personalInfo");
const userInfoAlt = document.querySelector("#userInfo");
const userSpan = document.querySelector("#user");
const logOutBtn = document.querySelector("#logOut");

function updateHeaderAuthUI() {
	const currentUser = localStorage.getItem("currentUser");
	const isLoggedIn = currentUser !== null;
	
	if (isLoggedIn) {
		if (links) links.style.display = "none";
		if (personalInfo) personalInfo.style.display = "flex";
		if (userInfoAlt) userInfoAlt.style.display = "flex";
		if (userSpan) {
			userSpan.style.display = "block";
			// Parse the currentUser to get the username
			try {
				const userData = JSON.parse(currentUser);
				userSpan.textContent = `Welcome ${userData.userName}`;
			} catch (e) {
				userSpan.textContent = "Welcome User";
			}
		}
	} else {
		if (personalInfo) personalInfo.style.display = "none";
		if (userInfoAlt) userInfoAlt.style.display = "none";
		if (links) links.style.display = "flex";
		if (userSpan) userSpan.textContent = "";
	}
}

updateHeaderAuthUI();

// Redirect away from auth pages if already logged in
(function redirectIfLoggedInOnAuthPages() {
	const currentUser = localStorage.getItem("currentUser");
	const isLoggedIn = currentUser !== null;
	const path = (window.location && window.location.pathname) || "";
	if (isLoggedIn && (path.endsWith("login.html") || path.endsWith("register.html"))) {
		window.location = "index.html";
	}
})();

// Keep header in sync across tabs/windows
window.addEventListener("storage", function () {
	updateHeaderAuthUI();
});

if (logOutBtn) {
	logOutBtn.addEventListener("click", logOut);
}

function logOut() {
	localStorage.clear();
	setTimeout(() => {
		window.location = "index.html";
	}, 500);
}