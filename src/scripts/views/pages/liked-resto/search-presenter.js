class FavoriteRestoSearchPresenter {
  constructor({ favoriteResto }) {
    this._listenToSearchRequestByUser();
    this._favoriteResto = favoriteResto;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
        this._searchResto(event.target.value);
    });
  }

  _searchResto(latestQuery) {
    this._latestQuery = latestQuery;
    this._favoriteResto.searchResto(this.latestQuery);
  }

  _showFoundResto(resto) {
    const html = resto.reduce(
      (carry, resto) => carry.concat(`<li class="resto"><span class="resto__title">${resto.title || '-'}</span></li>`), '',
    );

    document.querySelector('.resto').innerHTML = html;
  }
 
  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestoSearchPresenter;