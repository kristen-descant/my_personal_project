def check_complete_status(purchase_worksheet):
    fields_to_check = [
        purchase_worksheet.purchase_price,
        purchase_worksheet.interest_rate,
        purchase_worksheet.purchase_cost,
        purchase_worksheet.gross_rent,
        purchase_worksheet.arv,
        purchase_worksheet.down_payment,
        purchase_worksheet.loan_term,
        purchase_worksheet.rehab_cost,
        purchase_worksheet.vacancy_rate
    ]
    
    return all(field is not None for field in fields_to_check)
