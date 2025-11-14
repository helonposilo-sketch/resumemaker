from django import forms
from .models import Resume, Education, Experience, Skill, Project, Certification, Language, Reference, CustomSection
from .widgets import BootstrapMixin

class ResumeForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['title', 'full_name', 'email', 'phone', 'address', 'summary', 'photo', 'template',
                  'primary_color', 'secondary_color', 'font_family', 'font_size', 'line_spacing']
        widgets = {
            'address': forms.Textarea(attrs={'rows': 3}),
            'summary': forms.Textarea(attrs={'rows': 4}),
            'template': forms.HiddenInput(),
            'primary_color': forms.TextInput(attrs={'type': 'color'}),
            'secondary_color': forms.TextInput(attrs={'type': 'color'}),
        }

class EducationForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Education
        fields = ['institution', 'degree', 'field_of_study', 'start_date', 'end_date', 'gpa']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }

class ExperienceForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Experience
        fields = ['company', 'position', 'start_date', 'end_date', 'description', 'is_current']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }

class SkillForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Skill
        fields = ['name', 'proficiency']


class ProjectForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'technologies', 'start_date', 'end_date', 'url', 'order']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 4, 'class': 'rich-editor'}),
            'order': forms.HiddenInput(),
        }


class CertificationForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Certification
        fields = ['name', 'issuing_organization', 'issue_date', 'expiration_date', 'credential_id', 'credential_url', 'order']
        widgets = {
            'issue_date': forms.DateInput(attrs={'type': 'date'}),
            'expiration_date': forms.DateInput(attrs={'type': 'date'}),
            'order': forms.HiddenInput(),
        }


class LanguageForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Language
        fields = ['name', 'proficiency', 'order']
        widgets = {
            'order': forms.HiddenInput(),
        }


class ReferenceForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = Reference
        fields = ['name', 'position', 'company', 'email', 'phone', 'relationship', 'order']
        widgets = {
            'order': forms.HiddenInput(),
        }


class CustomSectionForm(BootstrapMixin, forms.ModelForm):
    class Meta:
        model = CustomSection
        fields = ['title', 'content', 'order']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 6, 'class': 'rich-editor'}),
            'order': forms.HiddenInput(),
        }