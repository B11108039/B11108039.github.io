from flask import Flask, request, render_template, jsonify
import face_recognition
import numpy as np
import cv2
import os
from datetime import datetime

app = Flask(__name__)

# ======== 臉部資料載入區 ========
known_face_encodings = []
known_face_names = []

for filename in os.listdir("known_faces"):
    image = face_recognition.load_image_file(f"known_faces/{filename}")
    encodings = face_recognition.face_encodings(image)
    if encodings:
        known_face_encodings.append(encodings[0])
        known_face_names.append(os.path.splitext(filename)[0])


# ======== 轉換圖片格式函式 ========
def convert_image_to_rgb(file):
    try:
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img_bgr = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        return img_rgb
    except Exception as e:
        print("圖片轉換錯誤：", e)
        return None


# ======== 首頁路由 ========
@app.route('/')
def index():
    return render_template('index.html')


# ======== 上傳辨識路由 ========
@app.route('/verify', methods=['POST'])
def verify():
    if 'image' not in request.files:
        return jsonify({'success': False, 'message': '沒有上傳圖片'})

    file = request.files['image']
    if file.filename == '':
        return jsonify({'success': False, 'message': '未選擇檔案'})

    # 將圖片轉為 RGB 格式
    img = convert_image_to_rgb(file)
    if img is None:
        return jsonify({'success': False, 'message': '圖片格式錯誤，請使用 JPG 或 PNG'})

    # 辨識臉部
    face_locations = face_recognition.face_locations(img)
    face_encodings = face_recognition.face_encodings(img, face_locations)

    if not face_encodings:
        return jsonify({'success': False, 'message': '圖片中未偵測到人臉'})

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)

        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            return jsonify({
                'success': True,
                'name': name,
                'time': timestamp
            })

    return jsonify({'success': False, 'message': '未比對到任何註冊人臉'})


# ======== 執行伺服器 ========
if __name__ == '__main__':
    app.run(debug=True)
