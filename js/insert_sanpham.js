document.getElementById('insert').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameanh = tentep.textContent;

    console.log(grid + tensp)
})
productItem.innerHTML = `
<div class="grid-item">
  <div class="tag-voucher">
    <img src="${productData.voucherImage}" alt="">
  </div>
  <div class="img-ip" id="img-sanpham">
    <img id="${productId}_image" src="${productData.productImage}" alt="">
  </div>
  <div class="txt-name" id="name-sanpham">${productData.productName}</div>
  <div class="giatien">
    <span id="${productId}_discounted-price">${productData.discountedPrice}</span>
    <span id="${productId}_original-price">${productData.originalPrice}</span>
    <span id="${productId}_discount">${productData.discountPercentage}</span>
  </div>
  <div class="adding">
    <button class="add-shoping" id="${productId}_add-to-cart-button">
      <i class="fas fa-shopping-cart"></i>
      <span id="${productId}_text-add-shoping">Thêm vào giỏ hàng</span>
    </button>
  </div>             
</div>
`;