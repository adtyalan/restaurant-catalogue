document
  .getElementById('add-review-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.querySelector('btn-orange').getAttribute('data-id');
    const name = document.getElementById('name-review').value;
    const review = document.getElementById('add-review').value;
    const reviewData = { id: id, name: name, review: review };

    try {
      const response = await fetch(
        'https://restaurant-api.dicoding.dev/review',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Review submitted successfully:', result);
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review');
    }
  });
