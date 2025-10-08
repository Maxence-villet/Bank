def centimes_to_euros(centimes: int) -> list[int, int]:
    euros = centimes // 100
    cents = centimes % 100
    return [euros, cents]

def euros_to_centimes(euros: int, cents: int) -> int:
    return euros * 100 + cents

