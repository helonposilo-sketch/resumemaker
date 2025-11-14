from django.db import models
from django.contrib.auth.models import User

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    summary = models.TextField(blank=True)
    photo = models.ImageField(upload_to='resume_photos/', blank=True, null=True)
    template = models.CharField(max_length=50, default='colored')
    
    # Customization fields
    primary_color = models.CharField(max_length=7, default='#667eea')
    secondary_color = models.CharField(max_length=7, default='#764ba2')
    font_family = models.CharField(max_length=50, default='Arial', choices=[
        ('Arial', 'Arial'),
        ('Helvetica', 'Helvetica'),
        ('Times New Roman', 'Times New Roman'),
        ('Georgia', 'Georgia'),
        ('Calibri', 'Calibri'),
        ('Roboto', 'Roboto'),
    ])
    font_size = models.IntegerField(default=11)
    line_spacing = models.DecimalField(max_digits=3, decimal_places=1, default=1.4)
    section_order = models.JSONField(default=list, blank=True)  # Store order of sections
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.title}"

class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='education')
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"{self.degree} at {self.institution}"

class Experience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='experience')
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()
    is_current = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.position} at {self.company}"

class Skill(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=20, choices=[
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
        ('Expert', 'Expert')
    ])

    def __str__(self):
        return f"{self.name} - {self.proficiency}"

class LoginBackgroundVideo(models.Model):
    title = models.CharField(max_length=200, help_text="Title for the background video")
    video = models.FileField(
        upload_to='login_backgrounds/',
        help_text="Upload background video for login/registration pages. Supports 4K videos. Recommended formats: MP4, WebM"
    )
    is_active = models.BooleanField(default=False, help_text="Set as active background video")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Login Background Video"
        verbose_name_plural = "Login Background Videos"
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.title} {'(Active)' if self.is_active else ''}"
    
    def save(self, *args, **kwargs):
        # If this video is set as active, deactivate all others
        if self.is_active:
            LoginBackgroundVideo.objects.filter(is_active=True).update(is_active=False)
        super().save(*args, **kwargs)
    
    @classmethod
    def get_active_video(cls):
        """Get the currently active background video"""
        try:
            return cls.objects.filter(is_active=True).first()
        except cls.DoesNotExist:
            return None


class Project(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=500, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    url = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-start_date']
    
    def __str__(self):
        return self.title


class Certification(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='certifications')
    name = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    issue_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-issue_date']
    
    def __str__(self):
        return f"{self.name} - {self.issuing_organization}"


class Language(models.Model):
    PROFICIENCY_CHOICES = [
        ('Elementary', 'Elementary'),
        ('Limited Working', 'Limited Working'),
        ('Professional Working', 'Professional Working'),
        ('Full Professional', 'Full Professional'),
        ('Native', 'Native/Bilingual'),
    ]
    
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='languages')
    name = models.CharField(max_length=100)
    proficiency = models.CharField(max_length=30, choices=PROFICIENCY_CHOICES)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return f"{self.name} - {self.proficiency}"


class Reference(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='references')
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    relationship = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return f"{self.name} - {self.position}"


class CustomSection(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='custom_sections')
    title = models.CharField(max_length=200)
    content = models.TextField()
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'title']
    
    def __str__(self):
        return self.title