class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="footer__copry">
        <div class="container"><small>Copyright © NmkzShin 2021</small></div>
    </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
