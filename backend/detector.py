from pathlib import Path
from PIL import Image
from rfdetr import RFDETRMedium

WEIGHTS = Path(__file__).parent / "weights" / "checkpoint_best_total.pth"

ID_TO_NAME = {0: "plastic", 1: "styrofoam", 2: "textile",
              3: "metal", 4: "glass", 5: "paper"}

model = RFDETRMedium(pretrain_weights=str(WEIGHTS), num_classes=6)

def detect(image: Image.Image, conf: float = 0.3):
    det = model.predict(image.convert("RGB"), threshold=conf)
    hasil = []
    for box, cls, score in zip(det.xyxy, det.class_id, det.confidence):
        hasil.append({
            "label": ID_TO_NAME.get(int(cls), f"id{int(cls)}"),
            "confidence": round(float(score), 4),
            "box": [round(float(v), 1) for v in box],
        })
    return hasil