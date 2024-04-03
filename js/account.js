        // Lấy danh sách người dùng từ Local Storage
        var userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

        // Hiển thị danh sách người dùng dưới dạng các form riêng biệt
        var userListHTML = '';
        userList.forEach(function(user, index) {
            userListHTML += `
            <hr>            
            <legend>Thông tin người dùng ${index + 1}</legend>

                <div id="user-${index}">
                <form id="user-form-${index}">
                    <label>Username:</label>
                    <span id="username-${index}">${user.username}</span><br>

                    <label>Email:</label>
                    <span id="email-${index}">${user.email}</span><br>

                    <label>Password:</label>
                    <span id="password-${index}">${user.password}</span><br>

                    <!-- Thêm nút Edit -->
                    <button type="button" onclick="showEditForm(${index})">Edit</button>

                    <!-- Thêm nút Delete -->
                    <button type="button" onclick="deleteUser(${index})">Delete</button>
                </form>
                <!-- Thêm form con để chỉnh sửa -->
                <div id="edit-form-${index}" style="display: none;">
                    <form>
                        <label>Username:</label>
                        <input type="text" id="edit-username-${index}" value="${user.username}"><br>

                        <label>Email:</label>
                        <input type="email" id="edit-email-${index}" value="${user.email}"><br>

                        <label>Password:</label>
                        <input type="password" id="edit-password-${index}" value="${user.password}"><br>

                        <!-- Thêm nút Update -->
                        <button type="button" onclick="updateUser(${index})">Update</button>
                    </form>
                </div>
            </div>
            <hr><hr>
            `;
        });
        document.getElementById('user-list').innerHTML = userListHTML;

        // Hàm hiển thị form chỉnh sửa khi người dùng nhấn nút Edit
        function showEditForm(index) {
            document.getElementById(`user-form-${index}`).style.display = 'none'; // Ẩn form chính
            document.getElementById(`edit-form-${index}`).style.display = 'block'; // Hiện form chỉnh sửa
        }

        // Hàm xử lý khi người dùng nhấn nút Update
        function updateUser(index) {
            // Lấy giá trị từ form chỉnh sửa
            var editedUsername = document.getElementById(`edit-username-${index}`).value;
            var editedEmail = document.getElementById(`edit-email-${index}`).value;
            var editedPassword = document.getElementById(`edit-password-${index}`).value;

            // Cập nhật thông tin người dùng trong mảng
            userList[index].username = editedUsername;
            userList[index].email = editedEmail;
            userList[index].password = editedPassword;

            // Lưu mảng userList đã cập nhật vào Local Storage
            localStorage.setItem('userList', JSON.stringify(userList));

            // Cập nhật lại giao diện hiển thị danh sách người dùng
            updateUserListUI();
        }

        // Hàm xử lý khi người dùng nhấn nút Delete
        function deleteUser(index) {
            // Xác nhận với người dùng trước khi xoá
            if (confirm("Bạn có chắc chắn muốn xoá thông tin người dùng này?")) {
                // Xoá thông tin người dùng khỏi mảng userList
                userList.splice(index, 1);

                // Lưu mảng userList đã cập nhật vào Local Storage
                localStorage.setItem('userList', JSON.stringify(userList));

                // Cập nhật lại giao diện
                updateUserListUI();
            }
        }

        // Hàm cập nhật lại giao diện hiển thị danh sách người dùng
        function updateUserListUI() {
            var updatedUserListHTML = '';
            userList.forEach(function(user, index) {
                updatedUserListHTML += `
                    <div id="user-${index}">
                        <form id="user-form-${index}">
                            <label>Username:</label>
                            <span id="username-${index}">${user.username}</span><br>
        
                            <label>Email:</label>
                            <span id="email-${index}">${user.email}</span><br>
        
                            <label>Password:</label>
                            <span id="password-${index}">${user.password}</span><br>
                            
                            <!-- Thêm nút Edit -->
                            <button type="button" onclick="showEditForm(${index})">Edit</button>
                            
                            <!-- Thêm nút Delete -->
                            <button type="button" onclick="deleteUser(${index})">Delete</button>
                        </form>
                        <!-- Thêm form con để chỉnh sửa -->
                        <div id="edit-form-${index}" style="display: none;">
                            <form>
                                <label>Username:</label>
                                <input type="text" id="edit-username-${index}" value="${user.username}"><br>
            
                                <label>Email:</label>
                                <input type="email" id="edit-email-${index}" value="${user.email}"><br>
            
                                <label>Password:</label>
                                <input type="password" id="edit-password-${index}" value="${user.password}"><br>
            
                                <!-- Thêm nút Update -->
                                <button type="button" onclick="updateUser(${index})">Update</button>
                            </form>
                        </div>
                    </div>
                    <hr>
                `;
            });
            document.getElementById('user-list').innerHTML = updatedUserListHTML;
        }





