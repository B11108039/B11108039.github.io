from flask import Flask, render_template, url_for
import random
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index2.html")

@app.route("/draw")
def draw():
    # 定義稀有度及對應路徑
    rarities = ['normal', 'rare', 'ultra_rare']
    weights = [0.7, 0.25, 0.05]  # 機率設定（可以調整）
    rarity = random.choices(rarities, weights)[0]

    # 找出該稀有度資料夾中的卡片
    card_dir = os.path.join(app.static_folder, 'cards', rarity)
    card_list = [f for f in os.listdir(card_dir) if f.endswith(('.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'))]

    # 隨機抽一張卡
    card_name = random.choice(card_list)

    return render_template("draw.html", rarity=rarity, card_name=card_name)

if __name__ == "__main__":
    app.run(debug=True)
