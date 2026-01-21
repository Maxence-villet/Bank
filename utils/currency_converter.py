def centimes_to_euros(centimes: int) -> list[int, int]:
    euros = centimes // 100
    cents = centimes % 100
    return [euros, cents]

def euros_to_centimes(euros: int, cents: int) -> int:
    return euros * 100 + cents

def parse_euro_string(euro_string: str) -> int:
    if ',' not in euro_string:
            euros = int(euro_string)
            return euros * 100
    try:        
        euros_part, cents_part = euro_string.split(',')
        if len(cents_part) != 2:
            return {"error": "Invalid euro string, cents part must be 2 digits", "status_code": 403}
        euros = int(euros_part)
        cents = int(cents_part)
        return euros * 100 + cents
    except ValueError:
        return {"error": "Invalid euro string", "status_code": 403}
