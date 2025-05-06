let ui = new firebaseui.auth.AuthUI(firebase.auth());
let login = document.querySelector('.login');
const blogSection = document.querySelector('.blog-section');

auth.onAuthStateChanged((user) => {
    if(user){
        login.style.display = "none";
        getUserWrittenBlogs();
    } else{
        setupLoginButton();
    }
})

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectURL) {
                login.style.display = "none";
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    })
}

// fetch ueser wirtten blogs

const getUserWrittenBlogs = () => {
    db.collection("blogs").where("author", "==", auth.currentUser.email.split('@') [0])
        .get()
        .then((blogs) => {
            blogs.forEach((blog) => {
            createBlog(blog);
        })
    })
    .catch((error) => {
        console.log("Error getting blogs", error);
    })
}
    
const createBlog = (blog) => {
    let data = blog.data();
    const blogSection = document.querySelector('.blogs-section'); 
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>            
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">Ler</a>
        <a href="/${blog.id}/editor" class="btn grey">Editar</a>
        <a href="#" onclick="deleteBlog('${blog.id}')" class="btn danger">Deletar</a>        
    </div>
    `;
}

const deleteBlog = (id) => {
    db.collection("blogs").doc(id).delete().then(() => {
        location.reload();
    })
    .catch((erroe) => {
        console.log("Error deleting the blog");
    })
}