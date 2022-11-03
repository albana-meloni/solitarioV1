/* // constantes y tipos
let mazo = [];
let barajado = [];
let pilas = [];
let primeraCartaClick = null;

const colores = {
  corazones: "rojo",
  diamante: "rojo",
  pica: "negro",
  trebol: "negro"
}
const tipos = ["corazones", "diamante", "pica", "trebol"];


// elementos HTML
const empezarJuego = document.querySelector("#empezarBtn");
const pilaInicial = document.querySelector("#pila-inicial");



// funciones
const crearMazo = () => {
  for (let i = 1; i <= 13; i++) {
    for (let x = 0; x < tipos.length; x++) {
      const carta = {
        numero: i,
        color: colores[tipos[x]],
        tipo: tipos[x],
        img: `./img/${tipos[x]}_${i}.gif`,
        dorso: true
      }
      mazo.push(carta);
    }
  }
}

const barajarMazo = () => {
  barajado = mazo.map(carta => ({carta, sort: Math.random()}))
  .sort((a, b) => a.sort - b.sort)
  . map(({carta}) => carta)
}

const servir = () => {
  for (let i = 0; i < 7; i++) {
    pilas.push([]);
    for (let x = 0; x < i + 1; x++) {
      const primeraCartaBarajado = barajado[0];
      barajado.shift();
      pilas[i].push(primeraCartaBarajado);
    }
  }
}

const crearCartaHTML = (carta) => {
  const cartaHTML = document.createElement("div");
  const imagen = document.createElement("img");

  if (carta.dorso) {
    imagen.src = "./img/dorso.jpg";
  } else {
    imagen.src = carta.img;
  }
  cartaHTML.dataset.numero = carta.numero;
  cartaHTML.dataset.color = carta.color;
  cartaHTML.dataset.tipo = carta.tipo;
  
  cartaHTML.classList.add("carta");
  cartaHTML.appendChild(imagen);
  cartaHTML.onclick = () => {
    comprobrarClick(cartaHTML)
  }
  return cartaHTML;
}

const ponerCartaPIlaInicial = () => {
  for (let i = 0; i < barajado.length; i++) {
    const carta = barajado[i];
    const cartaHTML = crearCartaHTML(carta);
    pilaInicial.appendChild(cartaHTML);
  }
}

const ponerCartaPilas = () => {
  for (let i = 0; i < pilas.length; i++) {
    const pila = document.querySelector(`#pila-${i}`);
    pila.innerHTML = "";
    for (let x = 0; x < pilas[i].length; x++) {
      const ultimaCartaPila = x === pilas[i].length - 1;
      const carta = pilas[i][x];

      if (ultimaCartaPila) {
        carta.dorso = false;
      }
      const cartaHTML = crearCartaHTML(carta);
      cartaHTML.dataset.pila = i;
      cartaHTML.style.top = `${x * 30}px`;
      pila.appendChild(cartaHTML);
    }
  }
}

const comprobrarClick = (carta) => {
  if (primeraCartaClick) {
    const segundaCartaClick = carta;

    if (primeraCartaClick.dataset.numero == segundaCartaClick.dataset.numero - 1 && primeraCartaClick.dataset.color !== segundaCartaClick.dataset.color) {
      const pilaPrimeraCarta = pilas[Number(primeraCartaClick.dataset.pila)];
      const pilaSegundaCarta = pilas[Number(segundaCartaClick.dataset.pila)];

      const primeraCartaObj = pilaPrimeraCarta.pop();
      pilaSegundaCarta.push(primeraCartaObj);

      ponerCartaPilas();
    } else {
      alert("noo");
    }
  } else {
    primeraCartaClick = carta;
    carta.style.boxShadow = "0 0 0 7px blue";
  }
}


empezarJuego.onclick = () => {
  mazo = []
  barajado = []
  pilas = []

  crearMazo()
  barajarMazo()
  servir()
  ponerCartaPilas()
  ponerCartaPIlaInicial()

} */
// HTML elements
const botonEmpezarJuego = document.querySelector("#empezarBtn");
const pilaInicial = document.querySelector("#pila-inicial");
const cartaMazo = document.querySelector(".carta-mazo");
const seleccionada = document.querySelector("#seleccionada");

// Constantes
const tipos = ["corazones", "diamante", "pica", "trebol"];
const colores = {
  corazones: "rojo",
  diamante: "rojo",
  pica: "negro",
  trebol: "negro",
};

// Datos
let mazo = [];
let barajado = [];
let pilas = [];
let cartasServidas = [];
let cartasAComprobar = [];
let casas = [[], [], [], []];

//  ---------- TABLERO INICIAL -----------

let carta = {
  estaDadaVuelta: true
};

