//Seletor da Seção About (section)
const about = document.querySelector('#about');

//função para buscar os dados do perfil do github
async function getAboutGithub(){
    try{
        const resposta = await fetch('https://api.github.com/users/ThaysPei');
        const perfil = await resposta.json();

        about.innerHTML = '';

        about.innerHTML = ` 
         <figure class="about-image">
                <img src="./assets/images/avatar_dev_woman.svg" alt="foto de perfil">
            </figure>
            

        <article class="about-content">
                <h2>Sobre mim</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Doloremque deleniti recusandae voluptates eos explicabo ipsam minus 
                    accusamus. Nulla magnam corporis, blanditiis quis saepe vero sed quas
                    velit sit accusantium recusandae.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Doloremque deleniti recusandae voluptates eos explicabo ipsam minus 
                    accusamus. Nulla magnam corporis, blanditiis quis saepe vero sed quas
                    velit sit accusantium recusandae.</p>

        <div class="about-buttons-data">
            <div class="buttons-container">
                <a href="${perfil.html_url}" target="_blank" class="botao">Github</a>
                <a href="#" target="_blank" class="botao">Currículo</a>
            </div>


        <div class="data-container">
            <div class="data-item">
                <span class="data-number">${perfil.followers}</span>
                <span class="data-label">Seguidores</span>
            </div>

            <div class="data-item">
                <span class="data-number">${perfil.public.repos}</span>
                <span class="data-label">Repositórios</span>
            </div>
        </div>
    </div>
    </article>`;
    }catch (error){
        console.error('Erro ao buscar dados do Github', error);
    }
}
//Executar a função ao carregar o script
getAboutGithub();