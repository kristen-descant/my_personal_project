from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from portfolio_app.models import Portfolio
from .validators import validate_state

# Create your models here.
class List_of_Properties(models.Model):
    list_name = models.CharField(max_length=30)

    def __str__(self):
        return self.list_name

class Property(models.Model):
    property_image = models.ImageField(upload_to='property_images/', default='property_images/temp_house.png')
    street = models.CharField()
    city = models.CharField()
    # For state, user will have to select from a list on the front end.
    state = models.CharField(validators=[validate_state])
    zip_code = models.PositiveIntegerField(validators=[MaxValueValidator(99999)], default=None)
    beds = models.PositiveIntegerField()
    baths = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    sqft = models.PositiveBigIntegerField()
    details = models.TextField(default="Property Description")
    portfolio = models.ForeignKey(Portfolio, related_name='properties', on_delete=models.CASCADE, null=True, blank=True)
    list_of_properties = models.ManyToManyField(List_of_Properties, related_name='properties', blank=True)

    def __str__(self) :
        return self.street


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

class Purchase_Worksheet(models.Model):
    matching_property = models.OneToOneField(Property, related_name='purchase_worksheet', on_delete=models.CASCADE, default=None)
    purchase_price = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    financing = models.BooleanField(default=True)
    interest_rate = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)])
    purchase_cost = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)])
    gross_rent = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    arv = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    down_payment = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)])
    loan_term = models.PositiveIntegerField(null=True, blank=True, validators=[MinValueValidator(1)])
    rehab_cost = models.DecimalField(null=True, blank=True, max_digits=10, decimal_places=2)
    vacancy_rate = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MaxValueValidator(1.00)])
    operating_expenses = models.OneToOneField(Operating_Expenses, related_name='purchase_worksheet', on_delete=models.CASCADE)