const cards = [
  { image: '/kpop_card_project/static/cards/normal/讚1.jpeg', caption: '卡片1！' },
  { image: '/kpop_card_project/static/cards/normal/讚2.jpeg', caption: '卡片2！' },
  { image: '/kpop_card_project/static/cards/normal/讚3.jpeg', caption: '卡片3！' },
  { image: '/static/cards/normal/隆.JPEG', caption: '卡片二：隆！' },
  { image: '/static/cards/normal/禾.JPEG', caption: '卡片三：禾！' }
];

function drawCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const { image, caption } = cards[randomIndex];

  const idolCard = document.getElementById('idol-card');
  idolCard.style.backgroundImage = `url('${image}')`;

  const captionElement = document.getElementById('card-caption');
  captionElement.textContent = caption;
}
