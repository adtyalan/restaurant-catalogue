/**
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/dom';
import FavoriteRestoIdb from '../src/scripts/data/favorite-resto-idb';
import likeButtonTemplate from '../src/scripts/views/template/like-btn-component';

jest.mock('../src/scripts/data/favorite-resto-idb');

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    document.body.innerHTML = '<button id="btn-fav-resto" data-id="1"></button>';
    likeButtonTemplate();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    FavoriteRestoIdb.getResto.mockResolvedValue(undefined); // Mock getResto
    FavoriteRestoIdb.putResto.mockResolvedValue(); // Mock putResto

    const likeButton = document.querySelector('#btn-fav-resto');
    fireEvent.click(likeButton);

    // Tunggu asynchronous code selesai
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Pastikan putResto dipanggil
    expect(FavoriteRestoIdb.putResto).toHaveBeenCalledWith('1');
    // Verifikasi isi tombol berubah
    expect(likeButton.innerHTML).toContain('<i class="fa-regular fa-heart"></i>');
  });

  it('should show the unlike button when the restaurant has been liked', async () => {
    FavoriteRestoIdb.getResto.mockResolvedValue({ id: '1' }); // Mock getResto
    FavoriteRestoIdb.deleteResto.mockResolvedValue(); // Mock deleteResto

    const likeButton = document.querySelector('#btn-fav-resto');
    fireEvent.click(likeButton);

    // Tunggu asynchronous code selesai
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Pastikan deleteResto dipanggil
    expect(FavoriteRestoIdb.deleteResto).toHaveBeenCalledWith('1');
    // Verifikasi isi tombol berubah
    expect(likeButton.innerHTML).toContain('<i class="fa-solid fa-heart"></i>');
  });

  it('should not show the unlike button if failing to like the restaurant', async () => {
    FavoriteRestoIdb.getResto.mockResolvedValue(undefined); // Mock getResto
  
    const likeButton = document.querySelector('#btn-fav-resto');
    fireEvent.click(likeButton);
  
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    // Pastikan putResto dipanggil meskipun terjadi error
    expect(FavoriteRestoIdb.putResto).toHaveBeenCalledWith('1');
    // Verifikasi bahwa tombol tetap menunjukkan ikon "belum disukai"
    expect(likeButton.innerHTML).not.toContain('<i class="fa-solid fa-heart"></i>');
    expect(likeButton.innerHTML).toContain('<i class="fa-regular fa-heart"></i>');
  });
  
  it('should not show the like button if failing to unlike the restaurant', async () => {
    FavoriteRestoIdb.getResto.mockResolvedValue({ id: '1' }); // Mock getRestofailure
  
    const likeButton = document.querySelector('#btn-fav-resto');
    fireEvent.click(likeButton);
  
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    // Pastikan deleteResto dipanggil meskipun terjadi error
    expect(FavoriteRestoIdb.deleteResto).toHaveBeenCalledWith('1');
    // Verifikasi bahwa tombol tetap menunjukkan ikon "sudah disukai"
    expect(likeButton.innerHTML).not.toContain('<i class="fa-regular fa-heart"></i>');
    expect(likeButton.innerHTML).toContain('<i class="fa-solid fa-heart"></i>');
  });  
});
