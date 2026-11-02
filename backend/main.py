import io

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from detector import detect

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

@app.post("/api/detect")
async def deteksi(file: UploadFile = File(...), conf: float = 0.3):
    try:
        isi = await file.read()
        gambar = Image.open(io.BytesIO(isi))
    except Exception:
        raise HTTPException(status_code=400, detail="File bukan gambar yang valid")

    hasil = detect(gambar, conf)
    return {"jumlah": len(hasil), "hasil": hasil}