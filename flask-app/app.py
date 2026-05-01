from flask import Flask
import psycopg2
import redis
import time

app = Flask(__name__)

def check_db():
    try:
        conn = psycopg2.connect(
            host="db",
            database="testdb",
            user="user",
            password="password"
        )
        return "Database Connected"
    except:
        return "DB not ready"

def check_cache():
    try:
        r = redis.Redis(host="redis", port=6379)
        r.set("msg", "Hello from Redis")
        return r.get("msg").decode()
    except:
        return "Redis not ready"

@app.route("/")
def home():
    return f"{check_db()} | {check_cache()}"

app.run(host="0.0.0.0", port=5000)