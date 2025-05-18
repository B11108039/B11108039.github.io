from flask import Flask, request, render_template, jsonify
import face_recognition
import os
from werkzeug.utils import secure_filename
from PIL import Image
import numpy as np

app = Flask(__name__)
UPLOAD_FOLDER = 'static/rare'
KNOWN_FOLDER = 'known_faces'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 載入所有已知人臉資料
def load_known_faces():
    known_encodings = []
    known_names = []
    for filename in os.listdir(KNOWN_FOLDER):
        path = os.path.join(KNOWN_FOLDER, filename)
        pil_image = Image.open(path).convert('RGB')
        image = np.array(pil_image)
        encodings = face_recognition.face_encodings(image)
        if encodings:
            known_encodings.append(encodings[0])
            known_names.append(os.path.splitext(filename)[0])
    return known_encodings, known_names

known_encodings, known_names = load_known_faces()

@app.route('/')
def index():
    return render_template('index3.html')

@app.route('/rare', methods=['POST'])
def verify():
    if 'photo' not in request.files:
        return jsonify({'result': '沒有圖片'}), 400

    file = request.files['photo']
    if file.filename == '':
        return jsonify({'result': '檔案名稱為空'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # 用 PIL 讀取並轉 RGB，再轉 numpy 陣列
    pil_image = Image.open(filepath).convert('RGB')
    image = np.array(pil_image)

    encodings = face_recognition.face_encodings(image)
    if not encodings:
        return render_template('result.html', result='驗票失敗（無法辨識人臉）')

    uploaded_encoding = encodings[0]
    results = face_recognition.compare_faces(known_encodings, uploaded_encoding, tolerance=0.5)
    if True in results:
        matched_name = known_names[results.index(True)]
        return render_template('result.html', result=f'驗票成功：{matched_name}')
    else:
        return render_template('result.html', result='驗票失敗（查無此人）')

if __name__ == '__main__':
    app.run(debug=True)
