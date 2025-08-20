const links = document.querySelector("#links");
const personalInfo = document.querySelector("#personalInfo");
const userInfoAlt = document.querySelector("#userInfo");
const userSpan = document.querySelector("#user");
const logOutBtn = document.querySelector("#logOut");

function isLoggedIn() {
	// Backward compatibility: support both new 'currentUser' and legacy 'userName'
	return !!localStorage.getItem("currentUser") || !!localStorage.getItem("userName");
}

function getUserDisplayName() {
	try {
		const currentUser = localStorage.getItem("currentUser");
		if (currentUser) {
			const userData = JSON.parse(currentUser);
			return userData.userName || "User";
		}
		const legacy = localStorage.getItem("userName");
		if (legacy) return legacy;
	} catch (e) {}
	return "User";
}

function updateHeaderAuthUI() {
	const loggedIn = isLoggedIn();
	
	if (loggedIn) {
		if (links) links.style.display = "none";
		if (personalInfo) personalInfo.style.display = "flex";
		if (userInfoAlt) userInfoAlt.style.display = "flex";
		if (userSpan) {
			userSpan.style.display = "block";
			userSpan.textContent = `Welcome ${getUserDisplayName()}`;
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
	const loggedIn = isLoggedIn();
	const path = (window.location && window.location.pathname) || "";
	if (loggedIn && (path.endsWith("login.html") || path.endsWith("register.html"))) {
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