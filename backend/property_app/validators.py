from django.core.exceptions import ValidationError


def validate_state(state):
    state_abbreviations = [
    "AL", "AK", "AZ", "AR", "CA", 
    "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", 
    "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", 
    "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", 
    "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", 
    "VA", "WA", "WV", "WI", "WY"
    ]

    if state not in state_abbreviations:
        raise ValidationError('Improper state input.')