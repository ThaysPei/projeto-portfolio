//Seletor da Seção About (section)
const about = document.querySelector('#about');

// Seletor da Seção Projects (Carrossel)
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Seletor do Formulário
const formulario = document.querySelector('#formulario');

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//função para buscar os dados do perfil do github
async function getAboutGithub(){
    try{
        const resposta = await fetch('https://api.github.com/users/ThaysPei');
        const perfil = await resposta.json();

        about.innerHTML = '';

        about.innerHTML = ` 
         <figure class="about-image">
                <img src="./assets/images/autora.png" alt="foto de perfil">
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
                <span class="data-number">${perfil.public_repos}</span>
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

// Função para buscar os dados dos Projetos (respositórios públicos) do GitHub
async function getProjectsGitHub() {
  try {
    const resposta = await fetch('https://api.github.com/users/conteudoGeneration/repos?sort=updated&per_page=6');
    const repositorios = await resposta.json();

    swiperWrapper.innerHTML = '';

    // Cores e ícones das linguagens
    const linguagens = {
      'JavaScript': { icone: 'javascript' },
      'TypeScript': { icone: 'typescript' },
      'Python': { icone: 'python' },
      'Java': { icone: 'java' },
      'HTML': { icone: 'html' },
      'CSS': { icone: 'css' },
      'PHP': { icone: 'php' },
      'C#': { icone: 'csharp' },
      'Go': { icone: 'go' },
      'Kotlin': { icone: 'kotlin' },
      'Swift': { icone: 'swift' },
    };

    repositorios.forEach(repositorio => {
      var linguagemExibir = repositorio.language || 'GitHub';
      const config = linguagens[repositorio.language] || { icone: 'github' };
      const urlIcone = `./assets/icons/languages/${config.icone}.svg`;

      const nomeFormatado = repositorio.name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, '')
        .toUpperCase();

      const descricao = repositorio.description
        ? (repositorio.description.length > 100 ? repositorio.description.substring(0, 97) + '...' : repositorio.description)
        : 'Projeto desenvolvido no GitHub';

      // tags
      const tags = repositorio.topics?.length > 0
        ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
        : `<span class="tag">${linguagemExibir}</span>`;

      // Botões de ação
      const botoesAcao = `
        <div class="project-buttons">
          <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
          </a>
          ${repositorio.homepage ?
            `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">
              Deploy
            </a>`
            : ''}
        </div>
      `;

      swiperWrapper.innerHTML += `
        <div class="swiper-slide">
          <article class="project-card">
            <div class="project-image">
              <img src="${urlIcone}"
                alt="Ícone ${linguagemExibir}"
                onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';">
            </div>

            <div class="project-content">
              <h3>${nomeFormatado}</h3>
              <p>${descricao}</p>
              <div class="project-tags">${tags}</div>
              ${botoesAcao}
            </div>
          </article>
        </div>
      `;
    });

    iniciarSwiper();

  } catch (error) {
    console.error('Erro ao buscar repositóriositórios:', error);
  }
}

// Executar a função ao carregar o script
getProjectsGitHub()


// Função de Validação do Formulário
formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  document.querySelectorAll('form span')
    .forEach(span => span.innerHTML = '');

  let isValid = true;

  const nome = document.querySelector('#nome');
  const erroNome = document.querySelector('#erro-nome');

  if (nome.value.trim().length < 3) {
    erroNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
    if (isValid) nome.focus();
    isValid = false;
  }

  const email = document.querySelector('#email');
  const erroEmail = document.querySelector('#erro-email');

  if (!email.value.trim().match(emailRegex)) {
    erroEmail.innerHTML = 'Digite um e-mail válido.';
    if (isValid) email.focus();
    isValid = false;
  }

  const assunto = document.querySelector('#assunto');
  const erroAssunto = document.querySelector('#erro-assunto');

  if (assunto.value.trim().length < 5) {
    erroAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
    if (isValid) assunto.focus();
    isValid = false;
  }

  const mensagem = document.querySelector('#mensagem');
  const erroMensagem = document.querySelector('#erro-mensagem');

  if (mensagem.value.trim().length === 0) {
    erroMensagem.innerHTML = 'A mensagem não pode ser vazia.';
    if (isValid) mensagem.focus();
    isValid = false;
  }

  if (isValid) {
    const submitButton = formulario.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    formulario.submit();
  }
});