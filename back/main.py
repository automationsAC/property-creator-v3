from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from api.endpoints import airtable

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(airtable.router, prefix=f"{settings.API_V1_STR}/airtable", tags=["airtable"])

@app.get("/")
async def root():
    return {"message": "Welcome to Property Creator API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
