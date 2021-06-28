class ReviewSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="reviews" id="contentReviews"></div>
    <div class="reviews_foot">
        <button class="fa fa-angle-left"></button>
        <div id="indexSlide"> Oiw </div>
        <button class="fa fa-angle-right"></button>
    </div>
    <div class="reviews_input">
        <div class="reviews_title">
            <h2>Review Baru</h2>
        </div>
        <div class="reviews_form">
            <div class="form_input">
                <label><b>Nama</b></label>
                <input id="inputName" name="first" type="text">
            </div>
            <div class="form_input">
                <label class="reviews_subtitle"><b>Reviews</b></label>
                <textarea id="inputReview"></textarea>
            </div>
            <div>
                <button class="input_btn" id="btnReview">Kirim</button>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('review-section', ReviewSection);
