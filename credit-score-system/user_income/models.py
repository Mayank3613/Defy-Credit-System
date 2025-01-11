from django.db import models
from django.contrib.auth.models import User

# Define choices for months
MONTH_CHOICES = [
    ('January', 'January'),
    ('February', 'February'),
    ('March', 'March'),
    ('April', 'April'),
    ('May', 'May'),
    ('June', 'June'),
    ('July', 'July'),
    ('August', 'August'),
    ('September', 'September'),
    ('October', 'October'),
    ('November', 'November'),
    ('December', 'December'),
]

# Create your model
class UserIncome(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    main_income = models.FloatField()
    equity_profit = models.FloatField()
    crypto_profit = models.FloatField()
    rental_income = models.FloatField()
    which_month = models.CharField(max_length=50, choices=MONTH_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_income'
        verbose_name = 'User Income'
        verbose_name_plural = 'User Incomes'