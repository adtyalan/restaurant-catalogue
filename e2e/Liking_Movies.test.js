/* eslint-disable no-undef */
const assert = require('assert');
Feature('Liking Restos');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  // Verifikasi bahwa halaman favorit telah dimuat
  I.seeElement('#favorite-page'); // Pastikan div dengan ID favorite-page ada

  // Periksa elemen kosong saat tidak ada restoran favorit
  I.seeElement('.no-fav'); // Pastikan elemen dengan kelas no-fav ada
  I.seeElement('.h1-size-p'); // Verifikasi ikon atau elemen lain di dalam .no-fav
  I.see('Your favs resto will appear here', '.no-fav p'); // Verifikasi teks yang muncul
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Your favs resto will appear here', '.no-fav p'); // Verifikasi teks yang muncul
  I.amOnPage('/');

  I.seeElement('.childCard a');
  const firstRestoTitle = await I.grabTextFrom('.childCard h3');
  I.click(locate('.childCard a').first());

  I.seeElement('#btn-fav-resto');
  I.click('#btn-fav-resto');

  I.amOnPage('/#/favorite');
  I.seeElement('.childCard');
  const likedRestoTitle = await I.grabTextFrom('.childCard h3');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Your favs resto will appear here', '.no-fav p'); // Verifikasi teks yang muncul
  I.amOnPage('/');

  I.seeElement('.childCard a');
  const firstRestoTitle = await I.grabTextFrom('.childCard h3');
  I.click(locate('.childCard a').first());

  I.seeElement('#btn-fav-resto');
  I.click('#btn-fav-resto');

  I.amOnPage('/#/favorite');
  I.seeElement('.childCard');
  const likedRestoTitle = await I.grabTextFrom('.childCard h3');
  assert.strictEqual(firstRestoTitle, likedRestoTitle);

  I.seeElement('.childCard a');
  I.click(locate('.childCard a').first());

  I.seeElement('#btn-fav-resto');
  I.click('#btn-fav-resto');

  I.amOnPage('/#/favorite');
  I.see('Your favs resto will appear here', '.no-fav p'); // Verifikasi teks yang muncul
});

Scenario('add review to restaurant', async ({ I }) => {
  I.see('Your favs resto will appear here', '.no-fav p'); // Verifikasi teks yang muncul
  I.amOnPage('/');

  I.seeElement('.childCard a');
  I.click(locate('.childCard a').first());

  I.seeElement('.form-add-review');
  I.fillField('name-review', 'John Doe');
  I.fillField('add-review', 'Enak magelangannya brok!');
  I.click('input[type="submit"]');

  I.refreshPage();

  I.seeElement('.form-add-review');
  I.see('John Doe', '.review');
  I.see('Enak magelangannya brok!', '.review');
});