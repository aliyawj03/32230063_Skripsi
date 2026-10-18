from pydantic import BaseModel

class Detection(BaseModel):
    label: str
    confidence: float
    box: list[float]  # [x1, y1, x2, y2]

class PredictResponse(BaseModel):
    detections: list[Detection]