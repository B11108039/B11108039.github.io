const cards = [
  { image: '/kpop_card_project/static/cards/normal/讚1.jpeg', caption: '卡片1！' },
  { image: '/kpop_card_project/static/cards/normal/讚2.jpeg', caption: '卡片2！' },
  { image: '/kpop_card_project/static/cards/normal/讚3.jpeg', caption: '卡片3！' },
  { image: '/kpop_card_project/static/cards/normal/讚4.jpeg', caption: '卡片4！' },
  { image: '/kpop_card_project/static/cards/normal/讚5.jpeg', caption: '卡片5！' },
  { image: '/kpop_card_project/static/cards/rare/愛心1.jpeg', caption: '卡片6！' },
  { image: '/kpop_card_project/static/cards/rare/愛心2.jpeg', caption: '卡片7！' },
  { image: '/kpop_card_project/static/cards/rare/愛心3.jpeg', caption: '卡片8！' },
  { image: '/kpop_card_project/static/cards/rare/愛心4.jpeg', caption: '卡片9！' },
  { image: '/kpop_card_project/static/cards/rare/愛心5.jpeg', caption: '卡片10！' },
  { image: '/kpop_card_project/static/cards/rare/愛心6.jpeg', caption: '卡片11！' },
  { image: '/kpop_card_project/static/cards/ultra_rare/耶1.jpeg', caption: '卡片12！' },
  { image: '/kpop_card_project/static/cards/ultra_rare/耶2.jpeg', caption: '卡片13！' },
  { image: '/kpop_card_project/static/cards/ultra_rare/耶3.jpeg', caption: '卡片14！' },
  { image: '/kpop_card_project/static/cards/ultra_rare/耶4.jpeg', caption: '卡片15！' },
  { image: '/kpop_card_project/static/cards/ultra_rare/耶5.jpeg', caption: '卡片16！' },
  { image: '/kpop_card_project/static/cards/ultra_rare/耶6.jpeg', caption: '卡片17！' },
  { image: '/kpop_card_project/static/cards/ultra_rare/耶7.jpeg', caption: '卡片18！' }
];

// 已收集卡片清單：存 { category, index }
const collectedCards = [];

// 檢查卡片是否已存在收集冊
function isCardCollected(category, index) {
  return collectedCards.some(c => c.category === category && c.index === index);
}

// 抽卡後更新收集冊
function addCardToCollection(category, index) {
  if (!isCardCollected(category, index)) {
    collectedCards.push({ category, index });
  }
}

// 修改抽卡函式，加入收集冊更新
function drawRandomCard(category) {
  const list = cardData[category];
  const index = Math.floor(Math.random() * list.length);
  showCard(category, index);
  addCardToCollection(category, index);
}

// 顯示收集冊卡片（只顯示已抽過的）
function showCollection() {
  const container = document.getElementById('collection-container');
  container.innerHTML = ''; // 清空

  if (collectedCards.length === 0) {
    container.innerText = '你還沒有抽到任何卡片喔！';
    return;
  }

  collectedCards.forEach(({ category, index }) => {
    const card = cardData[category][index];
    const cardDiv = document.createElement('div');
    cardDiv.style.width = '100px';
    cardDiv.style.height = '130px';
    cardDiv.style.backgroundImage = `url('/kpop_card_project/static/cards/${category}/${card.image}')`;
    cardDiv.style.backgroundSize = 'cover';
    cardDiv.style.border = '3px solid #41537a';
    cardDiv.style.borderRadius = '10px';
    cardDiv.title = card.caption;
    container.appendChild(cardDiv);
  });
}
