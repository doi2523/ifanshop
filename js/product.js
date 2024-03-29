// Lấy danh sách sản phẩm từ Local Storage
var productList = localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : [];

// Hiển thị danh sách sản phẩm và cập nhật HTML từ dữ liệu trong Local Storage khi trang được tải
updateHTMLFromLocalStorage();

// Lắng nghe sự kiện submit của form và thêm sản phẩm mới khi form được submit
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi form mặc định
    var productName = document.getElementById('productName').value;
    var discount = parseFloat(document.getElementById('discount').value);
    var discountedPrice = parseFloat(document.getElementById('discountedPrice').value);
    var originalPrice = parseFloat(document.getElementById('originalPrice').value);
    var productId = Date.now(); // Tạo một ID duy nhất bằng cách sử dụng thời gian hiện tại
    saveProduct(productName, discount, discountedPrice, originalPrice, productId);
    this.reset(); // Xóa nội dung của form sau khi thêm sản phẩm
});

// Hàm cập nhật HTML từ dữ liệu trong Local Storage
function updateHTMLFromLocalStorage() {
    var productListHTML = '';
    productList.forEach(function(product) {
        productListHTML += `
            <fieldset>
                <legend>id: ${product.id}</legend>
                <div class="input-block">
                    <label>ID:</label>
                    <span>${product.id}</span>
                </div>
                <div class="input-block">
                    <label>Tên sản phẩm:</label>
                    <span>${product.name}</span>
                </div>
                <div class="input-block">
                    <label>Phần trăm giảm giá:</label>
                    <span>${product.discount}%</span>
                </div>
                <div class="input-block">
                    <label>Giá ưu đãi:</label>
                    <span>${product.discountedPrice}₫</span>
                </div>
                <div class="input-block">
                    <label>Giá gốc:</label>
                    <span>${product.originalPrice}₫</span>
                </div>
                <button type="button" onclick="editProduct(${product.id})">Edit</button>
                <button type="button" onclick="deleteProduct(${product.id})">Delete</button>
            </fieldset>
            <hr>
        `;
    });
    document.getElementById('product-list').innerHTML = productListHTML;
}

// Hàm lưu thông tin sản phẩm vào Local Storage và cập nhật HTML
function saveProduct(name, discount, discountedPrice, originalPrice, id) {
    var newProduct = {
        id: id,
        name: name,
        discount: discount,
        discountedPrice: discountedPrice,
        originalPrice: originalPrice
    };
    productList.push(newProduct);
    localStorage.setItem('productList', JSON.stringify(productList));
    updateHTMLFromLocalStorage();
}

// Hàm xoá thông tin sản phẩm từ Local Storage và cập nhật HTML
function deleteProduct(id) {
    productList = productList.filter(function(product) {
        return product.id !== id;
    });
    localStorage.setItem('productList', JSON.stringify(productList));
    updateHTMLFromLocalStorage();
}

// Hàm sửa thông tin sản phẩm
function editProduct(id) {
    var product = productList.find(function(prod) {
        return prod.id === id;
    });

    var newName = prompt("Nhập tên mới cho sản phẩm:", product.name);
    var newDiscount = parseFloat(prompt("Nhập phần trăm giảm giá mới (%):", product.discount));
    var newDiscountedPrice = parseFloat(prompt("Nhập giá ưu đãi mới (đ):", product.discountedPrice));
    var newOriginalPrice = parseFloat(prompt("Nhập giá gốc mới (đ):", product.originalPrice));

    // Nếu người dùng không nhập hoặc nhập giá trị không hợp lệ, giữ nguyên giá trị cũ
    if (!isNaN(newDiscount) && newDiscount >= 0 && newDiscount <= 100) {
        product.discount = newDiscount;
    }
    if (!isNaN(newDiscountedPrice) && newDiscountedPrice >= 0) {
        product.discountedPrice = newDiscountedPrice;
    }
    if (!isNaN(newOriginalPrice) && newOriginalPrice >= 0) {
        product.originalPrice = newOriginalPrice;
    }
    if (newName !== null && newName !== '') {
        product.name = newName;
    }

    localStorage.setItem('productList', JSON.stringify(productList));
    updateHTMLFromLocalStorage();
}
