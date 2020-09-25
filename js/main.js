const getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getPhotoData = function () {
  const photoData = [];
  for (let i = 0; i < 25; i++) {
    const likes = getRandomNumber(15, 200);
    const url = "photos/" + (i + 1) + ".jpg";
    photoData[i] = {
      url: url,
      description: "описание фотографии",
      likes: likes,
      comments: [
        getComment()
      ]
    };
  }
  return photoData;
};

const getComment = function () {
  const messages = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
  ];
  const names = [
    "Иван",
    "Петр",
    "Мария",
    "Нина",
    "Саша",
  ];
  const avatarNumber = getRandomNumber(1, 6);
  const name = names[getRandomNumber(0, names.length - 1)];
  const message = messages[getRandomNumber(0, messages.length - 1)];
  return {
    avatar: "img/avatar-" + avatarNumber + ".svg",
    message: message,
    name: name,
  };
};

console.log(getPhotoData());

