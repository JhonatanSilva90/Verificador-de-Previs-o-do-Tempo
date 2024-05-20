// Função para criar os elementos HTML dinâmicamente
function criarElementos() {
  // Criação dos elementos
  let divMain = document.createElement("div");
  divMain.id = "box-main";

  let titulo = document.createElement("h1");
  titulo.id = "titulo";
  titulo.textContent = "Verificar Temperatura";

  let inputCidade = document.createElement("input");
  inputCidade.id = "input-cidade";
  inputCidade.type = "text";
  inputCidade.placeholder = "Digite a cidade";

  let buttonBuscar = document.createElement("button");
  buttonBuscar.id = "button-buscar";
  buttonBuscar.onclick = pesquisar;

  let imgBuscar = document.createElement("img");
  imgBuscar.src = "https://www.svgrepo.com/show/488200/find.svg";
  imgBuscar.alt = "lupa-buscar";
  imgBuscar.id = "image-buscar";

  let informacaoCidade = document.createElement("div");
  informacaoCidade.id = "informacao-cidade";

  let h2Cidade = document.createElement("h2");
  h2Cidade.id = "cidade";

  let pTemperatura = document.createElement("p");
  pTemperatura.id = "temperatura";

  let divInformacoesTempo = document.createElement("div");
  divInformacoesTempo.id = "informacoes-tempo";

  let pTempo = document.createElement("p");
  pTempo.id = "tempo";

  let pUmidade = document.createElement("p");
  pUmidade.id = "umidade";

  // Montagem da estrutura dos elementos
  buttonBuscar.appendChild(imgBuscar);

  divMain.appendChild(titulo);
  divMain.appendChild(inputCidade);
  divMain.appendChild(buttonBuscar);
  divMain.appendChild(informacaoCidade);

  informacaoCidade.appendChild(h2Cidade);
  informacaoCidade.appendChild(pTemperatura);
  informacaoCidade.appendChild(divInformacoesTempo);
  informacaoCidade.appendChild(pUmidade);

  divInformacoesTempo.appendChild(pTempo);

  // Adicionando o elemento divMain ao corpo do documento
  document.body.appendChild(divMain);
  // ----------------------------
  // Adicionando um ouvinte de evento para lidar com a tecla "Enter" pressionada no input
  document
    .getElementById("input-cidade")
    .addEventListener("keypress", function (event) {
      // Verifica se a tecla pressionada é "Enter"
      if (event.key === "Enter") {
        pesquisar();
      }
    });
}

// Chama a função para criar os elementos quando a página é carregada
window.onload = function () {
  criarElementos();
};

//Chave do servidor
const key = "abaf8faaca83e783568de335ed462db3";

//Função que vai colocar os dados na tela
function colocarDadosTela(dados) {
  console.log(dados);
  document.getElementById("cidade").innerHTML = "Tempo em " + dados.name;
  document.getElementById("temperatura").innerHTML =
    Math.floor(dados.main.temp) + "°C"; //Math.floor serve para arredondar os dados
  document.getElementById("tempo").innerHTML = dados.weather[0].description;
  document.getElementById(
    "umidade"
  ).innerHTML = `Umidade ${dados.main.humidity}%`;

  // Criando uma img dentro da div com id "informacoes-tempo" através do JS
  let imgTempo = document.createElement("img");
  imgTempo.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
  imgTempo.id = "imgTempo";
  const imgT = document.getElementById("imgTempo");
  const informacoesTempo = document.getElementById("informacoes-tempo");
  if (imgT) {
    imgT.remove();
  }
  informacoesTempo.appendChild(imgTempo);
}

//Função buscar a cidade no servidor(API)
async function buscarCidade(cidade) {
  const dados = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
  ).then((res) => res.json());

  colocarDadosTela(dados);
}

//Função capturar o que está no input
function pesquisar() {
  const cidade = document.getElementById("input-cidade").value;

  buscarCidade(cidade);

  // Adiciona um ouvinte de evento para lidar com o clique no botão de busca
  document.getElementById("button-buscar").addEventListener("click", pesquisar);
}

// // Adicionando o footer via JS

// Criando os elementos do footer
const footer = document.createElement("footer");

// Criando o contêiner interno
const footerContainer = document.createElement("div");
footerContainer.classList.add("footer"); // Adicionando classe para estilização

// Criando logo
const logo = document.createElement("a");
logo.classList.add("logo-footer");
logo.href = ""; // Definir href se necessário

// Criando spans separados para JH e Developer
const spanJH = document.createElement("span");
spanJH.classList.add("logo-footer");
spanJH.innerText = "JH";

const spanDeveloper = document.createElement("span");
spanDeveloper.classList.add("logo-footer");
spanDeveloper.innerText = "Developer";

// Adicionando spans ao âncora do logo
logo.appendChild(spanJH);
logo.appendChild(spanDeveloper);

// Criando seção de direitos reservados
const reserved = document.createElement("div");
reserved.classList.add("reserved");
const reservedText = document.createElement("p");
reservedText.innerText = "© 2024 JHDeveloper. Todos os direitos reservados.";
reserved.appendChild(reservedText);

// Criando contêiner de links sociais
const link = document.createElement("div");
link.classList.add("links-footer");

// Criando link do Linkedin
const linkedinLink = document.createElement("a");
linkedinLink.href = "https://www.linkedin.com/in/jhonatan-silva-834773292";
const linkedinImg = document.createElement("img");
linkedinImg.src = "./images/linkedin.png";
linkedinImg.alt = "LinkedIn";
linkedinLink.appendChild(linkedinImg);

// Criando link do Github
const githubLink = document.createElement("a");
githubLink.href = "https://github.com/JhonatanSilva90";
const githubImg = document.createElement("img");
githubImg.src = "./images/github.png";
githubImg.alt = "GitHub";
githubLink.appendChild(githubImg);

// Adicionando elementos aos seus contêineres
link.appendChild(linkedinLink);
link.appendChild(githubLink);
footerContainer.appendChild(logo);
footerContainer.appendChild(reserved);
footerContainer.appendChild(link);

// Adicionando contêiner ao footer
footer.appendChild(footerContainer);

// Adicionando footer ao corpo
document.body.appendChild(footer);
