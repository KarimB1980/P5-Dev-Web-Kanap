// Récupération de l'orderId dans l'url
function recupOrderId() {
    let urlcourante = document.location.href;
    let url = new URL(urlcourante);
    let id = url.searchParams.get("orderId");

    // Injection de l'orderId dans le DOM
    document.getElementById('orderId').innerHTML = id;
}

recupOrderId()

localStorage.removeItem("canapes");