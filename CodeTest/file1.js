// Đọc giá trị từ cookie
const userInfoStringFromCookie = Cookies.get('userInfo');
// Chuyển chuỗi JSON thành đối tượng JavaScript
if (userInfoStringFromCookie) {
  const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);

  const uidProfile = userInfoFromCookie.id_profile; // ID
  const emailProfile = userInfoFromCookie.email_profile; //Email
  const hotenProfile = userInfoFromCookie.hoten_profile; //Họ tên
  const passwordProfile = userInfoFromCookie.password_profile; //Password
  const sdtProfile = userInfoFromCookie.sdt_profile; //Số điện thoại
  const usernameProfile = userInfoFromCookie.username_profile; //Username
  const URLProfile = userInfoFromCookie.url_profile; //Link ảnh
  const RoleProfile = userInfoFromCookie.role; //Vai trò người dùng
  const Status = userInfoFromCookie.userstatus; //Trạng thái
  const TimeLogin = userInfoFromCookie.last_login; //Time đăng nhập
  const TimeLogout = userInfoFromCookie.last_logout; //Time đăng xuất

} else {
  console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}




//Khởi tạo chuỗi giá trị để lưu vào cookies
const userInfo = {
  id_profile: uidProfile,
  email_profile: emailProfile,
  hoten_profile: hotenProfile,
  password_profile: passwordProfile,
  sdt_profile: sdtProfile,
  username_profile: usernameProfile,
  url_profile: url,
  role: RoleProfile,
  userstatus: Status,
  last_login: TimeLogin,
  last_logout: TimeLogout,
};
const userInfoString = JSON.stringify(userInfo);
// Lưu chuỗi JSON vào cookie
Cookies.set('userInfo', userInfoString, { expires: 2, path: '/' });