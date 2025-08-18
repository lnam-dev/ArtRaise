from wagtail.models import Page
from wagtail import blocks
from wagtail.fields import StreamField
from wagtail.embeds.blocks import EmbedBlock
from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail import blocks
from wagtail.embeds.blocks import EmbedBlock
from wagtail.images.blocks import ImageChooserBlock
from wagtail.documents.blocks import DocumentChooserBlock

class HtmlLikeRichTextBlock(blocks.StreamBlock):
    """
    Універсальний блоковий редактор для контенту, який імітує HTML-редактор.
    """
    heading_2 = blocks.RichTextBlock(
        label="Заголовок 2",
        features=['h2', 'bold', 'italic'],
        icon="title"
    )
    heading_3 = blocks.RichTextBlock(
        label="Заголовок 3",
        features=['h3', 'bold', 'italic'],
        icon="title"
    )
    heading_4 = blocks.RichTextBlock(
        label="Заголовок 4",
        features=['h4', 'bold', 'italic'],
        icon="title"
    )
    paragraph = blocks.RichTextBlock(
        label="Параграф",
        features=['bold', 'italic', 'link'],
        icon="pilcrow"
    )
    bulleted_list = blocks.ListBlock(
        blocks.RichTextBlock(label="Пункт списку"),
        label="Список з маркерами",
        icon="list-ul"
    )
    numbered_list = blocks.ListBlock(
        blocks.RichTextBlock(label="Пункт списку"),
        label="Нумерований список",
        icon="list-ol"
    )
    image = ImageChooserBlock(
        label="Зображення",
        help_text="Оберіть зображення з бібліотеки"
    )
    embed = EmbedBlock(
        label="Вбудований контент (відео, твіти тощо)"
    )
    document = DocumentChooserBlock(
        label="Документ"
    )
    horizontal_line = blocks.StaticBlock(
        label="Горизонтальна лінія",
        admin_text="Горизонтальна лінія для розділення контенту",
        icon="horizontal-line"
    )

    class Meta:
        label = "Редактор контенту (універсальний)"
        icon = "doc-full"

# Блок для окремого пункту в списку (тире/пробіл)
class SectionItemBlock(blocks.StructBlock):
    item_text = blocks.TextBlock(
        label="Текст пункту"
    )

    class Meta:
        template = "blocks/section_item_block.html"
        icon = "list-item"
        label = "Пункт"

# Блок для окремого пункту, який можна додавати самостійно
class SingleItemBlock(blocks.StructBlock):
    item_text = blocks.TextBlock(
        label="Текст окремого пункту"
    )

    class Meta:
        template = "blocks/single_item_block.html"
        icon = "list-ul"
        label = "Окремий пункт"

# Блок для секції з підзаголовком і описом
class SectionBlock(blocks.StructBlock):
    subtitle = blocks.CharBlock(
        required=False,
        max_length=255,
        label="Підзаголовок секції",
        help_text="Наприклад: 'Програма підтримки студентів' (необов'язково)"
    )
    description = blocks.RichTextBlock(
        label="Опис секції",
        features=['bold', 'italic', 'link'],
        help_text="Короткий опис секції (необов'язково)",
        required=False
    )
    items = blocks.ListBlock(SectionItemBlock(), label="Пункти секції")

    class Meta:
        template = "blocks/section_block.html"
        icon = "section"
        label = "Секція з пунктами"

# Блок для зображення за URL
class URLImageBlock(blocks.StructBlock):
    url = blocks.URLBlock(
        label="Посилання на зображення",
        help_text="Вставте повну URL-адресу зображення з DigitalOcean Spaces"
    )
    alt = blocks.CharBlock(
        label="Альтернативний текст",
        required=False,
        help_text="Короткий опис зображення для доступності"
    )

    class Meta:
        label = "Зображення за URL"
        icon = "image"

# Блок для медіа з підзаголовком
class MediaWithSubtitleBlock(blocks.StructBlock):
    subtitle = blocks.CharBlock(
        max_length=255,
        required=False,
        label="Підзаголовок (subtitle)",
        help_text="Короткий заголовок для медіа-блоку"
    )
    media_file = blocks.StreamBlock([
        ('image_url', URLImageBlock(label="Зображення за URL")),
        ('video', EmbedBlock(label="Відео")),
    ],
    label="Медіа-файли"
    )
    caption = blocks.CharBlock(
        max_length=255,
        required=False,
        label="Підпис до медіа"
    )

    class Meta:
        template = "blocks/media_with_subtitle_block.html"
        icon = "media"
        label = "Медіа з підзаголовком"

# Блок для галереї
class ImageGalleryBlock(blocks.StructBlock):
    subtitle = blocks.CharBlock(
        max_length=255,
        required=False,
        label="Підзаголовок (subtitle)",
        help_text="Назва галереї / секції"
    )
    images = blocks.ListBlock(
        URLImageBlock(label="Зображення за URL"),
        label="Зображення"
    )

    class Meta:
        template = "blocks/image_gallery_block.html"
        icon = "image"
        label = "Галерея зображень"

