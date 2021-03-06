class MenusDrink extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    let drinks = JSON.parse(this.attributes.drinks.value);
    this.className = 'menu_content';
    this.style.display = 'block';
    let list = '';
    drinks.forEach((drink) => {
      list += `<div><a class="drink_name" href="/#/search/drinks/${drink.name}">${drink.name}</a></div>`;
    });
    this.innerHTML = `
    <div class="par-heading">
        <span class="menu_subhead">Minuman</span>
    </div>
    <div class="menu_list">${list}</div>
    `;
  }
}

if (!customElements.get('menus-drink')) {
  customElements.define('menus-drink', MenusDrink);
}
