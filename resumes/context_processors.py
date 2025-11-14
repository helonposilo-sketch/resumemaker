from .models import LoginBackgroundVideo

def login_background_video(request):
    """
    Context processor to add active login background video to all templates
    """
    active_video = LoginBackgroundVideo.get_active_video()
    return {
        'login_background_video': active_video
    }