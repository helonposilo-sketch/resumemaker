from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from .models import UserProfile
import re

class SignUpForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})
    
    email = forms.EmailField(
        required=True,
        help_text="Must be a Gmail address (@gmail.com)"
    )
    first_name = forms.CharField(
        max_length=30, 
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'First Name'})
    )
    last_name = forms.CharField(
        max_length=30, 
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Last Name'})
    )
    phone_number = forms.CharField(
        max_length=10,
        required=True,
        validators=[RegexValidator(
            regex=r'^\d{10}$',
            message='Phone number must be exactly 10 digits'
        )],
        widget=forms.TextInput(attrs={
            'placeholder': '1234567890',
            'pattern': '[0-9]{10}',
            'title': 'Enter exactly 10 digits'
        })
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email and not email.endswith('@gmail.com'):
            raise forms.ValidationError('Email must be a Gmail address (@gmail.com)')
        return email

    def clean_first_name(self):
        first_name = self.cleaned_data.get('first_name')
        if not first_name or first_name.strip() == '':
            raise forms.ValidationError('First name is required')
        return first_name.strip()

    def clean_last_name(self):
        last_name = self.cleaned_data.get('last_name')
        if not last_name or last_name.strip() == '':
            raise forms.ValidationError('Last name is required')
        return last_name.strip()

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not username or username.strip() == '':
            raise forms.ValidationError('Username is required')
        return username.strip()

    def clean_phone_number(self):
        phone = self.cleaned_data.get('phone_number')
        if not phone:
            raise forms.ValidationError('Phone number is required')
        if not re.match(r'^\d{10}$', phone):
            raise forms.ValidationError('Phone number must be exactly 10 digits')
        return phone

    def clean_password1(self):
        password = self.cleaned_data.get('password1')
        if not password:
            raise forms.ValidationError('Password is required')
        
        # Check length
        if len(password) < 8:
            raise forms.ValidationError('Password must be at least 8 characters long')
        
        # Check for uppercase
        if not re.search(r'[A-Z]', password):
            raise forms.ValidationError('Password must contain at least one uppercase letter')
        
        # Check for lowercase
        if not re.search(r'[a-z]', password):
            raise forms.ValidationError('Password must contain at least one lowercase letter')
        
        # Check for digit
        if not re.search(r'\d', password):
            raise forms.ValidationError('Password must contain at least one digit')
        
        # Check for special character (including @)
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise forms.ValidationError('Password must contain at least one special character like @, !, #, $, etc.')
        
        return password

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        if commit:
            user.save()
            # Create user profile with phone number
            UserProfile.objects.create(
                user=user,
                phone_number=self.cleaned_data['phone_number']
            )
        return user