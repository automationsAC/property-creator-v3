from typing import Dict, Any, Optional
from pyairtable import Api
from config import settings

class AirtableService:
    def __init__(self):
        self.api = Api(settings.AIRTABLE_API_KEY)
        self.base = self.api.base(settings.AIRTABLE_BASE_ID)
        self.table = self.base.table(settings.AIRTABLE_TABLE_ID)

    async def create_record(self, fields: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new record in Airtable with the specified fields.

        Args:
            fields (Dict[str, Any]): Dictionary of field names and their values

        Returns:
            Dict[str, Any]: Created record data
        """
        try:
            record = self.table.create(fields)
            return record
        except Exception as e:
            raise Exception(f"Failed to create Airtable record: {str(e)}")

    async def update_record(self, record_id: str, fields: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update an existing record in Airtable with new field values.

        Args:
            record_id (str): The ID of the record to update
            fields (Dict[str, Any]): Dictionary of field names and their new values

        Returns:
            Dict[str, Any]: Updated record data
        """
        try:
            record = self.table.update(record_id, fields)
            return record
        except Exception as e:
            raise Exception(f"Failed to update Airtable record: {str(e)}")

    async def get_record(self, record_id: str) -> Dict[str, Any]:
        """
        Retrieve a record from Airtable by its ID.

        Args:
            record_id (str): The ID of the record to retrieve

        Returns:
            Dict[str, Any]: Record data
        """
        try:
            record = self.table.get(record_id)
            return record
        except Exception as e:
            raise Exception(f"Failed to get Airtable record: {str(e)}")

    async def delete_record(self, record_id: str) -> bool:
        """
        Delete a record from Airtable.

        Args:
            record_id (str): The ID of the record to delete

        Returns:
            bool: True if deletion was successful
        """
        try:
            self.table.delete(record_id)
            return True
        except Exception as e:
            raise Exception(f"Failed to delete Airtable record: {str(e)}")

    async def list_records(self, max_records: Optional[int] = None) -> Dict[str, Any]:
        """
        List all records from the Airtable table.

        Args:
            max_records (Optional[int]): Maximum number of records to return

        Returns:
            Dict[str, Any]: List of records and pagination info
        """
        try:
            records = self.table.all(max_records=max_records)
            return records
        except Exception as e:
            raise Exception(f"Failed to list Airtable records: {str(e)}")

# Create a singleton instance
airtable_service = AirtableService()
