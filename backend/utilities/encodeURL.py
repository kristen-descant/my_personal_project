from urllib.parse import quote

def url_encode_address(address):
    encoded_address = quote(address)
    return encoded_address