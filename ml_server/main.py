from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import numpy as np, cv2, base64, os, traceback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Use relative path for model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best.pt")
print("MODEL_PATH:", MODEL_PATH, "exists:", os.path.exists(MODEL_PATH))

# Set environment variable to allow unsafe loading (temporary fix)
os.environ['TORCH_WEIGHTS_ONLY'] = '0'

model = YOLO(MODEL_PATH)

@app.get("/")
def root():
    return {"status": "ML service running", "model_loaded": True}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/detect")
async def detect(image: UploadFile = File(...)):
    try:
        data = await image.read()
        img = cv2.imdecode(np.frombuffer(data, np.uint8), cv2.IMREAD_COLOR)
        r = model(img, imgsz=640, conf=0.25, verbose=False)[0]
        annotated = r.plot()
        ok, buf = cv2.imencode(".jpg", annotated)
        if not ok:
            return {"error": "encode_failed"}
        b64img = base64.b64encode(buf.tobytes()).decode("utf-8")
        names = r.names if hasattr(r, "names") else model.names
        dets = []
        if r.boxes is not None:
            for xyxy, cls, conf in zip(
                r.boxes.xyxy.tolist(), 
                r.boxes.cls.tolist(), 
                r.boxes.conf.tolist()
            ):
                dets.append({
                    "bbox": xyxy,
                    "label": names[int(cls)],
                    "conf": float(conf)
                })
        return {"detections": dets, "image": b64img}
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}