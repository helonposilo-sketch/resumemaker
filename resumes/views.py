from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.template.loader import render_to_string
import json
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration
import tempfile
import os
from .models import Resume, Education, Experience, Skill, Project, Certification, Language, Reference, CustomSection
from .forms import (ResumeForm, EducationForm, ExperienceForm, SkillForm,
                    ProjectForm, CertificationForm, LanguageForm, ReferenceForm, CustomSectionForm)

def home(request):
    return render(request, 'resumes/home.html')

@login_required
def resume_list(request):
    resumes = Resume.objects.filter(user=request.user)
    return render(request, 'resumes/resume_list.html', {'resumes': resumes})

@login_required
def create_resume(request):
    if request.method == 'POST':
        form = ResumeForm(request.POST)
        if form.is_valid():
            resume = form.save(commit=False)
            resume.user = request.user
            resume.save()
            messages.success(request, 'Resume created successfully!')
            return redirect('edit_resume', resume_id=resume.id)
    else:
        form = ResumeForm()
    return render(request, 'resumes/create_resume.html', {'form': form})

@login_required
def edit_resume(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = ResumeForm(request.POST, instance=resume)
        if form.is_valid():
            form.save()
            messages.success(request, 'Resume updated successfully!')
            return redirect('edit_resume', resume_id=resume.id)
    else:
        form = ResumeForm(instance=resume)
    
    context = {
        'resume': resume,
        'form': form,
        'education_list': resume.education.all(),
        'experience_list': resume.experience.all(),
        'skills_list': resume.skills.all(),
    }
    return render(request, 'resumes/edit_resume.html', context)

@login_required
def add_education(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = EducationForm(request.POST)
        if form.is_valid():
            education = form.save(commit=False)
            education.resume = resume
            education.save()
            messages.success(request, 'Education added successfully!')
            return redirect('edit_resume', resume_id=resume.id)
    else:
        form = EducationForm()
    
    return render(request, 'resumes/add_education.html', {'form': form, 'resume': resume})

@login_required
def add_experience(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = ExperienceForm(request.POST)
        if form.is_valid():
            experience = form.save(commit=False)
            experience.resume = resume
            experience.save()
            messages.success(request, 'Experience added successfully!')
            return redirect('edit_resume', resume_id=resume.id)
    else:
        form = ExperienceForm()
    
    return render(request, 'resumes/add_experience.html', {'form': form, 'resume': resume})

@login_required
def add_skill(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = SkillForm(request.POST)
        if form.is_valid():
            skill = form.save(commit=False)
            skill.resume = resume
            skill.save()
            messages.success(request, 'Skill added successfully!')
            return redirect('edit_resume', resume_id=resume.id)
    else:
        form = SkillForm()
    
    return render(request, 'resumes/add_skill.html', {'form': form, 'resume': resume})

@login_required
def view_resume(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    return render(request, 'resumes/view_resume.html', {'resume': resume})

@login_required
def create_with_template(request, template_name):
    if request.method == 'POST':
        form = ResumeForm(request.POST, request.FILES)
        if form.is_valid():
            resume = form.save(commit=False)
            resume.user = request.user
            resume.template = template_name
            resume.save()
            
            # Handle experiences
            experiences_json = request.POST.get('experiences', '[]')
            try:
                experiences = json.loads(experiences_json)
                for exp_data in experiences:
                    if exp_data.get('position') or exp_data.get('company'):
                        Experience.objects.create(
                            resume=resume,
                            position=exp_data.get('position', ''),
                            company=exp_data.get('company', ''),
                            start_date=exp_data.get('start_date') or None,
                            end_date=exp_data.get('end_date') or None,
                            description=exp_data.get('description', ''),
                            is_current=not exp_data.get('end_date')
                        )
            except json.JSONDecodeError:
                pass
            
            # Handle educations
            educations_json = request.POST.get('educations', '[]')
            try:
                educations = json.loads(educations_json)
                for edu_data in educations:
                    if edu_data.get('degree') or edu_data.get('institution'):
                        Education.objects.create(
                            resume=resume,
                            degree=edu_data.get('degree', ''),
                            institution=edu_data.get('institution', ''),
                            field_of_study=edu_data.get('field_of_study', ''),
                            end_date=edu_data.get('end_date') or None
                        )
            except json.JSONDecodeError:
                pass
            
            # Handle skills
            skills_json = request.POST.get('skills', '[]')
            try:
                skills = json.loads(skills_json)
                for skill_data in skills:
                    if skill_data.get('name'):
                        Skill.objects.create(
                            resume=resume,
                            name=skill_data.get('name', ''),
                            proficiency=skill_data.get('proficiency', 'Intermediate')
                        )
            except json.JSONDecodeError:
                pass
            
            messages.success(request, f'Resume created with {template_name} template!')
            
            # Handle AJAX request
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': True,
                    'redirect_url': f'/builder/{resume.id}/'
                })
            
            return redirect('builder_flowcv', resume_id=resume.id)
    else:
        form = ResumeForm()
    
    context = {
        'form': form,
        'template_name': template_name,
        'template_display': template_name.replace('-', ' ').title()
    }
    return render(request, 'resumes/create_with_template.html', context)


@login_required
def builder_flowcv(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    context = {
        'resume': resume,
        'education_list': resume.education.all(),
        'experience_list': resume.experience.all(),
        'skills_list': resume.skills.all(),
        'projects_list': resume.projects.all(),
        'certifications_list': resume.certifications.all(),
        'languages_list': resume.languages.all(),
        'references_list': resume.references.all(),
        'custom_sections_list': resume.custom_sections.all(),
    }
    return render(request, 'resumes/builder_flowcv.html', context)


@login_required
@require_http_methods(["POST"])
def api_save_resume(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    try:
        data = json.loads(request.body)
        
        # Update resume fields
        if 'full_name' in data:
            resume.full_name = data['full_name']
        if 'email' in data:
            resume.email = data['email']
        if 'phone' in data:
            resume.phone = data['phone']
        if 'address' in data:
            resume.address = data['address']
        if 'summary' in data:
            resume.summary = data['summary']
        if 'primary_color' in data:
            resume.primary_color = data['primary_color']
        if 'secondary_color' in data:
            resume.secondary_color = data['secondary_color']
        if 'font_family' in data:
            resume.font_family = data['font_family']
        if 'font_size' in data:
            resume.font_size = data['font_size']
        if 'section_order' in data:
            resume.section_order = data['section_order']
        if 'template' in data:
            resume.template = data['template']

        resume.save()
        
        return JsonResponse({'success': True, 'message': 'Resume saved successfully'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@login_required
def add_project(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = ProjectForm(request.POST)
        if form.is_valid():
            project = form.save(commit=False)
            project.resume = resume
            project.save()
            messages.success(request, 'Project added successfully!')
            return redirect('builder_flowcv', resume_id=resume.id)
    else:
        form = ProjectForm()
    
    return render(request, 'resumes/add_project.html', {'form': form, 'resume': resume})


@login_required
def add_certification(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = CertificationForm(request.POST)
        if form.is_valid():
            certification = form.save(commit=False)
            certification.resume = resume
            certification.save()
            messages.success(request, 'Certification added successfully!')
            return redirect('builder_flowcv', resume_id=resume.id)
    else:
        form = CertificationForm()
    
    return render(request, 'resumes/add_certification.html', {'form': form, 'resume': resume})


@login_required
def add_language(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = LanguageForm(request.POST)
        if form.is_valid():
            language = form.save(commit=False)
            language.resume = resume
            language.save()
            messages.success(request, 'Language added successfully!')
            return redirect('builder_flowcv', resume_id=resume.id)
    else:
        form = LanguageForm()
    
    return render(request, 'resumes/add_language.html', {'form': form, 'resume': resume})


@login_required
def add_reference(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = ReferenceForm(request.POST)
        if form.is_valid():
            reference = form.save(commit=False)
            reference.resume = resume
            reference.save()
            messages.success(request, 'Reference added successfully!')
            return redirect('builder_flowcv', resume_id=resume.id)
    else:
        form = ReferenceForm()
    
    return render(request, 'resumes/add_reference.html', {'form': form, 'resume': resume})


@login_required
def add_custom_section(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    if request.method == 'POST':
        form = CustomSectionForm(request.POST)
        if form.is_valid():
            custom_section = form.save(commit=False)
            custom_section.resume = resume
            custom_section.save()
            messages.success(request, 'Custom section added successfully!')
            return redirect('builder_flowcv', resume_id=resume.id)
    else:
        form = CustomSectionForm()
    
    return render(request, 'resumes/add_custom_section.html', {'form': form, 'resume': resume})


@login_required
def clone_resume(request, resume_id):
    original_resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    
    # Clone the resume
    new_resume = Resume.objects.create(
        user=request.user,
        title=f"{original_resume.title} (Copy)",
        full_name=original_resume.full_name,
        email=original_resume.email,
        phone=original_resume.phone,
        address=original_resume.address,
        summary=original_resume.summary,
        template=original_resume.template,
        primary_color=original_resume.primary_color,
        secondary_color=original_resume.secondary_color,
        font_family=original_resume.font_family,
        font_size=original_resume.font_size,
        line_spacing=original_resume.line_spacing,
    )
    
    # Clone related objects
    for edu in original_resume.education.all():
        Education.objects.create(
            resume=new_resume,
            institution=edu.institution,
            degree=edu.degree,
            field_of_study=edu.field_of_study,
            start_date=edu.start_date,
            end_date=edu.end_date,
            gpa=edu.gpa
        )
    
    for exp in original_resume.experience.all():
        Experience.objects.create(
            resume=new_resume,
            company=exp.company,
            position=exp.position,
            start_date=exp.start_date,
            end_date=exp.end_date,
            description=exp.description,
            is_current=exp.is_current
        )
    
    for skill in original_resume.skills.all():
        Skill.objects.create(
            resume=new_resume,
            name=skill.name,
            proficiency=skill.proficiency
        )
    
    messages.success(request, 'Resume cloned successfully!')
    return redirect('builder_flowcv', resume_id=new_resume.id)


# API Endpoints for Advanced Sections
@login_required
def api_projects(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    projects = resume.projects.all().values()

    return JsonResponse({
        'success': True,
        'items': list(projects)
    })

@login_required
@require_http_methods(["POST"])
def api_add_project(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)

    try:
        data = json.loads(request.body)

        project = Project.objects.create(
            resume=resume,
            title=data.get('title', ''),
            description=data.get('description', ''),
            technologies=data.get('technologies', ''),
            url=data.get('url', ''),
            start_date=data.get('start_date') or None,
            end_date=data.get('end_date') or None
        )

        return JsonResponse({'success': True, 'id': project.id})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)

@login_required
def api_certifications(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    certifications = resume.certifications.all().values()

    return JsonResponse({
        'success': True,
        'items': list(certifications)
    })

@login_required
@require_http_methods(["POST"])
def api_add_certification(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)

    try:
        data = json.loads(request.body)

        certification = Certification.objects.create(
            resume=resume,
            certification_name=data.get('certification_name', ''),
            issuing_organization=data.get('issuing_organization', ''),
            issue_date=data.get('issue_date') or None,
            expiration_date=data.get('expiration_date') or None,
            credential_id=data.get('credential_id', ''),
            credential_url=data.get('credential_url', '')
        )

        return JsonResponse({'success': True, 'id': certification.id})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)

@login_required
def api_languages(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    languages = resume.languages.all().values()

    return JsonResponse({
        'success': True,
        'items': list(languages)
    })

@login_required
@require_http_methods(["POST"])
def api_add_language(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)

    try:
        data = json.loads(request.body)

        language = Language.objects.create(
            resume=resume,
            name=data.get('name', ''),
            proficiency=data.get('proficiency', 'Elementary')
        )

        return JsonResponse({'success': True, 'id': language.id})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)

@login_required
def api_references(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)
    references = resume.references.all().values()

    return JsonResponse({
        'success': True,
        'items': list(references)
    })

@login_required
@require_http_methods(["POST"])
def api_add_reference(request, resume_id):
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)

    try:
        data = json.loads(request.body)

        reference = Reference.objects.create(
            resume=resume,
            name=data.get('name', ''),
            position=data.get('position', ''),
            company=data.get('company', ''),
            email=data.get('email', ''),
            phone=data.get('phone', ''),
            relationship=data.get('relationship', '')
        )

        return JsonResponse({'success': True, 'id': reference.id})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)


@login_required
def generate_pdf(request, resume_id):
    """Generate professional PDF from resume using WeasyPrint"""
    resume = get_object_or_404(Resume, id=resume_id, user=request.user)

    # Get all resume data
    education_list = resume.education.all()
    experience_list = resume.experience.all()
    skills_list = resume.skills.all()
    projects_list = resume.projects.all()
    certifications_list = resume.certifications.all()
    languages_list = resume.languages.all()
    references_list = resume.references.all()

    # Render HTML template with print styles
    html_string = render_to_string('resumes/print_pdf.html', {
        'resume': resume,
        'education_list': education_list,
        'experience_list': experience_list,
        'skills_list': skills_list,
        'projects_list': projects_list,
        'certifications_list': certifications_list,
        'languages_list': languages_list,
        'references_list': references_list,
        'primary_color': resume.primary_color,
        'secondary_color': resume.secondary_color,
        'font_family': resume.font_family,
        'font_size': resume.font_size,
        'line_spacing': resume.line_spacing,
    })

    # Custom CSS for print
    css_string = f"""
        @page {{
            size: A4;
            margin: 20mm;
            @bottom-right {{
                content: "Page " counter(page);
                font-size: 10px;
                color: #666;
            }}
        }}

        body {{
            font-family: {resume.font_family}, sans-serif;
            font-size: {resume.font_size}pt;
            line-height: {resume.line_spacing};
            color: #333;
        }}

        .resume-header {{
            border-bottom: 2px solid {resume.primary_color};
            padding-bottom: 20px;
            margin-bottom: 30px;
        }}

        .resume-name {{
            font-size: 28px;
            font-weight: bold;
            color: #111;
            margin-bottom: 8px;
        }}

        .resume-contact {{
            font-size: 11px;
            color: #666;
            margin-bottom: 5px;
        }}

        .resume-section-title {{
            color: {resume.primary_color};
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 25px;
            margin-bottom: 15px;
            border-bottom: 1px solid {resume.primary_color};
            padding-bottom: 5px;
        }}

        .resume-item {{
            margin-bottom: 15px;
            page-break-inside: avoid;
        }}

        .item-header {{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }}

        .item-title {{
            font-weight: bold;
            font-size: 14px;
            color: #111;
        }}

        .item-subtitle {{
            font-size: 12px;
            color: #666;
            font-style: italic;
        }}

        .item-date {{
            font-size: 11px;
            color: #888;
            white-space: nowrap;
        }}

        .item-description {{
            font-size: 12px;
            line-height: 1.4;
            margin: 5px 0;
        }}

        .skills-grid {{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 10px 0;
        }}

        .skill-badge {{
            background: {resume.primary_color}20;
            color: {resume.primary_color};
            border: 1px solid {resume.primary_color}40;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
        }}

        a {{
            color: {resume.primary_color};
            text-decoration: none;
        }}
    """

    try:
        # Generate PDF
        html = HTML(string=html_string)
        css = CSS(string=css_string)
        pdf = html.write_pdf(stylesheets=[css])

        # Create response
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = f"{resume.full_name.replace(' ', '_')}_resume.pdf"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        response['Content-Length'] = len(pdf)

        return response

    except Exception as e:
        messages.error(request, f'Error generating PDF: {str(e)}')
        return redirect('builder_flowcv', resume_id=resume.id)