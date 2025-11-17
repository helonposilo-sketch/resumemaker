from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('resumes/', views.resume_list, name='resume_list'),
    path('create/', views.create_resume, name='create_resume'),
    path('create-with-template/<str:template_name>/', views.create_with_template, name='create_with_template'),
    path('edit/<int:resume_id>/', views.edit_resume, name='edit_resume'),
    path('builder/<int:resume_id>/', views.builder_flowcv, name='builder_flowcv'),
    path('view/<int:resume_id>/', views.view_resume, name='view_resume'),
    path('clone/<int:resume_id>/', views.clone_resume, name='clone_resume'),
    
    # Section CRUD endpoints
    path('<int:resume_id>/add-education/', views.add_education, name='add_education'),
    path('<int:resume_id>/add-experience/', views.add_experience, name='add_experience'),
    path('<int:resume_id>/add-skill/', views.add_skill, name='add_skill'),
    path('<int:resume_id>/add-project/', views.add_project, name='add_project'),
    path('<int:resume_id>/add-certification/', views.add_certification, name='add_certification'),
    path('<int:resume_id>/add-language/', views.add_language, name='add_language'),
    path('<int:resume_id>/add-reference/', views.add_reference, name='add_reference'),
    path('<int:resume_id>/add-custom-section/', views.add_custom_section, name='add_custom_section'),
    
    # API endpoints
    path('api/save/<int:resume_id>/', views.api_save_resume, name='api_save_resume'),
    path('api/projects/<int:resume_id>/', views.api_projects, name='api_projects'),
    path('api/projects/add/<int:resume_id>/', views.api_add_project, name='api_add_project'),
    path('api/certifications/<int:resume_id>/', views.api_certifications, name='api_certifications'),
    path('api/certifications/add/<int:resume_id>/', views.api_add_certification, name='api_add_certification'),
    path('api/languages/<int:resume_id>/', views.api_languages, name='api_languages'),
    path('api/languages/add/<int:resume_id>/', views.api_add_language, name='api_add_language'),
    path('api/references/<int:resume_id>/', views.api_references, name='api_references'),
    path('api/references/add/<int:resume_id>/', views.api_add_reference, name='api_add_reference'),
    path('generate-pdf/<int:resume_id>/', views.generate_pdf, name='generate_pdf'),
]