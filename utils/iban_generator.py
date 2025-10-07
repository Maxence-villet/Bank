def generate_iban() -> str:
    unique_id = uuid4().int >> 64
    return f"FR{unique_id:022d}"