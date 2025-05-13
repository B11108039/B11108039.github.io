from flask import Flask, render_template, request
import face_recognition
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
KNOWN_FOLDER = 'known'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 確保上傳資料夾存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    message = ''
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            # 讀取已知人臉
            known_image = face_recognition.load_image_file(os.path.join(KNOWN_FOLDER, "known_face.jpg"))
            known_encoding = face_recognition.face_encodings(known_image)[0]

            # 讀取使用者上傳人臉
            uploaded_image = face_recognition.load_image_file(filepath)
            uploaded_encodings = face_recognition.face_encodings(uploaded_image)

            if not uploaded_encodings:
                message = "未偵測到臉部，請再試一次。"
            else:
                result = face_recognition.compare_faces([known_encoding], uploaded_encodings[0])
                message = "驗票成功，歡迎入場！" if result[0] else "驗票失敗，請確認身分。"
        else:
            message = "請上傳 JPG/PNG 圖片。"

    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run(debug=True)
