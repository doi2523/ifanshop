// script.js

document.addEventListener("DOMContentLoaded", function() {
  var phanTram = document.getElementById("phan-tram").innerText;
  var giaUuDai = document.getElementById("gia-uu-dai").innerText;
  var giaGoc = document.getElementById("giagoc").innerText;
  var tenSanPham = document.getElementById("ten-sanpham").innerText;

  console.log("Tên sản phẩm:", tenSanPham);
  console.log("Phần trăm giảm giá:", phanTram);
  console.log("Giá ưu đãi:", giaUuDai);
  console.log("Giá gốc:", giaGoc);

  // Cập nhật giá trị
  var giaGocNumber = parseInt(giaGoc.replace(/\D/g, ""));
  var phanTramNumber = parseInt(phanTram.replace(/\D/g, ""));
  var giaUuDaiNumber = giaGocNumber - (giaGocNumber * phanTramNumber / 100);
  document.getElementById("gia-uu-dai").innerText = giaUuDaiNumber.toLocaleString() + "₫";
});
