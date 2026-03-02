from datetime import datetime
from backend.core.exceptions import BadRequest

def parse_date(param):
    try:
        return datetime.strptime(param, '%Y-%m-%d').date()
    except Exception:
        raise BadRequest(detail=f'Invalid date format for {param}')

def validate_date_range(start, end):
    if start > end:
        raise BadRequest(detail='start_date must be before end_date')
