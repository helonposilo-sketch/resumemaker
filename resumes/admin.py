from django.contrib import admin
from .models import Resume, Education, Experience, Skill, LoginBackgroundVideo, Project, Certification, Language, Reference, CustomSection
from .video_forms import LoginBackgroundVideoForm

class EducationInline(admin.TabularInline):
    model = Education
    extra = 1

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 1

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1

class ProjectInline(admin.TabularInline):
    model = Project
    extra = 1

class CertificationInline(admin.TabularInline):
    model = Certification
    extra = 1

class LanguageInline(admin.TabularInline):
    model = Language
    extra = 1

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'title', 'user', 'template', 'created_at']
    list_filter = ['created_at', 'updated_at', 'template']
    search_fields = ['full_name', 'title', 'user__username']
    inlines = [EducationInline, ExperienceInline, SkillInline, ProjectInline, CertificationInline, LanguageInline]

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['institution', 'degree', 'resume']
    list_filter = ['start_date', 'end_date']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['company', 'position', 'resume', 'is_current']
    list_filter = ['start_date', 'end_date', 'is_current']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'proficiency', 'resume']
    list_filter = ['proficiency']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'resume', 'start_date', 'end_date']
    list_filter = ['start_date', 'end_date']
    search_fields = ['title', 'description', 'technologies']

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['name', 'issuing_organization', 'resume', 'issue_date']
    list_filter = ['issue_date', 'expiration_date']
    search_fields = ['name', 'issuing_organization']

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['name', 'proficiency', 'resume']
    list_filter = ['proficiency']
    search_fields = ['name']

@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'company', 'resume']
    search_fields = ['name', 'position', 'company']

@admin.register(CustomSection)
class CustomSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'resume', 'order']
    list_filter = ['created_at']
    search_fields = ['title', 'content']

@admin.register(LoginBackgroundVideo)
class LoginBackgroundVideoAdmin(admin.ModelAdmin):
    form = LoginBackgroundVideoForm
    list_display = ['title', 'is_active', 'uploaded_at', 'video_size']
    list_filter = ['is_active', 'uploaded_at']
    search_fields = ['title']
    readonly_fields = ['uploaded_at', 'video_info']
    actions = ['activate_video', 'deactivate_video']
    
    fieldsets = (
        ('Video Information', {
            'fields': ('title', 'video', 'is_active')
        }),
        ('Details', {
            'fields': ('uploaded_at', 'video_info'),
            'classes': ('collapse',)
        }),
    )
    
    def video_size(self, obj):
        if obj.video:
            try:
                size = obj.video.size
                if size < 1024*1024:
                    return f"{size/1024:.1f} KB"
                elif size < 1024*1024*1024:
                    return f"{size/(1024*1024):.1f} MB"
                else:
                    return f"{size/(1024*1024*1024):.1f} GB"
            except:
                return "Unknown"
        return "No video"
    video_size.short_description = "File Size"
    
    def video_info(self, obj):
        if obj.video:
            return f"File: {obj.video.name}\nSize: {self.video_size(obj)}"
        return "No video uploaded"
    video_info.short_description = "Video Information"
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if obj.is_active:
            LoginBackgroundVideo.objects.exclude(id=obj.id).update(is_active=False)
    
    def activate_video(self, request, queryset):
        # Deactivate all videos first
        LoginBackgroundVideo.objects.update(is_active=False)
        # Activate the first selected video
        if queryset.exists():
            video = queryset.first()
            video.is_active = True
            video.save()
            self.message_user(request, f"'{video.title}' is now the active background video.")
        else:
            self.message_user(request, "No video selected.", level='ERROR')
    activate_video.short_description = "Set as active background video"
    
    def deactivate_video(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} video(s) deactivated.")
    deactivate_video.short_description = "Deactivate selected videos"