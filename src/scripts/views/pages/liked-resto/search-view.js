import { createRestoItemTemplate } from '../../templates/template-creator';

class FavoriteRestoSearchView {
  getTemplate() {
    return `
       <div class="contesnt">
       <input id="query" type="text">
       <h2 class="content__heading">Favorite Resto</h2>
           <div id="resto" class="resto">
                      
           </div>
       </div>
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showResto(resto) {
    this.showFavoriteResto(resto);
  }

  showFavoriteResto(resto = []) {
    let html;
    if (resto.length) {
      html = resto.reduce((carry, resto) => carry.concat(createRestoItemTemplate(resto)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('resto').innerHTML = html;

    document.getElementById('resto').dispatchEvent(new Event('resto:updated'));
  }

  _getEmptyRestoTemplate() {
    return '<div class="resto-item__not__found resto__not__found">Tidak ada resto untuk ditampilkan</div>';
  }
}

export default FavoriteRestoSearchView;