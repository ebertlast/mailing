var BlankonSignType2 = (function () {
  return {
    // =========================================================================
    // CONSTRUCTOR APP
    // =========================================================================
    init: function () {
      BlankonSignType2.signBackstretch();
    },

    // =========================================================================
    // BACKSTRETCH
    // =========================================================================
    signBackstretch: function () {
      // Duration is the amount of time in between slides,
      // and fade is value that determines how quickly the next image will fade in
      $.backstretch(
        [
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/1.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/2.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/6.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/3.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/4.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/5.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/6.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/7.jpg",
          BlankonSign.signBaseURL() + "src/assets/global/img/bg/8.jpg",
        ],
        { duration: 5000, fade: 750 }
      );

      // Setting login on yii version
      if ($(".yii2").length) {
        $.backstretch(
          [
            BlankonSign.signBaseURL() + "src/assets/global/img/bg/bg1.jpg",
            BlankonSign.signBaseURL() + "src/assets/global/img/bg/bg2.jpg"
          ],
          { duration: 5000, fade: 750 }
        );
      }

      // Setting login on yii version
      if ($(".laravel").length) {
        $.backstretch(
          [
            BlankonSign.signBaseURL() + "src/assets/global/img/bg/bg1.jpg",
            BlankonSign.signBaseURL() + "src/assets/global/img/bg/bg2.jpg"
          ],
          { duration: 5000, fade: 750 }
        );
      }
    }
  };
})();

// Call main app init
BlankonSignType2.init();
