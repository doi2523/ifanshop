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
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
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
window.addEventListener("resize", function () {
  if (window.innerWidth <= 768) {
    document.getElementById("image1").src =
      "https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F13t4mb.png?alt=media&token=60198939-13dd-461c-8e10-85c02e1e37d3";
    document.getElementById("image2").src =
      "https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F11t4mb.png?alt=media&token=85b1567e-b357-4fdc-909a-fe63aaba3ed0";
    document.getElementById("image3").src =
      "https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F315mb.png?alt=media&token=009bdf08-47ab-4791-a9b5-a2114b29682c";
    // document.getElementById('image4').src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F314mb.png?alt=media&token=9f7ddd22-d948-453c-ba03-b284b9f6788a';
  } else {
    document.getElementById("image1").src =
      "https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F15t4dm.png?alt=media&token=93b777b4-01b8-49b2-a75f-8159343d35a1";
    document.getElementById("image2").src =
      "https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F13t4dm.png?alt=media&token=075b6610-e8ab-4ec5-b18a-85d9cafc271b";
    document.getElementById("image3").src =
      "https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/images%2F11t4dm.png?alt=media&token=e8986862-9fc7-4ec8-8e89-6846f3aa00c2";
    // document.getElementById('image4').src = 'images/315dm.png';
  }
});

// Gọi hàm một lần để xác định hình ảnh ban đầu dựa trên kích thước màn hình hiện tại
window.dispatchEvent(new Event("resize"));
