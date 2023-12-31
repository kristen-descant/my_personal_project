from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator
from portfolio_app.models import Portfolio
from .validators import validate_state
from user_app.models import User

# Create your models here.
class List_of_Properties(models.Model):
    list_name = models.CharField(max_length=30)
    user = models.ForeignKey(User, related_name='lists_of_properties', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.list_name

class Property(models.Model):
    address = models.TextField(null=True, blank=True)
    beds = models.PositiveIntegerField(validators=[MaxValueValidator(6)])
    baths = models.DecimalField(validators=[MinValueValidator(1.0), MaxValueValidator(1.5)], decimal_places=1, max_digits=2)
    sqft = models.PositiveBigIntegerField()
    details = models.TextField(default="Property Description", null=True, blank=True)
    portfolio = models.ForeignKey(Portfolio, related_name='properties', on_delete=models.CASCADE, null=True, blank=True)
    list_of_properties = models.ManyToManyField(List_of_Properties, related_name='properties', blank=True)

    def __str__(self) :
        return self.address
    

class Property_Analysis(models.Model):
    cash_needed = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cash_flow = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cap_rate = models.DecimalField(max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)], default=0.00)
    coc = models.DecimalField(max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)], default=0.00)
    ltv = models.DecimalField(max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)], default=0.00)
    amount_financed = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    pricepersqft = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    arvpersqft = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    noi = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    loan_payment = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    purchase_cost_cash = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    down_payment_cash = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    operating_income = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class Operating_Expenses(models.Model):
    property_taxes = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    insurance = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    property_management = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)])
    maintenance = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)])
    cap_ex = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)])
    hoa_fees = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    utilities = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    landscaping = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    other_exp = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)

    def total_expenses(self):
        fields = [
            self.property_taxes,
            self.insurance,
            self.property_management,
            self.maintenance,
            self.cap_ex,
            self.hoa_fees,
            self.utilities,
            self.landscaping,
            self.other_exp
        ]
        return sum(field for field in fields if field is not None)

class Purchase_Worksheet(models.Model):
    completed = models.BooleanField(default=False)
    matching_property = models.OneToOneField(Property, related_name='purchase_worksheet', on_delete=models.CASCADE, default=None)
    purchase_price = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    financing = models.BooleanField(default=True)
    interest_rate = models.DecimalField(null=True, blank=True, max_digits=4, decimal_places=3, validators=[MaxValueValidator(1.00)])
    purchase_cost = models.DecimalField(null=True, blank=True, max_digits=4, decimal_places=3, validators=[MaxValueValidator(1.00)])
    gross_rent = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    arv = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    down_payment = models.DecimalField(null=True, blank=True, max_digits=4, decimal_places=3, validators=[MaxValueValidator(1.00)])
    loan_term = models.PositiveIntegerField(null=True, blank=True, validators=[MinValueValidator(1)])
    rehab_cost = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    vacancy_rate = models.DecimalField(null=True, blank=True, max_digits=4, decimal_places=3, validators=[MaxValueValidator(1.00)])
    operating_expenses = models.OneToOneField(Operating_Expenses, related_name='purchase_worksheet', on_delete=models.CASCADE)
    property_analysis = models.OneToOneField(Property_Analysis, related_name='matching_purchase_worksheet', on_delete=models.CASCADE, default=None)

