$(".slider").each(function () {
  var $this = $(this);
  var $group = $this.find(".slide-group");
  var $slides = $this.find(".slide");
  var buttonArray = [];
  var currentIndex = 0;
  var timeout;

  function move(newIndex) {
    if ($group.is(":animated") || currentIndex === newIndex) {
      return;
    }

    buttonArray[currentIndex].removeClass("active");
    buttonArray[newIndex].addClass("active");

    var animateLeft, slideLeft;
    if (newIndex > currentIndex) {
      slideLeft = "100%";
      animateLeft = "-100%";
    } else {
      slideLeft = "-100%";
      animateLeft = "100%";
    }

    $slides.eq(newIndex).css({ left: slideLeft, display: "block" });

    $group.animate({ left: animateLeft }, function () {
      $slides.eq(currentIndex).css({ display: "none" });
      $slides.eq(newIndex).css({ left: 0 });
      $group.css({ left: 0 });
      currentIndex = newIndex;
      advance(); // Re-enable auto-advancing after slide transition
    });
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (currentIndex < $slides.length - 1) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  // $.each($slides, function (index) {
  //   var $button = $('<button type="button" class="slide-btn">&bull;</button>');
  //   if (index === currentIndex) {
  //     $button.addClass("active");
  //   }
  //   $button.on("click", function () {
  //     move(index);
  //   }).appendTo(".slide-buttons");
  //   buttonArray.push($button);
  // });

  $(".slide-buttons").empty();

  // Create new buttons
  var buttonArray = [];
  $slides.each(function (index) {
    var $button = $('<button type="button" class="slide-btn"><i class="fas fa-circle"></i></button>');
    $button.on("click", function () {
      move(index);
    });
    buttonArray.push($button);
  });

  // Append buttons to the slide-buttons container
  $(".slide-buttons").append(buttonArray);


  $(".slide-prev").on("click", function () {
    var newIndex = currentIndex === 0 ? $slides.length - 1 : currentIndex - 1;
    move(newIndex);
  });

  $(".slide-next").on("click", function () {
    var newIndex = currentIndex === $slides.length - 1 ? 0 : currentIndex + 1;
    move(newIndex);
  });

  advance();
});




// JavaScript
window.addEventListener('resize', function() {
  if (window.innerWidth <= 768) {
    document.getElementById('image1').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fdm1.jpeg?alt=media&token=92e95378-db86-4186-ba75-0eaed6a6d446';
    document.getElementById('image2').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fdm2.jpeg?alt=media&token=7123bf52-c3a9-4668-933a-c4d89c0e9d30';
    document.getElementById('image3').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fdm3.jpeg?alt=media&token=37f8a480-505b-432e-91eb-f1634acefcef';
    document.getElementById('image4').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fdm4.png?alt=media&token=1a0e7424-dd6e-4f6c-8956-d1e22f499710';
    document.getElementById('image5').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F315mb.png?alt=media&token=009bdf08-47ab-4791-a9b5-a2114b29682c';
    document.getElementById('image6').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F313mb.png?alt=media&token=c3d2f2a7-a3db-4be9-b729-1af2898893e6';
    document.getElementById('image7').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F314mb.png?alt=media&token=9f7ddd22-d948-453c-ba03-b284b9f6788a';
  } else {
    document.getElementById('image1').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fbn1.jpeg?alt=media&token=9d9c09ae-d138-4be8-9a87-ef6d10db2121';
    document.getElementById('image2').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fbn2.jpeg?alt=media&token=e0911b7b-4dba-465a-a18f-8e0493700bacnifanshop.appspot.com/images/bn2.jpeg';
    document.getElementById('image3').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fbn3.jpeg?alt=media&token=2fcad9a2-8c04-494b-9f85-eabea3e21692';
    document.getElementById('image4').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fbn4.png?alt=media&token=28d0936f-25a9-41ec-8e77-65fcc2cea728';
    document.getElementById('image5').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fbn5.jpeg?alt=media&token=46d51cb8-d5bc-4d31-a66c-d3d1397fed69';
    document.getElementById('image6').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fbn6.png?alt=media&token=e1f944f3-e3ff-4a72-b537-9f9c29b9147c';
    document.getElementById('image7').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2Fbn7.png?alt=media&token=234d7a22-2812-43f6-a091-c6dd199abd6e';
  }
});

// Gọi hàm một lần để xác định hình ảnh ban đầu dựa trên kích thước màn hình hiện tại
window.dispatchEvent(new Event('resize'));
