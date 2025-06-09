from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup
from wagtail import hooks
from .models import CustomUser

# SnippetViewSet для користувачів
class WagtailUserProfileViewSet(SnippetViewSet):
    model = CustomUser
    icon = "user"
    list_display = ["email", "username", "created_on","is_superuser"]
    search_filters = ["username", "email"]
    ordering = ["created_on"]
    form_fields = ["email", "username", "is_staff", "is_active", "created_on"]

# група Snippets для користувачів
class UsersViewSetGroup(SnippetViewSetGroup):
    items = [WagtailUserProfileViewSet]  # Тільки кастомний користувач
    menu_label = "Користувачі"  # Назва групи
    menu_name = "users_folder"  # Ім'я групи

# 3️⃣ Реєструємо групу
register_snippet(UsersViewSetGroup)