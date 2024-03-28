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
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      document.getElementById('image1').src = 'images/macm3mb.png';
      document.getElementById('image2').src = 'images/3m1mb.png';
      document.getElementById('image3').src = 'images/3m31mb.png';
      document.getElementById('image4').src = 'images/313mb.png';
    } else {
      document.getElementById('image1').src = 'images/macm3dm.png';
      document.getElementById('image2').src = 'images/3m1dm.png';
      document.getElementById('image3').src = 'images/3m31dm.png';
      document.getElementById('image4').src = 'images/315dm.png';
    }
  });
  
  // Gọi hàm một lần để xác định hình ảnh ban đầu dựa trên kích thước màn hình hiện tại
  window.dispatchEvent(new Event('resize'));
  