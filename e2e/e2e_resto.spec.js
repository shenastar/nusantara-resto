/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Resto');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked resto', ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('liking one resto', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
  I.amOnPage('/');
  I.seeElement('.resto-item__title');
  const firstResto = locate('.resto-item__title').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.seeElement('.resto-item__title');
  const likedRestoTitle = await I.grabTextFrom('.resto-item__title');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('unliking one resto', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
  I.amOnPage('/');
  I.seeElement('.resto-item__title');
  const firstResto = locate('.resto-item__title').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.seeElement('.resto-item__title');
  const likedRestoTitle = await I.grabTextFrom('.resto-item__title');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
  I.click(likedRestoTitle);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Feature('Review Resto');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('new review one resto', async ({ I }) => {
  I.seeElement('.resto-item__title');
  const firstResto = locate('.resto-item__title').first();
  I.click(firstResto);
  const name = 'test-name';
  const review = 'test-review';
  I.fillField('#inputName', name);
  I.fillField('#inputReview', review);
  I.click('#btnReview');
  I.see('Review berhasil ditambahkan', '.notyf-announcer');
});

Feature('Search Resto');

Before(({ I }) => {
  I.amOnPage('/');
  I.seeElement('.resto-item__title');
  const firstResto = locate('.resto-item__title').first();
  I.click(firstResto);
});

Scenario('Search one resto by Categories', async ({ I }) => {
  I.seeElement('.detail__categories');
  const firstCategories = await I.grabTextFrom('.detail__categories');
  I.click(firstCategories);
  I.seeElement('.resto-item__title');
  const firstSearchResto = locate('.resto-item__title').first();
  I.click(firstSearchResto);
  I.seeElement('.detail__categories');
  const firstSearchCategories = await I.grabTextFrom('.detail__categories');
  assert.strictEqual(firstCategories, firstSearchCategories);
});

Scenario('Search one resto by Foods', async ({ I }) => {
  I.seeElement('.food_name');
  const firstFood = locate('.food_name').first();
  const foodName = await I.grabTextFrom(firstFood);
  I.click(foodName);
  I.seeElement('.resto-item__title');
  const firstSearchResto = locate('.resto-item__title').first();
  I.click(firstSearchResto);
  I.seeElement('.food_name');
  const firstSearchFood = await I.grabTextFrom('.food_name');
  assert.strictEqual(foodName, firstSearchFood);
});
