import { LitElement, html } from 'lit';

class MenusFood extends LitElement {
  constructor() {
    super();
    // this.classList.add('menu_list');
    this.foods = [];
  }

  static get properties() {
    return {
      foods: { type: Array },
    };
  }

  createRenderRoot() {
    return this;
  }

  render() {
    console.log(this.foods);
    return html`
      ${this.foods.map((food) => html`
        <div><a href="/#/search/food/${food.name}">${food.name}</a></div>
      `)}
    `;
  }
}

customElements.define('menus-food', MenusFood);

export default MenusFood;
