let ul = document.querySelector('.links-conteiner');

auth.onAuthStateChanged((user) => {
    if(user){
        // user is loggin
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Painel</a></li>
        <li class="link-item"><a href="#" onclick="logoutUser()" class="link">Sair</a></li>`

    }else{
        // no one is logged in
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Login</a></li>`
    }
})
