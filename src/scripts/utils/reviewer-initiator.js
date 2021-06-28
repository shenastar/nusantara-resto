/* eslint-disable no-restricted-globals */
import { createReviewerTemplate } from '../views/templates/template-creator';

const ReviewerInitiator = {
  async init({
    reviewerContainer, reviewer, nextButton, prevButton, indexSlide,
  }) {
    this._reviewerContainer = reviewerContainer;
    this._reviewer = reviewer;
    this._btnNext = nextButton;
    this._btnPrev = prevButton;
    this._indexSlide = indexSlide;
    this._windowed = true;
    this._renderReviewer();
    this._btnNext.addEventListener('click', () => {
      this._plusDivs();
      this._curDiv();
    });
    this._btnPrev.addEventListener('click', () => {
      this._minDivs();
      this._curDiv();
    });
  },

  _renderReviewer() {
    this._reviewerContainer.innerHTML = '';
    this._plusIndex = 0;
    this._minIndex = 0;
    this._reviewer.forEach((review) => {
      this._reviewerContainer.innerHTML += createReviewerTemplate(review);
    });
    this._auto();
  },

  _refreshDiv(reviewer) {
    clearTimeout(this._anim);
    this._reviewer = reviewer;
    this._renderReviewer();
  },

  _curDiv() {
    const slides = document.getElementsByClassName('mySlides');
    let curSlide = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].style.display == 'block') {
        curSlide = i + 1;
      }
    }
    this._indexSlide.innerHTML = `${curSlide}/${this._reviewer.length}`;
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
    let count;
    if (this._cekAppWidth()) {
      count = 3;
      const sisa = Math.abs(this._reviewer.length) % 3;
      if (index == this._reviewer.length && this._reviewer.length > 3) {
        count = sisa;
      } else {
        count = 3;
      }
    } else {
      count = 1;
    }
    return count;
  },

  _cekAppWidth() {
    const appWidth = window.matchMedia('(min-width: 650px)');
    if (appWidth.matches) {
      this._windowed = true;
    } else {
      this._windowed = false;
    }
    return appWidth.matches;
  },

  _auto() {
    this._plusDivs();
    this._curDiv();
    this._anim = setTimeout(() => {
      this._auto();
    }, 5000);
  },
};

window.addEventListener('resize', () => {
  const appWidth = window.matchMedia('(min-width: 650px)');
  if (appWidth.matches !== ReviewerInitiator._windowed) {
    ReviewerInitiator._refreshDiv(ReviewerInitiator._reviewer);
    ReviewerInitiator._cekAppWidth();
  }
});

export default ReviewerInitiator;