const crearMazo = () => {
  mazo = [];
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < tipos.length; j++) {
      carta = {
        numero: i,
        tipo: tipos[j],
        color: colores[tipos[j]],
        estaDadaVuelta: true,
        img: `${tipos[j]}_${i}`,
        id: i * j,
      };
      mazo.push(carta);
    }
  }
};

const barajar = () => {
  barajado = mazo
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const servir = () => {
  pilas = [];
  for (let i = 1; i < 8; i++) {
    pilas.push([]);
    for (let j = 0; j < i; j++) {
      if (j === i - 1) {
        barajado[0].estaDadaVuelta = false;
      }
      pilas[i - 1].push(barajado[0]);
      barajado.shift();
    }
  }
  ponerCartasEnLaPilaInicial();
  ponerCartasEnLasPilas();

};

const ponerCartasEnLaPilaInicial = () => {
  while (seleccionada.firstChild) {
    seleccionada.removeChild(seleccionada.firstChild);
  }
  while (pilaInicial.firstChild) {
    pilaInicial.removeChild(pilaInicial.firstChild);
  }

  for (let i = 0; i < barajado.length; i++) {
    pilaInicial.appendChild(crearCarta(barajado[i]));
  }
};

const ponerCartasEnLasPilas = () => {
  for (let i = 0; i < pilas.length; i++) {
    const div = document.querySelector(`#pila-${i}`);
    div.innerHTML = "";
    for (let j = 0; j < pilas[i].length; j++) {
      const esLacartaSeleccionada = j === pilas[i].length - 1;
      if (esLacartaSeleccionada) {
        pilas[i][j].estaDadaVuelta = false;
      }
      const carta = crearCarta(pilas[i][j]);
      carta.style.top = `${j * 30}px`;
      carta.dataset.pila = i;
      div.appendChild(carta);
    }
  }
};

const ponerCartasEnLasCasas = () => {
  for (let i = 0; i < casas.length; i++) {
    const div = document.querySelector(`#casa-${i}`);
    div.innerHTML = "";
    for (let j = 0; j < casas[i].length; j++) {
      const carta = crearCarta(casas[i][j]);
      carta.dataset.pila = null;
      carta.dataset.casa = `casa-${i}`;
      div.appendChild(carta);
    }
  }
};

const crearCarta = (carta) => {
  const cartaHTML = document.createElement("div");
  const imagen = document.createElement("img");
  if (carta.estaDadaVuelta) {
    imagen.src = `img/dorso.gif`;
  } else {
    imagen.src = `img/${carta.img}.gif`;
  }
  cartaHTML.dataset.numero = carta.numero;
  cartaHTML.dataset.tipo = carta.tipo;
  cartaHTML.dataset.color = carta.color;
  cartaHTML.dataset.id = carta.id;
  cartaHTML.dataset.img = carta.img;
  cartaHTML.dataset.pila = carta.pila || "barajado";
  cartaHTML.classList.add("carta");
  cartaHTML.appendChild(imagen);
  cartaHTML.onclick = (e) => {
    e.stopPropagation();
    comprobarClickEnCarta(cartaHTML);
  };
  return cartaHTML;
};

const asignarClickEnMazo = () => {
  cartaMazo.onclick = () => {
    const cartaSeleccionada = barajado.pop();
    const eslaUltimaDelMazo = !barajado.length;
    if (!!cartaSeleccionada && !eslaUltimaDelMazo) {
      cartaSeleccionada.estaDadaVuelta = false;
      cartaMazo.children[0].style.display = "block";
      /* pilaInicial.style.display = "block"; */
      seleccionada.appendChild(crearCarta(cartaSeleccionada));
      cartasServidas.unshift(cartaSeleccionada);
    } else if (!!cartaSeleccionada && eslaUltimaDelMazo) {
      cartaSeleccionada.estaDadaVuelta = false;
      cartaMazo.children[0].style.display = "none";
      pilaInicial.style.display = "none";
      seleccionada.appendChild(crearCarta(cartaSeleccionada));
      cartasServidas.unshift(cartaSeleccionada);
    } else {
      barajado = [...cartasServidas];
      cartasServidas = [];
      cartaMazo.children[0].style.display = "block";
      ponerCartasEnLaPilaInicial();
      /* pilaInicial.style.display = "block"; */
    }
  };
};

const asignarClickEnPilas = () => {
  for (let i = 0; i < 7; i++) {
    const pila = document.querySelector(`#pila-${i}`);
    pila.onclick = (e) => {
      e.stopPropagation();
      comprobarClickEnPilaVacia(i);
    };
  }
};

const asignarClickEnCasas = () => {
  for (let i = 0; i < 4; i++) {
    const casa = document.querySelector(`#casa-${i}`);
    casa.onclick = (e) => {
      comprobarClickEnCasaVacia(i);
    };
  }
};

const limpiarCasasHTML = () => {
  for (let i = 0; i < casas.length; i++) {
    const div = document.querySelector(`#casa-${i}`);
    div.innerHTML = "";
  }
};

botonEmpezarJuego.onclick = () => {
  mazo = [];
  barajado = [];
  pilas = [];
  cartasServidas = [];
  cartasAComprobar = [];
  casas = [[], [], [], []];
  seleccionada.innerHTML = "";
  seleccionada.innerHTML = "";

  crearMazo();
  barajar();
  servir();
  asignarClickEnMazo();
  asignarClickEnPilas();
  asignarClickEnCasas();
  limpiarCasasHTML();
};
//  ---------- JUEGO -----------

// Chequeo de reglas

const sePuedeMoverACasaConCartas = (carta, primeraCartaCliqueada) => {
  return (
    carta.dataset.numero == primeraCartaCliqueada.dataset.numero - 1 &&
    carta.dataset.tipo == primeraCartaCliqueada.dataset.tipo
  );
};

const sePuedeMoverAPilaVacia = (carta) => {
  return carta.dataset.numero == 13;
};

const sePuedeMoverACasaVacia = (casaAMoverLaCarta, primeraCartaCliqueada) => {
  return !casaAMoverLaCarta.length && primeraCartaCliqueada.dataset.numero == 1;
};

const esMovimientoValido = (cartaCliqueada, primeraCartaCliqueada) => {
  return (
    Number(cartaCliqueada.dataset.numero) ==
      Number(primeraCartaCliqueada.dataset.numero) + 1 &&
    cartaCliqueada.dataset.color !== primeraCartaCliqueada.dataset.color
  );
};

// Comprobar clicks en distintos elementos

const comprobarClickEnCasaVacia = (indexCasa) => {
  const primeraCartaCliqueada = cartasAComprobar[0];
  const casaAMoverLaCarta = casas[indexCasa];
  if (primeraCartaCliqueada) {
    if (sePuedeMoverACasaVacia(casaAMoverLaCarta, primeraCartaCliqueada)) {
      const estaEnElMazo = isNaN(Number(primeraCartaCliqueada.dataset.pila));
      if (estaEnElMazo) {
        sacarCartaDelMazo(primeraCartaCliqueada);
        const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
          primeraCartaCliqueada,
          `casa-${indexCasa}`
        );
        casaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);
      } else {
        const pilaDeLaPrimeraCartaCliqueada =
          pilas[Number(primeraCartaCliqueada.dataset.pila)];

        pilaDeLaPrimeraCartaCliqueada.pop();
        const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
          primeraCartaCliqueada,
          `casa-${indexCasa}`
        );
        casaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);
      }
      ponerCartasEnLasPilas();
      ponerCartasEnLasCasas();
      limpiarCartasSeleccionadas(null, primeraCartaCliqueada);
    }
  }
};

