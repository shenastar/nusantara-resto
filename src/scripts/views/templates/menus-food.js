class MenusFood extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    let foods = JSON.parse(this.attributes.foods.value);
    this.className = 'menu_content';
    this.style.display = 'block';
    let list = '';
    foods.forEach((food) => {
      list += `<div><a href="/#/search/foods/${food.name}">${food.name}</a></div>`;
    });
    this.innerHTML = `
    <div class="par-heading">
        <span class="menu_subhead">Makanan</span>
    </div>
    <div class="menu_list">${list}</div>
    `;
  }
}

customElements.define('menus-food', MenusFood);