import secrets

from flask import Flask
from routes.auth import auth_bp

app = Flask(__name__)
app.config["JWT_SECRET"] = secrets.token_hex(32)
app.register_blueprint(auth_bp, url_prefix="/api/auth")

if __name__ == "__main__":
    app.run(port=8000)
