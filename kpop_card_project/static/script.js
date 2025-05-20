const cardData = {
  normal: [
    { image: '/kpop_card_project/static/cards/normal/讚1.jpeg', caption: '卡片1！' },
    { image: '/kpop_card_project/static/cards/normal/讚2.jpeg', caption: '卡片2！' },
    { image: '/kpop_card_project/static/cards/normal/讚3.jpeg', caption: '卡片3！' },
    { image: '/kpop_card_project/static/cards/normal/讚4.jpeg', caption: '卡片4！' },
    { image: '/kpop_card_project/static/cards/normal/讚5.jpeg', caption: '卡片5！' },
    { image: '/kpop_card_project/static/cards/normal/讚6.jpeg', caption: '卡片6！' },
    { image: '/kpop_card_project/static/cards/normal/讚7.jpeg', caption: '卡片7！' },
    { image: '/kpop_card_project/static/cards/normal/讚8.jpeg', caption: '卡片8！' },
    { image: '/kpop_card_project/static/cards/normal/讚9.jpeg', caption: '卡片9！' },
    { image: '/kpop_card_project/static/cards/normal/讚10.jpeg', caption: '卡片10！' },
    { image: '/kpop_card_project/static/cards/normal/讚11.jpeg', caption: '卡片11！' },
    { image: '/kpop_card_project/static/cards/normal/讚12.jpeg', caption: '卡片12！' },
    { image: '/kpop_card_project/static/cards/normal/讚13.jpeg', caption: '卡片13！' },
    { image: '/kpop_card_project/static/cards/normal/讚14.jpeg', caption: '卡片14！' }

  ],
  rare: [
    { image: '/kpop_card_project/static/cards/rare/愛心1.jpeg', caption: '卡片6！' },
    { image: '/kpop_card_project/static/cards/rare/愛心2.jpeg', caption: '卡片7！' },
    { image: '/kpop_card_project/static/cards/rare/愛心3.jpeg', caption: '卡片8！' },
    { image: '/kpop_card_project/static/cards/rare/愛心4.jpeg', caption: '卡片9！' },
    { image: '/kpop_card_project/static/cards/rare/愛心5.jpeg', caption: '卡片10！' },
    { image: '/kpop_card_project/static/cards/rare/愛心6.jpeg', caption: '卡片11！' }
  ],
  ultra_rare: [
    { image: '/kpop_card_project/static/cards/ultra_rare/耶1.jpeg', caption: '卡片12！' },
    { image: '/kpop_card_project/static/cards/ultra_rare/耶2.jpeg', caption: '卡片13！' },
    { image: '/kpop_card_project/static/cards/ultra_rare/耶3.jpeg', caption: '卡片14！' },
    { image: '/kpop_card_project/static/cards/ultra_rare/耶4.jpeg', caption: '卡片15！' },
    { image: '/kpop_card_project/static/cards/ultra_rare/耶5.jpeg', caption: '卡片16！' },
    { image: '/kpop_card_project/static/cards/ultra_rare/耶6.jpeg', caption: '卡片17！' },
    { image: '/kpop_card_project/static/cards/ultra_rare/耶7.jpeg', caption: '卡片18！' },
    { image: '/kpop_card_project/static/cards/ultra_rare/耶8.jpeg', caption: '卡片19！' }
  ]
};

// 初始化收藏
let collectedCards = JSON.parse(localStorage.getItem('starlight_collection')) || [];

// 檢查卡片是否已收藏
function isCardCollected(category, image) {
  return collectedCards.some(card => card.category === category && card.image === image);
}

// 收藏卡片
function addCardToCollection(category, image, caption) {
  if (!isCardCollected(category, image)) {
    const card = { category, image, caption };
    collectedCards.push(card);
    localStorage.setItem('starlight_collection', JSON.stringify(collectedCards));
  }
}

// 抽卡
function drawRandomCard(category) {
  const list = cardData[category];
  const randomCard = list[Math.floor(Math.random() * list.length)];
  const cardIndex = list.indexOf(randomCard);

  showCard(category, cardIndex); // 假設你有定義這個函式
  addCardToCollection(category, randomCard.image, randomCard.caption);
}

// 展示收藏
function showCollection() {
  const container = document.getElementById('collection-container');
  container.innerHTML = '';

  if (collectedCards.length === 0) {
    container.innerText = '你還沒有抽到任何卡片喔！';
    return;
  }

  collectedCards.forEach(card => {
    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.caption;
    img.style.width = '100px';
    img.style.height = '130px';
    img.style.border = '3px solid #41537a';
    img.style.borderRadius = '10px';
    img.title = card.caption;

    container.appendChild(img);
  });
}

// 測試新增一張指定卡片
addCardToCollection('rare', '/kpop_card_project/static/cards/rare/愛心3.jpeg', '心心相印不分離！');
// 假設 model 已加載完成
function handlePrediction(prediction) {
  const gesture = prediction[0].className; // 比如 "like"、"heart"、"star"
  let category = 'normal';
  if (gesture === 'heart') category = 'rare';
  else if (gesture === 'star') category = 'ultra_rare';

  const cardList = cardData[category];
  const randomCard = cardList[Math.floor(Math.random() * cardList.length)];
  document.getElementById('card-container').style.backgroundImage =
    `url('/static/cards/${category}/${randomCard.image}')`;
  document.getElementById('idol-caption').textContent = randomCard.caption;
}
function playSoundForCategory(category) {
  const sound = document.getElementById('sound');
  sound.src = `/static/sound/${category}.mp3`;
  sound.play();
}
document.getElementById('summon-btn').addEventListener('click', () => {
  const cardList = cardData.normal;
  const randomCard = cardList[Math.floor(Math.random() * cardList.length)];
  document.getElementById('card-container').style.backgroundImage =
    `url('/static/cards/normal/${randomCard.image}')`;
  document.getElementById('idol-caption').textContent = randomCard.caption;
});
