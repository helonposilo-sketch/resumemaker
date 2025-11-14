# Resume Builder - Django Web Application

A professional resume builder web application built with Django that allows users to create, edit, and manage their resumes online.

## Features

- **User Authentication**: Registration, login, and logout functionality
- **Resume Management**: Create, edit, view, and manage multiple resumes
- **Professional Templates**: Clean, ATS-friendly resume layouts
- **Admin Interface**: Full Django admin panel for managing users and resumes
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Print/PDF Ready**: Optimized for printing and PDF generation

## Installation & Setup

1. **Clone or download the project**
2. **Install Django** (if not already installed):
   ```bash
   pip install django
   ```

3. **Navigate to project directory**:
   ```bash
   cd resume_builder
   ```

4. **Run migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser** (for admin access):
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

7. **Access the application**:
   - Main site: http://127.0.0.1:8000/
   - Admin panel: http://127.0.0.1:8000/admin/

## Usage

### For Users:
1. **Sign Up**: Create a new account on the registration page
2. **Login**: Access your dashboard after logging in
3. **Create Resume**: Use the resume builder to add your information
4. **Add Sections**: Add education, work experience, and skills
5. **Preview**: View your formatted resume
6. **Print/Download**: Use browser print function to save as PDF

### For Admins:
1. **Access Admin Panel**: Login at /admin/ with superuser credentials
2. **Manage Users**: View and manage user accounts
3. **Manage Resumes**: View, edit, and delete user resumes
4. **View Statistics**: Monitor application usage

## Project Structure

```
resume_builder/
├── resume_builder/          # Main project settings
├── resumes/                 # Resume management app
├── accounts/                # User authentication app
├── templates/               # HTML templates
├── static/                  # CSS, JS, and static files
├── media/                   # User uploaded files
└── manage.py               # Django management script
```

## Models

- **Resume**: Main resume information (title, contact details, summary)
- **Education**: Educational background entries
- **Experience**: Work experience entries  
- **Skill**: Skills with proficiency levels

## Technologies Used

- **Backend**: Django 4.2+
- **Frontend**: Bootstrap 5, HTML5, CSS3
- **Database**: SQLite (default, can be changed to PostgreSQL/MySQL)
- **Icons**: Font Awesome 6

## Default Admin Credentials

If you need to access the admin panel quickly, you can create a superuser with:
- Username: admin
- Email: admin@example.com  
- Password: admin123

## Customization

The application is designed to be easily customizable:
- **Templates**: Modify HTML templates in the `templates/` directory
- **Styling**: Update CSS in `static/css/style.css`
- **Models**: Extend models in `resumes/models.py` for additional fields
- **Forms**: Customize forms in `resumes/forms.py`

## Security Features

- CSRF protection on all forms
- User authentication required for resume operations
- Users can only access their own resumes
- Admin interface for system management

## Future Enhancements

- Multiple resume templates
- PDF generation with custom styling
- Resume sharing functionality
- Export to different formats (Word, JSON)
- Resume analytics and tips
- Integration with job boards

## Support

For issues or questions, please check the Django documentation or create an issue in the project repository.