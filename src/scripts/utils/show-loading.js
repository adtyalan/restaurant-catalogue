const loading = document.getElementById('loading');

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}

export { loading, showLoading, hideLoading };