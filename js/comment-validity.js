'use strict';

(function () {
  const MAX_COMMENT_LENGTH = 140;

  const checkComment = (comment) => {
    if (comment.length > MAX_COMMENT_LENGTH) {
      return `Длина комментария не может составлять больше 140 символов`;
    }
    return ``;
  };

  window.commentValidity = {
    check: checkComment,
  };
}());