const comprobarClickEnCasa = (indexCasa, carta) => {
  const primeraCartaCliqueada = cartasAComprobar[0];
  const casaAMoverLaCarta = casas[indexCasa];
  if (primeraCartaCliqueada) {
    ultimoElementoEnCasa = casaAMoverLaCarta[casaAMoverLaCarta.length - 1];
    if (sePuedeMoverACasaConCartas(carta, primeraCartaCliqueada)) {
      const estaEnElMazo = isNaN(Number(primeraCartaCliqueada.dataset.pila));
      if (estaEnElMazo) {
        sacarCartaDelMazo(primeraCartaCliqueada);
        const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
          primeraCartaCliqueada,
          `casa-${indexCasa}`
        );
        casaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);
      } else {
        const pilaDeLaPrimeraCartaCliqueada =
          pilas[Number(primeraCartaCliqueada.dataset.pila)];

        pilaDeLaPrimeraCartaCliqueada.pop();
        const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
          primeraCartaCliqueada,
          `casa-${indexCasa}`
        );
        casaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);
      }
      ponerCartasEnLasPilas();
      ponerCartasEnLasCasas();
      limpiarCartasSeleccionadas(carta, primeraCartaCliqueada);
    }
  }
};

const comprobarClickEnPilasConCartas = (
  cartaCliqueada,
  primeraCartaCliqueada
) => {
  const estaEnElMazo = isNaN(Number(primeraCartaCliqueada.dataset.pila));
  const pilaAMoverLaCarta = pilas[Number(cartaCliqueada.dataset.pila)];

  if (estaEnElMazo) {
    sacarCartaDelMazo(primeraCartaCliqueada);
    const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
      primeraCartaCliqueada,
      pilaAMoverLaCarta
    );
    pilaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);
  } else {
    const hermanos = obtenerHermanos(primeraCartaCliqueada);
    const pilaDeLaPrimeraCartaCliqueada =
      pilas[Number(primeraCartaCliqueada.dataset.pila)];

    pilaDeLaPrimeraCartaCliqueada.pop();
    const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
      primeraCartaCliqueada,
      pilaAMoverLaCarta
    );
    pilaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);

    if (hermanos.length) {
      for (let i = 0; i < hermanos.length; i++) {
        pilaDeLaPrimeraCartaCliqueada.pop();
        const cartaHermanaObjeto = crearCartaDesdeHTML(
          hermanos[i],
          pilaDeLaPrimeraCartaCliqueada
        );
        pilaAMoverLaCarta.push(cartaHermanaObjeto);
      }
    }
  }
  ponerCartasEnLasPilas();
  limpiarCartasSeleccionadas(cartaCliqueada, primeraCartaCliqueada);
};

