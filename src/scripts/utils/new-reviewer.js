/* eslint-disable default-case */
import { Notyf } from 'notyf';
import RestoDbSource from '../data/restodb-source';
import ReviewerInitiator from './reviewer-initiator';

const NewReviewer = {
  async init({ id, button }) {
    this._id = id;
    this._btnReview = button;
    this._inputName = '';
    this._inputReview = '';
    this._btnReview.addEventListener('click', () => {
      this._btnClick();
    });
  },

  async _AddNewReview(newJson) {
    const newR = await RestoDbSource.inputReview(newJson);
    if (newR.message === 'success') {
      this._notification('success');
      this._refreshReviewer(newR.customerReviews);
    } else {
      this._notification('error');
    }
  },

  _refreshReviewer(reviews) {
    ReviewerInitiator._refreshDiv(reviews);
    this._inputName = '';
    this._inputReview = '';
  },

  _btnClick() {
    this._inputName = document.querySelector('#inputName');
    this._inputReview = document.querySelector('#inputReview');
    if (this._inputName.value === '' || this._inputReview.value === '') {
      this._notification('warning');
    } else {
      const newJson = {
        id: this._id,
        name: this._inputName.value,
        review: this._inputReview.value,
      };
      this._AddNewReview(newJson);
    }
  },

  _notification(cases) {
    const notyf = new Notyf({
      duration: 2000,
      position: {
        x: 'center',
        y: 'top',
      },
      types: [
        {
          type: 'warning',
          background: 'orange',
          duration: 2000,
          dismissible: true,
        },
      ],
    });

    switch (cases) {
      case 'success':
        notyf.success('Review berhasil ditambahkan');
        break;
      case 'error':
        notyf.error('Review gagal ditambahkan');
        break;
      case 'warning':
        notyf.open({
          type: 'warning',
          message: 'Nama dan review wajib diisi',
        });
        break;
    }
  },
};

export default NewReviewer;
