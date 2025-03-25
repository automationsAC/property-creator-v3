from functools import lru_cache
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Property Creator API"

    # Airtable Settings
    AIRTABLE_API_KEY: str = "pat23pdIcm9pE5Wv7.f57e5d1a1c8ca582779bfd5b3c8bd73767a4a7496a0b09bd7a2a81c883f53400"
    AIRTABLE_BASE_ID: str = "appgjWMsS55n2vfEL"
    AIRTABLE_TABLE_ID: str = "tblxLb7zowdZafnMX"

    class Config:
        case_sensitive = True
        env_file = ".env"

@lru_cache()
def get_settings() -> Settings:
    """
    Returns cached settings object.
    Using lru_cache to cache the settings and avoid reading the .env file on every request.
    """
    return Settings()

# Create a global settings object
settings = get_settings()