const comprobarClickEnPilaVacia = (indexPila) => {
  const primeraCartaCliqueada = cartasAComprobar[0];
  const pilaAMoverLaCarta = pilas[indexPila];
  if (primeraCartaCliqueada) {
    if (sePuedeMoverAPilaVacia(primeraCartaCliqueada)) {
      const estaEnElMazo = isNaN(Number(primeraCartaCliqueada.dataset.pila));
      if (estaEnElMazo) {
        sacarCartaDelMazo(primeraCartaCliqueada);
        const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
          primeraCartaCliqueada,
          pilaAMoverLaCarta
        );
        pilaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);
      } else {
        const hermanos = obtenerHermanos(primeraCartaCliqueada);
        const pilaDeLaPrimeraCartaCliqueada =
          pilas[Number(primeraCartaCliqueada.dataset.pila)];
        pilaDeLaPrimeraCartaCliqueada.pop();
        const primeraCartaCliqueadaObjeto = crearCartaDesdeHTML(
          primeraCartaCliqueada,
          pilaAMoverLaCarta
        );
        pilaAMoverLaCarta.push(primeraCartaCliqueadaObjeto);
        if (hermanos.length) {
          for (let i = 0; i < hermanos.length; i++) {
            pilaDeLaPrimeraCartaCliqueada.pop();
            const cartaHermanaObjeto = crearCartaDesdeHTML(
              hermanos[i],
              pilaDeLaPrimeraCartaCliqueada
            );
            pilaAMoverLaCarta.push(cartaHermanaObjeto);
          }
        }
      }
      ponerCartasEnLasPilas();
      limpiarCartasSeleccionadas(null, primeraCartaCliqueada);
    }
  }
};

const comprobarClickEnCarta = (cartaCliqueada) => {
  if (cartasAComprobar.length) {
    const primeraCartaCliqueada = cartasAComprobar[0];
    if (primeraCartaCliqueada.dataset.casa) {
      limpiarCartasSeleccionadas(cartaCliqueada, primeraCartaCliqueada);
      return;
    }
    if (cartaCliqueada.dataset.casa) {
      comprobarClickEnCasa(
        cartaCliqueada.dataset.casa.split("-")[1],
        cartaCliqueada
      );
    } else if (esMovimientoValido(cartaCliqueada, primeraCartaCliqueada)) {
      comprobarClickEnPilasConCartas(cartaCliqueada, primeraCartaCliqueada);
    }
    limpiarCartasSeleccionadas(cartaCliqueada, primeraCartaCliqueada);
  } else {
    cartaCliqueada.style.boxShadow = "0 0 0 7px blue";
    cartasAComprobar.push(cartaCliqueada);
  }
};

// Auxiliares

const obtenerHermanos = (elem) => {
  const sibs = [];
  while ((elem = elem.nextSibling)) {
    if (elem.nodeType === 3) continue; // nodo de texto
    sibs.push(elem);
  }
  return sibs;
};

const limpiarCartasSeleccionadas = (cartaCliqueada, primeraCartaCliqueada) => {
  if (cartaCliqueada) {
    cartaCliqueada.style.boxShadow = "0 0 0 5px rgba(55, 55, 55, 0.5)";
  }
  if (primeraCartaCliqueada) {
    primeraCartaCliqueada.style.boxShadow = "0 0 0 5px rgba(55, 55, 55, 0.5)";
  }
  cartasAComprobar = [];
};

const sacarCartaDelMazo = (primeraCartaCliqueada) => {
  cartasServidas.shift();
  seleccionada.removeChild(primeraCartaCliqueada);
};

const crearCartaDesdeHTML = (carta, pila) => {
  return {
    numero: carta.dataset.numero,
    id: carta.dataset.id,
    color: carta.dataset.color,
    pila: pila,
    tipo: carta.dataset.tipo,
    img: carta.dataset.img,
    estaDadaVuelta: false,
  };
};

const sacarCartaDeSuPila = (carta, pila) => {
  pila[Number(carta.dataset.pila)].pop();
};