from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # nanti ganti dengan domain frontend kamu
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend jalan"}

@app.get("/api/hello")
def hello():
    return {"message": "Halo dari Python"}