const serverUrl = 'https://app-luischaverra.herokuapp.com/'
const itemsPath = 'items/';
const imagesPath = 'imagenes/';

window.onload = getData();

const items = document.querySelector('.items');

function getData() {
  fetch(`${serverUrl}${itemsPath}`)
    .then((res) => res.json())
    .then((data) => printData(data));
}

function printData(data) {
  
let itemContainer = document.createElement('div');
  itemContainer.className = 'card-deck';
  const cardsContainer = document.getElementById("cardsContainer")
  let cardDeks = [];
  let itemsREndered = 0;
  data.forEach((item) => {
    let htmlChild =  createDomElement(item)
    itemContainer.innerHTML += htmlChild
    itemsREndered +=1
    if(itemsREndered == 3){
      itemContainer.innerHTML += "<hr/>" 
      cardDeks.push(itemContainer)
      itemContainer = document.createElement('div');
      itemContainer.className = 'card-deck';
      itemsREndered = 0;
    }
  //  itemContainer.append(itemContainer)
    //items.append(itemContainer);
  //  cardsContainer.innerHTML += createDomElement(item);
  });

  cardDeks.forEach(cardDecks => {
    document.getElementById("cardsContainer").appendChild(cardDecks)
  })
  
}

function createDomElement(item) {
  const itemHtml = `
  <div class="item card" data-id=${item._id}>
  <img src=${serverUrl}${imagesPath}${item.image} class="card-img-top item-image" alt="La imagen no está disponible">
  <div class="card-body">
    <h5 class="card-title item-title">${item.title}</h5>
    <p class="card-text item-price"><small class="text-muted">${item.price}</small></p>
    <button class="item-button btn btn btn-danger addToCart">Añadir al Pedido</button>
  </div>
</div>`;
  return itemHtml;
}


const btnComprar = document.getElementById("btnComprar")

btnComprar.addEventListener('click', async e => {
  const formCompra = document.getElementById("formCompra");
  const dataForm = new FormData(formCompra);
  
  let  data = {}
  dataForm.forEach((value,key) => {
      data[key] = value
  })

  const response  = await fetch("https://app-luischaverra.herokuapp.com/orders/", {
    method: 'POST',
    headers:{
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

    const r =  await response.json();
      console.log(r)

  alert("Compra completada")

})
