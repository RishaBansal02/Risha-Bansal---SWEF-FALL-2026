from datetime import datetime, timedelta, timezone

import jwt
from flask import Blueprint, current_app, jsonify, request

auth_bp = Blueprint("auth", __name__)

USERNAME = "student"
PASSWORD = "homework123"


@auth_bp.post("/login")
def login():
    data = request.get_json(silent=True)

    if (
        not isinstance(data, dict)
        or data.get("username") != USERNAME
        or data.get("password") != PASSWORD
    ):
        return jsonify(error="Incorrect username or password."), 401

    token = jwt.encode(
        {
            "sub": USERNAME,
            "exp": datetime.now(timezone.utc) + timedelta(hours=1),
        },
        current_app.config["JWT_SECRET"],
        algorithm="HS256",
    )

    return jsonify(access_token=token, token_type="bearer")


@auth_bp.get("/me")
def me():
    authorization = request.headers.get("Authorization", "").split()

    if len(authorization) != 2 or authorization[0].lower() != "bearer":
        return jsonify(error="A bearer token is required."), 401

    try:
        claims = jwt.decode(
            authorization[1],
            current_app.config["JWT_SECRET"],
            algorithms=["HS256"],
            options={"require": ["sub", "exp"]},
        )
    except jwt.InvalidTokenError:
        return jsonify(error="Invalid or expired token."), 401

    if claims["sub"] != USERNAME:
        return jsonify(error="Invalid token user."), 401

    return jsonify(message=f"Welcome, {claims['sub']}!")
