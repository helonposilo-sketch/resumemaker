from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_regex = RegexValidator(
        regex=r'^\d{10}$',
        message="Phone number must be exactly 10 digits."
    )
    phone_number = models.CharField(
        validators=[phone_regex], 
        max_length=10, 
        help_text="Enter exactly 10 digits"
    )
    
    def __str__(self):
        return f"{self.user.username}'s Profile"
