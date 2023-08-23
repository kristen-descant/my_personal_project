from property_app.models import Property_Analysis, Property
from decimal import Decimal

def calculate_analysis(purchase_worksheet):

    def calculate_loan_payment(loan_amount, interest_rate, loan_term):
        if interest_rate == None:
            interest_rate = 0

        if loan_term == None:
            loan_term = 1

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
    total_expenses = purchase_worksheet.operating_expenses.total_expenses()
    noi = operating_income - total_expenses
    loan_payment = calculate_loan_payment(amount_financed, pw.interest_rate, pw.loan_term)
    cash_flow = noi - loan_payment
    cap_rate = (noi*12)/pw.purchase_price
    coc = (noi*12)/cash_needed

    cash_needed = round(cash_needed, 2)
    cash_flow = round(cash_flow, 2)
    cap_rate = round(cap_rate, 2)
    coc = round(coc, 2)
    ltv = round(ltv, 2)
    amount_financed = round(amount_financed, 2)
    loan_payment = round(loan_payment, 2)
    pricepersqft = round(pricepersqft, 2)
    arvpersqft = round(arvpersqft, 2)
    noi = round(noi, 2)
    purchase_cost_cash = round(purchase_cost_cash, 2)
    down_payment_cash = round(down_payment_cash, 2)
    operating_income = round(operating_income, 2)

    property_analysis = Property_Analysis.objects.get(matching_purchase_worksheet=purchase_worksheet)
    property_analysis.cash_needed = Decimal(cash_needed)
    property_analysis.cash_flow = Decimal(cash_flow)
    property_analysis.cap_rate = Decimal(cap_rate)
    property_analysis.coc = Decimal(coc)
    property_analysis.ltv = Decimal(ltv)
    property_analysis.amount_financed = Decimal(amount_financed)
    property_analysis.loan_payment = Decimal(loan_payment)
    property_analysis.pricepersqft = Decimal(pricepersqft)
    property_analysis.arvpersqft = Decimal(arvpersqft)
    property_analysis.noi = Decimal(noi)
    property_analysis.purchase_cost_cash = Decimal(purchase_cost_cash)
    property_analysis.down_payment_cash = Decimal(down_payment_cash)
    property_analysis.operating_income = Decimal(operating_income)
    property_analysis.full_clean()
    property_analysis.save()






