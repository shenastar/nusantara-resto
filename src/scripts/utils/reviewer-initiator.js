/* eslint-disable no-restricted-globals */
import { createReviewerTemplate } from '../views/templates/template-creator';

const ReviewerInitiator = {
  async init({ reviewerContainer, reviewer }) {
    this._reviewerContainer = reviewerContainer;
    this._reviewer = reviewer;

    this._plusIndex = 0;
    this._minIndex = 0;
    this._renderReviewer();
    this._auto();
  },

  _renderReviewer() {
    this._reviewer.forEach((review) => {
      this._reviewerContainer.innerHTML += createReviewerTemplate(review);
    });
  },

  _plusDivs() {
    const slides = this._hideReviewer();
    this._minIndex = this._plusIndex - 1;
    const loop = this._countLoop(this._plusIndex);
    for (let i = 0; i < loop; i++) {
      if (this._plusIndex >= slides.length) {
        this._plusIndex = 0;
        if (i == 0) {
          this._plusDivs();
        }
        return;
      }
      console.log(this._plusIndex);
      slides[this._plusIndex].style.display = 'block';
      this._plusIndex++;
    }
  },

  _minDivs() {
    const slides = this._hideReviewer();
    this._plusIndex = this._minIndex + 1;
    let loop;
    if (this._minIndex < 0) {
      this._minIndex = slides.length - 1;
      loop = this._countLoop(this._minIndex + 1);
    } else {
      loop = this._countLoop(3);
    }
    for (let i = 0; i < loop; i++) {
      console.log(this._minIndex);
      slides[this._minIndex].style.display = 'block';
      this._minIndex--;
    }
  },

  _hideReviewer() {
    const slides = document.getElementsByClassName('mySlides');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    return slides;
  },

  _countLoop(index) {
    if (screen.width > 500) {
      const sisa = Math.abs(index) % 3;
      if (sisa == 0) {
        return 3;
      }
      return sisa;
    }
    return 1;
  },

  _auto() {
    this._plusDivs();
    setTimeout(this._auto, 5000);
  },
};

export default ReviewerInitiator;
