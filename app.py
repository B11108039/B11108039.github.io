from flask import Flask, request, render_template, redirect, url_for
import os

app = Flask(__name__)
UPLOAD_FOLDER = "static/uploads"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/verify', methods=['POST'])
def verify():
    if 'image' not in request.files:
        return "沒有上傳照片", 400
    file = request.files['image']
    if file.filename == '':
        return "沒有選擇檔案", 400
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    # 模擬驗票邏輯（此處你可加臉部辨識等）
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
