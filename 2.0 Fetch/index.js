function getUsers() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((users) => {
        document.getElementById("users").innerHTML = "";
        for (user of users) {
          userContent = `
          <div id="user" onClick=userClicked(${user.id},this)>
            <h3>${user.name}</h3>
            <h4>${user.email}</h4>
          </div>`;
          document.getElementById("users").innerHTML += userContent;
        }
        resolve()
      });
  });
}

function getUserPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    // .then((response) => {
    //   if (response.ok) return response.json();
    // })
    .then((response) => response.ok ? response.json() : console.log('error'))
    .then((posts) => {
      document.getElementById("posts").innerHTML = "";
      for (post of posts) {
        postContent = `
          <div id="post")>
            <h3>${post.title}</h3>
            <h4>${post.body}</h4>
          </div>`;
        document.getElementById("posts").innerHTML += postContent;
      }
    });
}

function userClicked(userId, element) {
  getUserPosts(userId);
  let selected = document.getElementsByClassName("selected");
  for (x of selected) {
    x.classList.remove("selected");
  }
  element.classList.add("selected");
}

getUsers().then(()=>{
  // get user posts asynchronous
  getUserPosts(1)
});
