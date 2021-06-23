import RestoDbSource from '../data/restodb-source';
import { createReviewerTemplate } from '../views/templates/template-creator';
import ReviewerInitiator from './reviewer-initiator';

const NewReviewer = {
  async init({ id, button }) {
    this._id = id;
    this._btnReview = button;
    this._btnReview.addEventListener('click', () => {
      this._btnClick();
    });
  },

  async _AddNewReview(newJson) {
    const newR = await RestoDbSource.inputReview(newJson);
    if (newR.message === 'success') {
      alert('Review berhasil ditambahkan');
      this._refreshReviewer(newR.customerReviews);
    } else {
      alert('Review gagal ditambahkan');
    }
  },

  _refreshReviewer(reviews) {
    ReviewerInitiator._refreshDiv(reviews);
  },

  _btnClick() {
    const name = document.querySelector('#inputName');
    const review = document.querySelector('#inputReview');
    if (name.value === '' || review.value === '') {
      alert('Nama dan review wajib diisi');
    } else {
      const newJson = {
        id: this._id,
        name: name.value,
        review: review.value,
      };
      this._AddNewReview(newJson);
    }
  },
};

export default NewReviewer;
