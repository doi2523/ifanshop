const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    location.replace("auth.userpage.html")
    // ...
  } else {
    // User is signed out
  }
});