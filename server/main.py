from fastapi import FastAPI
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

from sockets import sio_app

# App
app = FastAPI()

# Mount SocketIO
app.mount("/", app=sio_app)

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)

# Routes
@app.get("/")
async def home():
    return {"message" : "Hello world!"}

if __name__ == "__main__":
    uvicorn.run('main:app', reload=True)
