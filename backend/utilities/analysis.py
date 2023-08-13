from property_app.models import Property_Analysis, Property

def calculate_analysis(purchase_worksheet):

    def calculate_loan_payment(loan_amount, interest_rate, loan_term):
        monthly_interest_rate = interest_rate / 12 / 100
        total_months = loan_term*12

        numerator = loan_amount * monthly_interest_rate * (1 + monthly_interest_rate) ** total_months
        denominator = (1 + monthly_interest_rate) ** total_months - 1

        monthly_payment = numerator / denominator
        return monthly_payment

    a_property = Property.objects.get(purchase_worksheet=purchase_worksheet)
    pw = purchase_worksheet
    ltv = 1 - pw.down_payment
    amount_financed = ltv * pw.purchase_price
    down_payment_cash = pw.purchase_price * pw.down_payment
    pricepersqft = pw.purchase_price/a_property.sqft
    arvpersqft = pw.arv/a_property.sqft
    purchase_cost_cash = pw.purchase_price * pw.purchase_cost
    cash_needed = down_payment_cash + purchase_cost_cash + pw.rehab_cost
    operating_income = pw.gross_rent * (1 - pw.vacancy_rate)
    noi = pw.operating_expenses.total_expenses
    loan_payment = calculate_loan_payment(amount_financed, pw.interest_rate, pw.loan_term)
    cash_flow = noi - loan_payment
    cap_rate = (noi*12)/pw.purchase_price
    coc = (noi*12)/cash_needed