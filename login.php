<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>iFanShop</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css">
<link rel="stylesheet" href="css/animate.css">
<link rel="icon" href="images/marketplace.png" type="image/x-icon">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="style.css"/>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" href="css/login.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
<!-- Navbar -->
<nav class="navbar navbar-expand-lg">
  <div class="container"> 
    <a class="navbar-brand navbar-logo" href="index.html"><img style="height: 50px;" src="images/ifa1.png" alt=""></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="fas fa-bars"></span> </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item"> <a class="nav-link" href="index.html">Trang chủ</a> </li>
        <li class="nav-item"> <a class="nav-link" href="about.html">Giới thiệu</a> </li>
        <!-- <li class="nav-item"> <a class="nav-link" href="sanpham.html">Sản phẩm</a> </li> -->
        <li class="nav-item dropdown"> 
          <a class="nav-link dropdown-toggle" href="#" id="login" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sản phẩm<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 8 2" fill="currentColor" id="icon" class="rotate-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.646 3.708L0.645996 0.708L1.354 0L4 2.647L6.646 0L7.354 0.708L4.354 3.708L4 4.061L3.646 3.708Z" fill="currentColor"></path></svg>
          </a>        
          <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="	background: linear-gradient(to left, #7a60ff, #cd9ffa); color: #fff;">
              <a class="dropdown-item" href="sanpham.html" style=" text-transform: none; font-size: 17px;">iPhone</a>
              <a class="dropdown-item" href="macbook.html" style=" text-transform: none; font-size: 17px;">Macbook</a>
              <a class="dropdown-item" href="ipad.html" style=" text-transform: none; font-size: 17px;">iPad</a>
              <a class="dropdown-item" href="accessory.html" style=" text-transform: none; font-size: 17px;">Phụ kiện</a>
          </div>
        </li>
        <li class="nav-item"> <a class="nav-link" href="services.html">Dịch vụ</a> </li>
        <li class="nav-item"> <a class="nav-link" href="faq.html">Faq</a> </li>
        <li class="nav-item"> <a class="nav-link" href="contact.html">Liên hệ</a> </li>
        <li class="nav-item"> <a class="nav-link" href="login.html">Đăng nhập</a> </li>
    </ul>
      </ul>
    </div>
  </div>
</nav>
<!-- End Navbar --> 
<!-------Banner Start------->
<section class="banner" data-scroll-index='0'>
  <div class="banner-overlay">
    <div class="container">
      <div>
        <div>
          <div>
      
            <br>
            <br>
            <section class="forms-section">
              <h1 class="section-title">Login & SignUp</h1>
              <div class="forms">
                <div class="form-wrapper is-active">
                  <button type="button" class="switcher switcher-login">
                    Đăng nhập
                    <span class="underline"></span>
                  </button>
                  <form id="formm" class="form form-login">
                    <fieldset>
                      <legend>Please, enter your email and password for login.</legend>
                      <div class="input-block">
                        <label for="login-email">E-mail</label>
                        <!-- Cách ra cho biết phần name nè -->
                        <input id="login-email" type="email" required name="txt-email-login">
                      </div>
                      <div class="input-block">
                        <label for="login-password">Password</label>
                        <!-- Cách ra cho biết phần name nè -->
                        <input id="login-password" type="password" name="txt-password-login" required>

                      </div>
                      <a href=""><div>Quên mật khẩu?</div></a>
                    </fieldset>

                     <!-- Cách ra cho biết phần name nè -->
                    <button type="submit" class="btn-login" name="bt-login">Đăng nhập</button>
                  </form>
                </div>
                <div class="form-wrapper">
                  <button type="button" class="switcher switcher-signup">
                    Đăng ký
                    <span class="underline"></span>
                  </button>
                  <form method="GET" id="formm" class="form form-signup">
                    <fieldset>
                        <legend>Please, enter your email, password and password confirmation for sign up.</legend>
                        <div class="input-block">
                            <label for="signup-username">Username</label>

                            <!-- Cách ra cho biết phần name nè -->
                            <input id="signup-username" type="text" name="txt-username-signup" required>

                        </div>
                        <div class="input-block">
                            <label for="signup-email">E-mail</label>

                            <!-- Cách ra cho biết phần name nè -->
                            <input id="signup-email" type="email" required name="txt-email-signup">
                        </div>
                        <div class="input-block">
                            <label for="signup-password">Password</label>

                            <!-- Cách ra cho biết phần name nè -->
                            <input id="signup-password" type="password" required name="txt-password-signup">
                        </div>
                        <a href="" id="have-account">Bạn đã có tài khoản?</a>
                    </fieldset>

                     <!-- Cách ra cho biết phần name nè -->
                    <button type="submit" class="btn-signup" name="bt-signup">Đăng ký</button>
                </form>
                
                </div>
              </div>
            </section>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>


  <!-- Không đưuocj sờ -->
  <!-- <?php
          if(isset($_GET['bt-signup'])) //Hàm kiểm tra nút submit
          {
              if(empty($_GET['txt-username-signup']) 
              || empty($_GET['txt-email-signup']) 
              || empty($_GET['txt-password-signup']))
              echo "Bạn chưa nhập đủ thông tin";
              else
              {
                  echo "Username: ".$_GET['txt-username-signup']."<br>".
                  "Email: ".$_GET['txt-email-signup']."<br>".
                  "Passwd: ".$_GET['txt-password-signup']."<br>";
              }
          }
  ?> -->

  
    <?php
        include ('control.php'); //gọi trang php
        $get_data= new data_usrname(); //Gọi lớp ata_user_ifanshop trong trang control
        if(isset($_GET['bt-signup']))
        {
            $in_usr =$get_data -> insert_usr($_GET['txt-username-signup'],
                                                $_GET['txt-email-signup'],
                                                $_GET['txt-password-signup']);
            if($in_usr) echo "<script>alert('Thành công');
                            </script>";
            else 
            echo "<script>alert('Không thực thi được')</script>";                
        }
    ?>

<footer class="footer-copy">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <p>2024 &copy; Applight. Website Designed by <a href="" target="_blank" rel="dofollow">Doi teamwork</a></p>
      </div>
    </div>
  </div>
</footer>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> 
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script> 
<script src="https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js"></script> 
<!-- scrollIt js --> 
<script src="js/scrollIt.min.js"></script> 
<script src="js/wow.min.js"></script> 
<script src="js/script.js"></script>
</body>
</html>
