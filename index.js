//---------------------------------------------Adicionando componente no HTML--------------------

// function component() {
//   const element = document.createElement("div");
//   element.innerHTML = "Web Component";
//   return element;
// }
// document.body.appendChild(component());

//---------------- INCLUINDO API --------------//

const API_KEY = "5ecaba8ebcf0e1ffffcd7b46f62a5d32";

//-----------------------------------------------------Customs elements----------------------------

//Extendemos o HTMLElement para ter os ciclos de vida -  1º ConnectedCallback (nasce) | 2º disconnectedCallback (morre) | 3º atributeChangeCallback (evento) | 4º adopetCallback (movido de documento)
//Também podemos pegar elementos específicos como HTMLInputElement

class EntendendoLifeCicles extends HTMLElement {
  connectedCallback() {
    console.log("meu primeiro web component");
  }
  disconnectedCallback() {
    console.log("Elemento saiu");
  }
  //essa função pode receber
  attributeChangedCallback(current, old, value) {
    console.log("propriedade mudou", { old }, { current }, { value });
  }
  //static significa que é um método só da classe e não geral
  static get observedAttributes() {
    return ["exemplo"];
  }
}

class WidgetTime extends HTMLElement {
  connectedCallback() {
    //para usar esse método precisamos ter extendido o HTML, ele pode estar open ou close
    this.shadow = this.attachShadow({ mode: "open" });

    //constuindo o HTML do widget =  this.innerHTML, mas... estamos encapsulando o html do widget no shadow fazendo o style não pegar os elementos de fora da classe
    this.shadow.innerHTML = ` 
  <style>
    h1 {
     font-size:5em;
     padding:10px;
  }
    .app {
      width: 300px;
      color:#fff;
      margin:20vh auto;
      padding:50px;
      border-radius:5px;
      background-color:#FF5733;
      text-align:center;
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  }  
  </style>

  <div class='app'>

    <h1 id='temperatura'>0°</h1>
    <h2 id='descricao'>Loading...</h2>

  </div>
  
  `;
    //vem da propria api do browser
    this.getLocation();
  }

  getLocation() {
    //confere se o navegador tem suporte à geolocation e pede permissão ao usuário para acessar
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (data) => this.getWeather(data),
        (err) => console.log(err),
        { timeout: 20000 }
      );
    } else {
      alert("Geolocation não é suportado pelo browser");
    }
  }

  getWeather(data) {
    const URL_BASE = `https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid='5ecaba8ebcf0e1ffffcd7b46f62a5d32'`;

    fetch(URL_BASE)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
}

//registrando os customs components
customElements.define("first-component", EntendendoLifeCicles);
customElements.define("widget-component", WidgetTime);

//proxima aula: 8
