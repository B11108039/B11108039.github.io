const cardData = {
  normal: [
  { image: '/kpop_card_project/static/cards/normal/讚1.jpeg', caption: '卡片1！' },
  { image: '/kpop_card_project/static/cards/normal/讚2.jpeg', caption: '卡片2！' },
  { image: '/kpop_card_project/static/cards/normal/讚3.jpeg', caption: '卡片3！' },
  { image: '/kpop_card_project/static/cards/normal/讚4.jpeg', caption: '卡片4！' },
  { image: '/kpop_card_project/static/cards/normal/讚5.jpeg', caption: '卡片5！' }
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
  { image: '/kpop_card_project/static/cards/ultra_rare/耶7.jpeg', caption: '卡片18！' }
];

let collectedCards = JSON.parse(localStorage.getItem('starlight_collection')) || [];

function isCardCollected(category, image) {
  return collectedCards.some(c => c.category === category && c.image === image);
}
function saveToCollection(category, image, caption) {
  const card = { category, image, caption };
  let collection = JSON.parse(localStorage.getItem("starlight_collection")) || [];
  collection.push(card);
  localStorage.setItem("starlight_collection", JSON.stringify(collection));
}
saveToCollection("rare", "愛心3.jpeg", "心心相印不分離！");

function addCardToCollection(category, image, caption) {
  if (!isCardCollected(category, image)) {
    collectedCards.push({ category, image, caption });
    localStorage.setItem('starlight_collection', JSON.stringify(collectedCards));
  }
}

function drawRandomCard(category) {
  const list = cardData[category];
  const card = list[Math.floor(Math.random() * list.length)];
  showCard(category, cardData[category].indexOf(card));

  addCardToCollection(category, card.image, card.caption);
}


function showCollection() {
  const container = document.getElementById('collection-container');
  container.innerHTML = '';

  if (collectedCards.length === 0) {
    container.innerText = '你還沒有抽到任何卡片喔！';
    return;
  }

  collectedCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.style.width = '100px';
    cardDiv.style.height = '130px';
    cardDiv.style.backgroundImage = `url('${card.image}')`;
    cardDiv.style.backgroundSize = 'cover';
    cardDiv.style.border = '3px solid #41537a';
    cardDiv.style.borderRadius = '10px';
    cardDiv.title = card.caption;

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.caption;
    img.style.width = '100px';
    img.style.height = '130px';
    img.style.borderRadius = '10px';
    img.style.border = '3px solid #41537a';

    container.appendChild(img);
  });
}
