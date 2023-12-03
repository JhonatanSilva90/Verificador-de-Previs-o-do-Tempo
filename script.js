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
}
