function removeSkeleton() {
  const skeletonImgItem = document.querySelectorAll('.skeleton-img-item');
  skeletonImgItem.forEach((element) => {
    element.classList.remove('skeleton');
    element.classList.add('skeleton-loaded');
  });
  const skeletonImgReason = document.querySelectorAll('.skeleton-img-reason');
  skeletonImgReason.forEach((element) => {
    element.classList.remove('skeleton');
    element.classList.add('skeleton-loaded');
  });
  const skeletonImgContainer = document.querySelectorAll('.skeleton-img-container');
  skeletonImgContainer.forEach((element) => {
    element.classList.remove('skeleton');
    element.classList.add('skeleton-loaded');
  });
}

export { removeSkeleton };