# Блок для медіа-контенту з описом
class MediaBlock(blocks.StructBlock):
    media_file = blocks.StreamBlock([
        ('image_url', URLImageBlock(label="Зображення за URL")),
        ('video', EmbedBlock(label="Відео")),
    ],
    max_num=1,
    min_num=1,
    label="Медіа-файл"
    )
    caption = blocks.CharBlock(
        max_length=255,
        required=False,
        label="Підпис до медіа"
    )

    class Meta:
        template = "blocks/media_block.html"
        icon = "media"
        label = "Блок з медіа"

# Новий блок для тексту з необов'язковим підписом
class TextWithCaptionBlock(blocks.StructBlock):
    text = blocks.RichTextBlock(
        label="Текст",
        required=False,
    )
    caption = blocks.CharBlock(
        max_length=255,
        required=False,
        label="Підпис до тексту",
        help_text="Необов'язковий підпис після текстового блоку"
    )

    class Meta:
        template = "blocks/text_with_caption_block.html"
        icon = "pilcrow"
        label = "Текстовий блок з підписом"




# Окремий блок для медіа (без підпису)
class SingleMediaBlock(blocks.StreamBlock):
    image_url = URLImageBlock(label="Зображення за URL")
    video = EmbedBlock(label="Відео")
    
    class Meta:
        template = "blocks/single_media_block.html"
        icon = "media"
        label = "Медіа (окремий)"

# Окремий блок для підпису
class SingleCaptionBlock(blocks.StructBlock):
    caption = blocks.CharBlock(
        max_length=255,
        required=False,
        label="Підпис"
    )
    
    class Meta:
        template = "blocks/single_caption_block.html"
        icon = "pilcrow"
        label = "Підпис (окремий)"

# Окремий блок для тексту
class SingleTextFieldBlock(blocks.StructBlock):
    text = blocks.RichTextBlock(
        label="Текст",
        required=False
    )
    
    class Meta:
        template = "blocks/single_text_field_block.html"
        icon = "pilcrow"
        label = "Текстовий блок (окремий)"



class UniversalPageTemplate(Page):
    """
    Універсальний шаблон сторінки, що використовує єдиний блоковий редактор.
    """
    
    page_title = models.CharField(
        max_length=200,
        verbose_name="Заголовок сторінки"
    )

    content = StreamField([
        ('editor', HtmlLikeRichTextBlock(label="Основний контент"))
    ], use_json_field=True, verbose_name="Контент сторінки", default=[])

    content_panels = Page.content_panels + [
        FieldPanel('page_title'),
        FieldPanel('content'),
    ]

    api_fields = [
        APIField('page_title'),
        APIField('content'),
    ]
    
    parent_page_types = ['pages.HomePage']

    class Meta:
        verbose_name = "Універсальна сторінка-шаблон"
        verbose_name_plural = "Універсальні сторінки-шаблони"

    def __str__(self):
        return self.page_title


class AboutFondPage(Page):
    fond_name = models.CharField(
        max_length=200,
        default="ArtRaise",
        verbose_name="Назва фонду (заголовок сторінки)"
    )
    content = StreamField([
        ('editor', HtmlLikeRichTextBlock(label="Основний контент"))
    ], use_json_field=True, verbose_name="Контент сторінки", default=[])
    
    content_panels = Page.content_panels + [
        FieldPanel('fond_name'),
        FieldPanel('content'),
    ]
    
    api_fields = [
        APIField('fond_name'),
        APIField('content'),
    ]
    
    parent_page_types = ['pages.HomePage']
    
    class Meta:
        verbose_name = "Сторінка 'Про фонд' (розширена)"
        verbose_name_plural = "Сторінки 'Про фонд' (розширені)"
    
    def __str__(self):
        return self.fond_name


class AuthenticityCertsPage(Page):
    title_text = models.CharField(
        max_length=200,
        default="Сертифікати автентичності",
        verbose_name="Заголовок сторінки сертифікатів"
    )
    content = StreamField([
        ('editor', HtmlLikeRichTextBlock(label="Основний контент"))
    ], use_json_field=True, verbose_name="Контент сторінки", default=[])
    
    content_panels = Page.content_panels + [
        FieldPanel('title_text'),
        FieldPanel('content'),
    ]
    
    api_fields = [
        APIField('title_text'),
        APIField('content'),
    ]
    
    max_count = 1
    parent_page_types = ['pages.HomePage']
    
    class Meta:
        verbose_name = "Сторінка 'Сертифікати автентичності'"
        verbose_name_plural = "Сторінки 'Сертифікати автентичності'"
    
    def __str__(self):
        return self.title_text


# Оновлення HomePage, щоб дозволити створювати UniversalPageTemplate
class HomePage(Page):
    max_count = 1
    subpage_types = [
        'pages.AboutFondPage',
        'pages.AuthenticityCertsPage',
        'pages.UniversalPageTemplate', # Додано новий шаблон сторінки
        'wagtailcore.Page',
    ]
    class Meta:
        verbose_name = "Головна сторінка"
        verbose_name_plural = "Головні сторінки"
    def __str__(self):
        return self.title