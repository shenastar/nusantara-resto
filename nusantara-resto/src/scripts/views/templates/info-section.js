class InfoSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    let resto = JSON.parse(this.attributes.resto.value);
    this.className += 'detail__info';
    this.style.display = 'block';
    let categories = '';
    resto.categories.forEach((categorie) => {
      categories += `<a class="detail__categories" href="/#/search/categories/${categorie.name}">${categorie.name}</a>`;
    });
    this.innerHTML = `
    <h4>Name</h4>
    <p>${resto.name}</p>
    <h4>City</h4>
    <p>${resto.city}</p>
    <h4>Adress</h4>
    <p>${resto.address}</p>
    <h4>Rating</h4>
    <p>${resto.rating}</p>
    <h4>Categories</h4>
    <div class="categories__margin">${categories}</div>
    `;
  }
}

if (!customElements.get('info-section')) {
  customElements.define('info-section', InfoSection);
}
