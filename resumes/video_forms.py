from django import forms
from django.core.exceptions import ValidationError
from .models import LoginBackgroundVideo
import os

class LoginBackgroundVideoForm(forms.ModelForm):
    class Meta:
        model = LoginBackgroundVideo
        fields = ['title', 'video', 'is_active']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter video title'
            }),
            'video': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': 'video/mp4,video/webm,video/avi,video/mov'
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            })
        }
    
    def clean_video(self):
        video = self.cleaned_data.get('video')
        
        if video:
            # Check file size (max 2GB for 4K videos)
            max_size = 2 * 1024 * 1024 * 1024  # 2GB
            if video.size > max_size:
                raise ValidationError(f'Video file too large. Maximum size is 2GB. Current size: {video.size / (1024*1024*1024):.1f}GB')
            
            # Check file extension
            valid_extensions = ['.mp4', '.webm', '.avi', '.mov', '.mkv']
            ext = os.path.splitext(video.name)[1].lower()
            if ext not in valid_extensions:
                raise ValidationError(f'Invalid file type. Supported formats: {", ".join(valid_extensions)}')
            
            # Check minimum file size (to avoid empty files)
            min_size = 1024 * 1024  # 1MB
            if video.size < min_size:
                raise ValidationError('Video file too small. Minimum size is 1MB.')
        
        return video
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        
        # If this video is set as active, deactivate others
        if instance.is_active and commit:
            LoginBackgroundVideo.objects.filter(is_active=True).update(is_active=False)
        
        if commit:
            instance.save()
        
        return instance