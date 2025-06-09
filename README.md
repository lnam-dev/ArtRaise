# ArtRaise

В гілці **Test** створений Django проект, який потрібно скопіювати на створену вами локальну гілку.  
Гілку бажано називати **dev-ім'я**.


Інструкція запуску проекту:
1. Встановити Postgresql:[Інструкція](https://youtu.be/0n41UTkOBb0?si=RaGG8YTMtC-7ekNG)

git clone https://github.com/makson2006/ArtRaise.git
cd Artraise

2. Активація віртуального середовища
python3 -m venv venv
source venv/bin/activate  # Для Linux/MacOS
venv\Scripts\activate     # Для Windows


3. Встановлення залежностей
pip install -r requirements.txt

4. Створити бд PostgreSQL з назвою artraise
DB_NAME=artraise
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

5. Виконання міграцій
python manage.py makemigrations
python manage.py migrate

6. Запуск сервера 
python manage.py runserver

7. Адмін панель за посиланням /cms

