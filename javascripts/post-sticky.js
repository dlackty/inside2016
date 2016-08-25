(function() {
  var $postToolbox, authorBlock, checkLogoStatus, checkShareToolBoxStatus, currentStatus, getStatus, postHeader, postToolboxDims;

  $postToolbox = $('.post_toolbox-sticky');

  if (!$postToolbox.length) {
    return;
  }

  postHeader = document.querySelectorAll('.js-post_header')[0];

  checkLogoStatus = function() {
    return $postToolbox.toggleClass('is-logo-revealed', postHeader.getBoundingClientRect().bottom < 0);
  };

  $window.on('scroll', checkLogoStatus);

  checkLogoStatus();

  if (CSS.supports('(position: -webkit-sticky)')) {
    return;
  }

  authorBlock = document.querySelectorAll('.js-post_footer')[0];

  postToolboxDims = {
    height: $postToolbox.height(),
    margin: {
      top: 36,
      bottom: 48
    }
  };

  currentStatus = '';

  getStatus = function() {
    if (postHeader.getBoundingClientRect().bottom < 0) {
      if (authorBlock.getBoundingClientRect().top < postToolboxDims.margin.top + postToolboxDims.height + postToolboxDims.margin.bottom) {
        return 'bottom';
      }
      return 'sticky';
    }
    return 'top';
  };

  checkShareToolBoxStatus = function() {
    var status;

    status = getStatus();
    if (currentStatus === status) {
      return;
    }
    currentStatus = status;
    return $postToolbox.removeClass('is-sticky is-bottom is-top').addClass("is-" + currentStatus);
  };

  $window.on('scroll', checkShareToolBoxStatus);

  checkShareToolBoxStatus();

}).call(this);