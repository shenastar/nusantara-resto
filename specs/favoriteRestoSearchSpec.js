import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-resto/search-presenter';
import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';

describe('Searching resto', () => {
  let presenter;
  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    document.body.innerHTML = `
        <div id="resto-search-container">
            <input id="query" type="text">
            <div class="resto-result-container">
                <ul class="resto">
                </ul>
            </div>
        </div>
        `;
  };

  const constructPresenter = () => {
    spyOn(FavoriteRestoIdb, 'searchResto');
    presenter = new FavoriteRestoSearchPresenter({
        favoriteResto: FavoriteRestoIdb,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    searchResto('resto a');
    expect(presenter.latestQuery).toEqual('resto a');
  });

  it('should ask the model to search for resto', () => {
    searchResto('resto a');
    expect(FavoriteRestoIdb.searchResto).toHaveBeenCalledWith('resto a');
  });

  it('should show the found resto', () => {
    presenter._showFoundResto([{ id: 1 }]);
    expect(document.querySelectorAll('.resto').length - 1).toEqual(1);
    presenter._showFoundResto([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
    expect(document.querySelectorAll('.resto').length - 1).toEqual(2);
  });

  it('should show the title of the found resto', () => {
    presenter._showFoundResto([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.resto__title').item(0).textContent).toEqual('Satu');
  });

  it('should show the title of the found resto', () => {
    presenter._showFoundResto([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.resto__title').item(0).textContent).toEqual('Satu');
    presenter._showFoundResto(
      [{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }],
    );
    const restoTitles = document.querySelectorAll('.resto__title');
    expect(restoTitles.item(0).textContent).toEqual('Satu');
    expect(restoTitles.item(1).textContent).toEqual('Dua');
  });

  it('should show - for found resto without title', () => {
    presenter._showFoundResto([{ id: 1 }]);
    expect(document.querySelectorAll('.resto__title').item(0).textContent)
    .toEqual('-');
  });
});