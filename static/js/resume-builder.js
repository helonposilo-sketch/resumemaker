// Professional Resume Builder JavaScript
let experienceCount = 0;
let educationCount = 0;
let skillCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form listeners
    initializeFormListeners();
    
    // Add sample data for testing
    addSampleData();
    
    // Template selection
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            updatePreview();
        });
    });
});

function addSampleData() {
    // Add multiple sample experiences
    addExperience();
    setTimeout(() => {
        document.getElementById('exp_position_1').value = 'Senior Software Engineer';
        document.getElementById('exp_company_1').value = 'Tech Solutions Inc.';
        document.getElementById('exp_start_1').value = '2020-01-15';
        document.getElementById('exp_end_1').value = '2024-11-01';
        document.getElementById('exp_desc_1').value = 'Led development of scalable web applications using React and Node.js. Managed a team of 5 developers and improved system performance by 40%.';
    }, 100);
    
    addExperience();
    setTimeout(() => {
        document.getElementById('exp_position_2').value = 'Full Stack Developer';
        document.getElementById('exp_company_2').value = 'Digital Innovations LLC';
        document.getElementById('exp_start_2').value = '2018-06-01';
        document.getElementById('exp_end_2').value = '2019-12-31';
        document.getElementById('exp_desc_2').value = 'Developed responsive web applications and RESTful APIs. Collaborated with design team to implement user-friendly interfaces.';
    }, 200);
    
    // Add multiple sample education
    addEducation();
    setTimeout(() => {
        document.getElementById('edu_degree_1').value = 'Bachelor of Computer Science';
        document.getElementById('edu_institution_1').value = 'University of Technology';
        document.getElementById('edu_field_1').value = 'Computer Science';
        document.getElementById('edu_end_1').value = '2019-05-15';
    }, 300);
    
    addEducation();
    setTimeout(() => {
        document.getElementById('edu_degree_2').value = 'Master of Software Engineering';
        document.getElementById('edu_institution_2').value = 'Tech Institute';
        document.getElementById('edu_field_2').value = 'Software Engineering';
        document.getElementById('edu_end_2').value = '2021-12-15';
    }, 400);
    
    // Add multiple sample skills
    addSkill();
    setTimeout(() => {
        document.getElementById('skill_name_1').value = 'JavaScript';
        document.getElementById('skill_level_1').value = 'Expert';
    }, 500);
    
    addSkill();
    setTimeout(() => {
        document.getElementById('skill_name_2').value = 'React';
        document.getElementById('skill_level_2').value = 'Advanced';
    }, 600);
    
    addSkill();
    setTimeout(() => {
        document.getElementById('skill_name_3').value = 'Node.js';
        document.getElementById('skill_level_3').value = 'Advanced';
    }, 700);
    
    addSkill();
    setTimeout(() => {
        document.getElementById('skill_name_4').value = 'Python';
        document.getElementById('skill_level_4').value = 'Intermediate';
    }, 800);
    
    addSkill();
    setTimeout(() => {
        document.getElementById('skill_name_5').value = 'AWS';
        document.getElementById('skill_level_5').value = 'Advanced';
    }, 900);
    
    addSkill();
    setTimeout(() => {
        document.getElementById('skill_name_6').value = 'MongoDB';
        document.getElementById('skill_level_6').value = 'Intermediate';
    }, 1000);
}

