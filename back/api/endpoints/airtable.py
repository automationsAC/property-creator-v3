from fastapi import APIRouter, HTTPException
from typing import Dict, Any, Optional
from services.airtable_connector import airtable_service

router = APIRouter()

@router.post("/create")
async def create_airtable_record(fields: Dict[str, Any]):
    """
    Create a new record in Airtable with the specified fields.

    Args:
        fields (Dict[str, Any]): Dictionary containing field names and their values

    Returns:
        Dict[str, Any]: Created record data
    """
    try:
        result = await airtable_service.create_record(fields)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/update/{record_id}")
async def update_airtable_record(record_id: str, fields: Dict[str, Any]):
    """
    Update an existing record in Airtable with new field values.

    Args:
        record_id (str): The ID of the record to update
        fields (Dict[str, Any]): Dictionary containing field names and their new values

    Returns:
        Dict[str, Any]: Updated record data
    """
    try:
        result = await airtable_service.update_record(record_id, fields)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{record_id}")
async def get_airtable_record(record_id: str):
    """
    Retrieve a record from Airtable by its ID.

    Args:
        record_id (str): The ID of the record to retrieve

    Returns:
        Dict[str, Any]: Record data
    """
    try:
        result = await airtable_service.get_record(record_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{record_id}")
async def delete_airtable_record(record_id: str):
    """
    Delete a record from Airtable.

    Args:
        record_id (str): The ID of the record to delete

    Returns:
        Dict[str, Any]: Success message
    """
    try:
        await airtable_service.delete_record(record_id)
        return {"message": "Record deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
async def list_airtable_records(max_records: Optional[int] = None):
    """
    List all records from the Airtable table.

    Args:
        max_records (Optional[int]): Maximum number of records to return

    Returns:
        Dict[str, Any]: List of records and pagination info
    """
    try:
        result = await airtable_service.list_records(max_records)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