function initializeFormListeners() {
    // Personal information listeners
    const personalFields = ['title', 'full_name', 'email', 'phone', 'address', 'summary'];
    personalFields.forEach(field => {
        const element = document.getElementById(`id_${field}`);
        if (element) {
            element.addEventListener('input', updatePreview);
        }
    });
    
    // Photo upload listener
    const photoInput = document.getElementById('id_photo');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    window.uploadedImageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function updatePreview() {
    try {
        // Update personal information with safe DOM access
        const fullName = document.getElementById('id_full_name')?.value || 'Your Name';
        const email = document.getElementById('id_email')?.value || 'email@example.com';
        const phone = document.getElementById('id_phone')?.value || '+1 (555) 123-4567';
        const address = document.getElementById('id_address')?.value || 'City, State';
        const summary = document.getElementById('id_summary')?.value;
        
        // Safe update with null checks
        const previewName = document.getElementById('preview-name');
        const previewEmail = document.getElementById('preview-email');
        const previewPhone = document.getElementById('preview-phone');
        const previewAddress = document.getElementById('preview-address');
        
        if (previewName) previewName.textContent = fullName;
        if (previewEmail) previewEmail.textContent = email;
        if (previewPhone) previewPhone.textContent = phone;
        if (previewAddress) previewAddress.textContent = address;
        
        // Update summary
        const summarySection = document.getElementById('summary-section');
        const previewSummary = document.getElementById('preview-summary');
        if (previewSummary && summary && summary.trim()) {
            previewSummary.textContent = summary;
            if (summarySection) summarySection.style.display = 'block';
        } else {
            if (summarySection) summarySection.style.display = 'none';
        }
        
        updateExperiencePreview();
        updateEducationPreview();
        updateSkillsPreview();
    } catch (error) {
        console.error('Error updating preview:', error);
    }
}

function addExperience() {
    experienceCount++;
    const experienceHtml = `
        <div class="experience-item mb-3 p-3 border rounded" id="experience-${experienceCount}">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6>Work Experience ${experienceCount}</h6>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeExperience(${experienceCount})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" class="form-control" id="exp_position_${experienceCount}" onchange="updatePreview()">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Company</label>
                        <input type="text" class="form-control" id="exp_company_${experienceCount}" onchange="updatePreview()">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="date" class="form-control" id="exp_start_${experienceCount}" onchange="updatePreview()">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="date" class="form-control" id="exp_end_${experienceCount}" onchange="updatePreview()">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-control" rows="3" id="exp_desc_${experienceCount}" onchange="updatePreview()"></textarea>
            </div>
        </div>
    `;
    document.getElementById('experience-list').insertAdjacentHTML('beforeend', experienceHtml);
    updatePreview();
}

function removeExperience(id) {
    document.getElementById(`experience-${id}`).remove();
    updatePreview();
}

function addEducation() {
    educationCount++;
    const educationHtml = `
        <div class="education-item mb-3 p-3 border rounded" id="education-${educationCount}">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h6>Education ${educationCount}</h6>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeEducation(${educationCount})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Degree</label>
                        <input type="text" class="form-control" id="edu_degree_${educationCount}" onchange="updatePreview()">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Institution</label>
                        <input type="text" class="form-control" id="edu_institution_${educationCount}" onchange="updatePreview()">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Field of Study</label>
                        <input type="text" class="form-control" id="edu_field_${educationCount}" onchange="updatePreview()">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Graduation Year</label>
                        <input type="date" class="form-control" id="edu_end_${educationCount}" onchange="updatePreview()">
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('education-list').insertAdjacentHTML('beforeend', educationHtml);
    updatePreview();
}

function removeEducation(id) {
    document.getElementById(`education-${id}`).remove();
    updatePreview();
}

function addSkill() {
    skillCount++;
    const skillHtml = `
        <div class="skill-item mb-2 p-2 border rounded d-flex justify-content-between align-items-center" id="skill-${skillCount}">
            <div class="row flex-grow-1">
                <div class="col-md-8">
                    <input type="text" class="form-control form-control-sm" placeholder="Skill name" id="skill_name_${skillCount}" onchange="updatePreview()">
                </div>
                <div class="col-md-4">
                    <select class="form-control form-control-sm" id="skill_level_${skillCount}" onchange="updatePreview()">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
            </div>
            <button type="button" class="btn btn-sm btn-outline-danger ms-2" onclick="removeSkill(${skillCount})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    document.getElementById('skills-list').insertAdjacentHTML('beforeend', skillHtml);
    updatePreview();
}

function removeSkill(id) {
    document.getElementById(`skill-${id}`).remove();
    updatePreview();
}

function updateExperiencePreview() {
    const experienceSection = document.getElementById('experience-section');
    const previewExperience = document.getElementById('preview-experience');
    let experienceHtml = '';
    
    for (let i = 1; i <= experienceCount; i++) {
        const position = document.getElementById(`exp_position_${i}`)?.value;
        const company = document.getElementById(`exp_company_${i}`)?.value;
        const startDate = document.getElementById(`exp_start_${i}`)?.value;
        const endDate = document.getElementById(`exp_end_${i}`)?.value;
        const description = document.getElementById(`exp_desc_${i}`)?.value;
        
        if (position || company) {
            experienceHtml += `
                <div class="experience-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${position || 'Job Title'}</div>
                            <div class="item-company">${company || 'Company Name'}</div>
                        </div>
                        <div class="item-date">${formatDate(startDate)} - ${formatDate(endDate) || 'Present'}</div>
                    </div>
                    ${description ? `<p>${description}</p>` : ''}
                </div>
            `;
        }
    }
    
    if (experienceHtml) {
        previewExperience.innerHTML = experienceHtml;
        experienceSection.style.display = 'block';
    } else {
        experienceSection.style.display = 'none';
    }
}



function updateEducationPreview() {
    const educationSection = document.getElementById('education-section');
    const previewEducation = document.getElementById('preview-education');
    let educationHtml = '';
    
    for (let i = 1; i <= educationCount; i++) {
        const degree = document.getElementById(`edu_degree_${i}`)?.value;
        const institution = document.getElementById(`edu_institution_${i}`)?.value;
        const field = document.getElementById(`edu_field_${i}`)?.value;
        const endDate = document.getElementById(`edu_end_${i}`)?.value;
        
        if (degree || institution) {
            educationHtml += `
                <div class="education-item">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${degree || 'Degree'}</div>
                            <div class="item-company">${institution || 'Institution'}</div>
                            ${field ? `<div class="text-muted">${field}</div>` : ''}
                        </div>
                        <div class="item-date">${formatDate(endDate) || 'Year'}</div>
                    </div>
                </div>
            `;
        }
    }
    
    if (educationHtml) {
        previewEducation.innerHTML = educationHtml;
        educationSection.style.display = 'block';
    } else {
        educationSection.style.display = 'none';
    }
}

function updateSkillsPreview() {
    const skillsSection = document.getElementById('skills-section');
    const previewSkills = document.getElementById('preview-skills');
    let skillsHtml = '';
    
    for (let i = 1; i <= skillCount; i++) {
        const skillName = document.getElementById(`skill_name_${i}`)?.value;
        const skillLevel = document.getElementById(`skill_level_${i}`)?.value;
        
        if (skillName) {
            skillsHtml += `
                <div class="skill-item">
                    <span>${skillName}</span>
                    <span class="skill-level">${skillLevel}</span>
                </div>
            `;
        }
    }
    
    if (skillsHtml) {
        previewSkills.innerHTML = skillsHtml;
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function showPreview() {
    let templateName = 'modern';
    
    // Check if we're on template-specific page
    if (window.location.pathname.includes('create-with-template')) {
        const pathParts = window.location.pathname.split('/');
        templateName = pathParts[pathParts.indexOf('create-with-template') + 1] || 'modern';
    }
    
    console.log('Opening preview with template:', templateName);
    
    // Create preview modal
    const modal = document.createElement('div');
    modal.id = 'preview-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 9999;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 2rem;
        overflow-y: auto;
        overflow-x: hidden;
    `;
    
    const previewContent = `
        <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; width: 100%; padding: 60px 20px 40px;">
            <div style="position: fixed; top: 20px; right: 20px; z-index: 10000; display: flex; gap: 10px;">
                <button onclick="window.print()" style="background: #28a745; color: white; border: none; border-radius: 25px; padding: 10px 20px; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                    Print/PDF
                </button>
                <button onclick="document.getElementById('preview-modal').remove()" style="background: #dc3545; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 20px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">×</button>
            </div>
            <div id="resume-pages" style="display: flex; flex-direction: column; gap: 30px; align-items: center; width: 100%;">
                <!-- Pages will be generated here -->
            </div>
        </div>
    `;
    
    modal.innerHTML = previewContent;
    document.body.appendChild(modal);
    
    // Generate pages with content - use setTimeout to ensure DOM is ready
    setTimeout(() => {
        try {
            generateResumePages(templateName);
        } catch (error) {
            console.error('Error generating pages:', error);
            const pagesContainer = document.getElementById('resume-pages');
            if (pagesContainer) {
                pagesContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;"><h2>Error generating preview</h2><p>' + error.message + '</p></div>';
            }
        }
    }, 100);
}

function generateResumePages(templateName) {
    const pagesContainer = document.getElementById('resume-pages');
    if (!pagesContainer) {
        console.warn('resume-pages container not found');
        return;
    }
    
    try {
        // Clear existing pages
        pagesContainer.innerHTML = '';
        
        const content = buildResumeContent(templateName);
        console.log('Total sections to render:', content.length);
        
        // A4 page height calculation
        // 297mm height - 40mm padding (20mm top + 20mm bottom) = 257mm content area
        // At 96 DPI: 1mm = 3.7795px, so 257mm = ~971px
        // At 0.7 scale: 971 * 0.7 = ~680px
        // Reserve ~150px for header on first page, ~80px on subsequent pages
        
        const MAX_FIRST_PAGE_HEIGHT = 530; // pixels (after scale)
        const MAX_OTHER_PAGE_HEIGHT = 600; // pixels (after scale)
        
        // Create first page
        let pageNumber = 1;
        let currentPage = createNewPage(templateName, pageNumber);
        pagesContainer.appendChild(currentPage);
        
        let contentContainer = currentPage.querySelector('.page-content');
        if (!contentContainer) {
            console.error('page-content not found in page');
            return;
        }
        
        let currentHeight = 0;
        let maxHeight = MAX_FIRST_PAGE_HEIGHT;
        
        content.forEach((section, index) => {
            console.log(`Processing section ${index + 1}/${content.length}`);
            
            const sectionElement = document.createElement('div');
            sectionElement.innerHTML = section.html;
            sectionElement.className = 'resume-section';
            sectionElement.style.marginBottom = '20px';
            sectionElement.style.pageBreakInside = 'avoid';
            
            // Add to current page temporarily to measure
            contentContainer.appendChild(sectionElement);
            
            // Force layout calculation
            void sectionElement.offsetHeight;
            
            // Measure actual height
            const sectionHeight = sectionElement.getBoundingClientRect().height;
            console.log(`Section ${index + 1} height: ${sectionHeight}px, current total: ${currentHeight}px, max: ${maxHeight}px`);
            
            // Check if we need a new page
            if (currentHeight + sectionHeight > maxHeight && index > 0) {
                console.log(`Creating new page (overflow detected)`);
                
                // Remove from current page
                contentContainer.removeChild(sectionElement);
                
                // Create new page
                pageNumber++;
                currentPage = createNewPage(templateName, pageNumber);
                currentPage.classList.add('page');
                pagesContainer.appendChild(currentPage);
                
                // Get new content container
                contentContainer = currentPage.querySelector('.page-content');
                if (!contentContainer) {
                    console.error('page-content not found in new page');
                    return;
                }
                
                // Add section to new page
                contentContainer.appendChild(sectionElement);
                
                // Reset height tracking for new page
                currentHeight = sectionHeight;
                maxHeight = MAX_OTHER_PAGE_HEIGHT; // Subsequent pages have more space
            } else {
                currentHeight += sectionHeight;
            }
        });
        
        // Add page class to all pages
        document.querySelectorAll('.resume-page').forEach(page => {
            page.classList.add('page');
        });
        
        console.log(`✓ Successfully generated ${pageNumber} page(s) for preview`);
        
        // Scroll to top of modal
        const modal = document.getElementById('preview-modal');
        if (modal) {
            modal.scrollTop = 0;
        }
        
    } catch (error) {
        console.error('Error generating resume pages:', error);
        console.error('Stack trace:', error.stack);
        pagesContainer.innerHTML = '<div style="color: white; padding: 40px; text-align: center;"><h2>Error generating preview</h2><p>' + error.message + '</p><pre style="text-align: left; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; font-size: 12px;">' + error.stack + '</pre></div>';
    }
}

function createNewPage(templateName, pageNumber) {
    const page = document.createElement('div');
    page.className = 'resume-page';
    page.style.cssText = `
        background: white;
        width: 210mm;
        height: 297mm;
        padding: 20mm;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Arial', 'Helvetica Neue', sans-serif;
        font-size: 11pt;
        line-height: 1.4;
        transform: scale(0.7);
        transform-origin: top center;
        overflow: hidden;
        box-sizing: border-box;
        page-break-after: always;
        margin-bottom: 30px;
        display: block;
        color: #000;
    `;
    
    let headerHtml = '';
    if (pageNumber === 1) {
        headerHtml = getTemplateHeader(templateName);
    } else {
        // Simplified header for continuation pages
        const fullName = document.getElementById('id_full_name')?.value || 'Your Name';
        const email = document.getElementById('id_email')?.value || 'email@example.com';
        const phone = document.getElementById('id_phone')?.value || '+1 (555) 123-4567';
        
        headerHtml = `
            <div style="border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 18pt; color: #000;">${fullName}</h1>
                <div style="font-size: 9pt; color: #666; margin-top: 5px; display: flex; gap: 15px;">
                    <span>${email}</span>
                    <span>${phone}</span>
                    <span style="margin-left: auto;">Page ${pageNumber}</span>
                </div>
            </div>
        `;
    }
    
    page.innerHTML = `
        ${headerHtml}
        <div class="page-content" style="position: relative; width: 100%;"></div>
    `;
    
    return page;
}

function getTemplateHeader(templateName) {
    const fullName = document.getElementById('id_full_name')?.value || 'Your Name';
    const email = document.getElementById('id_email')?.value || 'email@example.com';
    const phone = document.getElementById('id_phone')?.value || '+1 (555) 123-4567';
    const address = document.getElementById('id_address')?.value || 'City, State';
    
    const photoElement = window.uploadedImageUrl ? 
        `<img src="${window.uploadedImageUrl}" style="width: 120px; height: 150px; object-fit: cover; border-radius: 8px; flex-shrink: 0;">` :
        `<div style="width: 120px; height: 150px; border: 2px solid #ddd; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9f9f9; color: #666; font-size: 10pt; text-align: center; flex-shrink: 0;">Photo</div>`;
    
    switch(templateName) {
        case 'colored':
            return `<div style="background: #f5f5dc; padding: 20px; margin: -20mm -20mm 20px -20mm; display: flex; align-items: center; gap: 20px;"><div style="flex: 1;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>${photoElement}</div>`;
        
        case 'green':
            return `<div style="background: #e8f5e8; padding: 20px; margin: -20mm -20mm 20px -20mm; border-radius: 0;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>`;
        
        case 'purple':
            return `<div style="background: #f3e5f5; padding: 20px; margin: -20mm -20mm 20px -20mm;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>`;
        
        case 'orange':
            return `<div style="background: #fff3e0; padding: 20px; margin: -20mm -20mm 20px -20mm; border-left: 8px solid #ff9800;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>`;
        
        case 'teal':
            return `<div style="background: #e0f2f1; padding: 20px; margin: -20mm -20mm 20px -20mm; display: flex; justify-content: space-between; align-items: center;"><div><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>${photoElement}</div>`;
        
        case 'pink':
            return `<div style="background: #fce4ec; padding: 20px; margin: -20mm -20mm 20px -20mm; text-align: center;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>`;
        
        case 'gray':
            return `<div style="background: #f5f5f5; padding: 20px; margin: -20mm -20mm 20px -20mm; border-bottom: 5px solid #9e9e9e;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>`;
        
        case 'modern-professional':
            return `<div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 20px; margin: -20mm -20mm 20px -20mm; display: flex; align-items: center; gap: 20px;"><div style="width: 80px; height: 100px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10pt; text-align: center;">Photo</div><div style="flex: 1;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: white;">${fullName}</h1><div style="margin-bottom: 8px; color: white; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: white; font-size: 12pt;">${phone}</div><div style="color: white; font-size: 12pt;">${address}</div></div></div>`;
        
        default:
            return `<div style="padding: 20px; margin: -20mm -20mm 20px -20mm; background: #f8f9fa;"><h1 style="margin: 0 0 15px 0; font-size: 24pt; font-weight: bold; color: #000;">${fullName}</h1><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${email}</div><div style="margin-bottom: 8px; color: #000; font-size: 12pt;">${phone}</div><div style="color: #000; font-size: 12pt;">${address}</div></div>`;
    }
}

function buildResumeContent(templateName) {
    console.log('Building resume content for template:', templateName);
    const sections = [];
    
    // Professional Summary
    const summary = document.getElementById('id_summary')?.value;
    console.log('Summary:', summary);
    if (summary && summary.trim()) {
        sections.push({
            html: `
                <div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14pt; font-weight: bold; color: #000; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 8px;">Professional Summary</h2>
                    <p style="margin: 0; text-align: justify; line-height: 1.5; color: #000;">${summary}</p>
                </div>
            `
        });
    }
    
    // Work Experience
    console.log('Experience count:', experienceCount);
    let experienceHtml = '';
    for (let i = 1; i <= experienceCount; i++) {
        const position = document.getElementById(`exp_position_${i}`)?.value;
        const company = document.getElementById(`exp_company_${i}`)?.value;
        const startDate = document.getElementById(`exp_start_${i}`)?.value;
        const endDate = document.getElementById(`exp_end_${i}`)?.value;
        const description = document.getElementById(`exp_desc_${i}`)?.value;
        console.log(`Experience ${i}:`, {position, company, startDate, endDate});
        
        if (position || company) {
            experienceHtml += `
                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: flex-start;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; color: #000; font-size: 12pt; margin-bottom: 3px;">${position || 'Job Title'}</div>
                            <div style="color: #000; font-style: italic; font-size: 11pt;">${company || 'Company Name'}</div>
                        </div>
                        <div style="color: #000; font-size: 10pt; text-align: right; margin-left: 20px;">${formatDate(startDate)} - ${formatDate(endDate) || 'Present'}</div>
                    </div>
                    ${description ? `<div style="color: #000; font-size: 10pt; text-align: justify; line-height: 1.4; margin-top: 8px;">${description}</div>` : ''}
                </div>
            `;
        }
    }
    
    if (experienceHtml) {
        sections.push({
            html: `
                <div style="margin-bottom: 25px;">
                    <h2 style="font-size: 14pt; font-weight: bold; color: #000; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 8px;">Work Experience</h2>
                    ${experienceHtml}
                </div>
            `
        });
    }
    
    // Education
    let educationHtml = '';
    for (let i = 1; i <= educationCount; i++) {
        const degree = document.getElementById(`edu_degree_${i}`)?.value;
        const institution = document.getElementById(`edu_institution_${i}`)?.value;
        const field = document.getElementById(`edu_field_${i}`)?.value;
        const endDate = document.getElementById(`edu_end_${i}`)?.value;
        
        if (degree || institution) {
            educationHtml += `
                <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: flex-start;">
                        <div style="flex: 1;">
                            <div style="font-weight: bold; color: #000; font-size: 12pt; margin-bottom: 3px;">${degree || 'Degree'}</div>
                            <div style="color: #000; font-style: italic; font-size: 11pt; margin-bottom: 2px;">${institution || 'Institution'}</div>
                            ${field ? `<div style="color: #000; font-size: 10pt;">${field}</div>` : ''}
                        </div>
                        <div style="color: #000; font-size: 10pt; text-align: right; margin-left: 20px;">${formatDate(endDate) || 'Year'}</div>
                    </div>
                </div>
            `;
        }
    }
    
    // Always add Education section even if empty
    sections.push({
        html: `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 14pt; font-weight: bold; color: #000; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 8px;">Education</h2>
                ${educationHtml || '<div style="color: #666; font-style: italic; padding: 15px 0;">Add education to see preview</div>'}
            </div>
        `
    });
    
    // Skills
    let skillsHtml = '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
    for (let i = 1; i <= skillCount; i++) {
        const skillName = document.getElementById(`skill_name_${i}`)?.value;
        const skillLevel = document.getElementById(`skill_level_${i}`)?.value;
        
        if (skillName) {
            skillsHtml += `<span style="background: #f5f5f5; padding: 6px 12px; margin: 2px; border-radius: 15px; font-size: 10pt; display: inline-block; border: 1px solid #ddd; color: #000;">${skillName} <span style="font-weight: bold;">(${skillLevel})</span></span>`;
        }
    }
    skillsHtml += '</div>';
    
    // Always add Skills section even if empty
    sections.push({
        html: `
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 14pt; font-weight: bold; color: #000; margin: 0 0 15px 0; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 8px;">Skills</h2>
                ${skillsHtml.includes('span') ? skillsHtml : '<div style="color: #666; font-style: italic; padding: 15px 0;">Add skills to see preview</div>'}
            </div>
        `
    });
    
    return sections;
}

function exportToPDF() {
    const pages = document.querySelectorAll('.resume-page');
    
    if (pages.length === 0) {
        alert('Please open the live preview first before exporting to PDF.');
        return;
    }
    
    // Hide everything except resume pages
    const originalDisplay = [];
    document.querySelectorAll('body > *').forEach((el, i) => {
        originalDisplay[i] = el.style.display;
        el.style.display = 'none';
    });
    
    // Create print container
    const printContainer = document.createElement('div');
    printContainer.innerHTML = `
        <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            .print-page { 
                width: 210mm; 
                height: 297mm; 
                padding: 20mm; 
                page-break-after: always; 
                background: white;
                box-sizing: border-box;
                transform: none;
                font-size: 11pt;
                line-height: 1.4;
            }
            .print-page:last-child { page-break-after: avoid; }
        </style>
    `;
    
    pages.forEach(page => {
        const printPage = document.createElement('div');
        printPage.className = 'print-page';
        printPage.innerHTML = page.innerHTML;
        printContainer.appendChild(printPage);
    });
    
    document.body.appendChild(printContainer);
    
    // Print
    window.print();
    
    // Restore original display
    document.body.removeChild(printContainer);
    document.querySelectorAll('body > *').forEach((el, i) => {
        el.style.display = originalDisplay[i];
    });
}

// Fallback functions for compatibility
function updatePreviewExperience() {
    // This function is now handled by generateResumePages
}

function updatePreviewEducation() {
    // This function is now handled by generateResumePages
}

function updatePreviewSkills() {
    // This function is now handled by generateResumePages
}

function saveResume() {
    // Collect all form data
    const formData = new FormData();
    
    // Basic information
    formData.append('title', document.getElementById('id_title')?.value || '');
    formData.append('full_name', document.getElementById('id_full_name')?.value || '');
    formData.append('email', document.getElementById('id_email')?.value || '');
    formData.append('phone', document.getElementById('id_phone')?.value || '');
    formData.append('address', document.getElementById('id_address')?.value || '');
    formData.append('summary', document.getElementById('id_summary')?.value || '');
    
    // Add CSRF token
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    formData.append('csrfmiddlewaretoken', csrfToken);
    
    // Submit the form
    fetch(window.location.href, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
        // Check if redirect occurred (successful save)
        if (data.includes('resume_list') || data.includes('dashboard')) {
            window.location.href = '/resumes/';
        } else {
            // Handle form errors
            console.log('Form has errors');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error saving your resume. Please try again.');
    });
}


function submitResume() {
    // Collect all form data
    const formData = new FormData();
    
    // Get CSRF token
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    formData.append('csrfmiddlewaretoken', csrfToken);
    
    // Personal information
    formData.append('title', document.getElementById('id_title')?.value || '');
    formData.append('full_name', document.getElementById('id_full_name')?.value || '');
    formData.append('email', document.getElementById('id_email')?.value || '');
    formData.append('phone', document.getElementById('id_phone')?.value || '');
    formData.append('address', document.getElementById('id_address')?.value || '');
    formData.append('summary', document.getElementById('id_summary')?.value || '');
    
    // Photo
    const photoInput = document.getElementById('id_photo');
    if (photoInput && photoInput.files.length > 0) {
        formData.append('photo', photoInput.files[0]);
    }
    
    // Collect experience data
    const experiences = [];
    for (let i = 1; i <= experienceCount; i++) {
        const position = document.getElementById(`exp_position_${i}`)?.value;
        const company = document.getElementById(`exp_company_${i}`)?.value;
        
        if (position || company) {
            experiences.push({
                position: position || '',
                company: company || '',
                start_date: document.getElementById(`exp_start_${i}`)?.value || '',
                end_date: document.getElementById(`exp_end_${i}`)?.value || '',
                description: document.getElementById(`exp_desc_${i}`)?.value || ''
            });
        }
    }
    formData.append('experiences', JSON.stringify(experiences));
    
    // Collect education data
    const educations = [];
    for (let i = 1; i <= educationCount; i++) {
        const degree = document.getElementById(`edu_degree_${i}`)?.value;
        const institution = document.getElementById(`edu_institution_${i}`)?.value;
        
        if (degree || institution) {
            educations.push({
                degree: degree || '',
                institution: institution || '',
                field_of_study: document.getElementById(`edu_field_${i}`)?.value || '',
                end_date: document.getElementById(`edu_end_${i}`)?.value || ''
            });
        }
    }
    formData.append('educations', JSON.stringify(educations));
    
    // Collect skills data
    const skills = [];
    for (let i = 1; i <= skillCount; i++) {
        const skillName = document.getElementById(`skill_name_${i}`)?.value;
        
        if (skillName) {
            skills.push({
                name: skillName,
                proficiency: document.getElementById(`skill_level_${i}`)?.value || 'Intermediate'
            });
        }
    }
    formData.append('skills', JSON.stringify(skills));
    
    // Submit the form
    fetch(window.location.href, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data && data.success) {
            window.location.href = data.redirect_url;
        } else if (data && data.error) {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the resume. Please try again.');
    });
}

function exportToPDF() {
    window.print();
}


/**
 * Exported function to render preview with data
 * @param {Object} data - Resume data object
 */
function renderPreview(data) {
    try {
        if (!data) {
            console.warn('No data provided to renderPreview');
            return;
        }
        
        // Update form fields if they exist
        if (data.full_name && document.getElementById('id_full_name')) {
            document.getElementById('id_full_name').value = data.full_name;
        }
        if (data.email && document.getElementById('id_email')) {
            document.getElementById('id_email').value = data.email;
        }
        if (data.phone && document.getElementById('id_phone')) {
            document.getElementById('id_phone').value = data.phone;
        }
        if (data.address && document.getElementById('id_address')) {
            document.getElementById('id_address').value = data.address;
        }
        if (data.summary && document.getElementById('id_summary')) {
            document.getElementById('id_summary').value = data.summary;
        }
        
        // Trigger preview update
        updatePreview();
        
        console.log('✓ Preview rendered successfully');
    } catch (error) {
        console.error('Error rendering preview:', error);
    }
}

// Export for external use
if (typeof window !== 'undefined') {
    window.renderPreview = renderPreview;
}
