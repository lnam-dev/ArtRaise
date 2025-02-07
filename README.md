# ArtRaise

В гілці **Test** створений Django проект, який потрібно скопіювати на створену вами локальну гілку.  
Гілку бажано називати **dev-ім'я**.

Створити бд Postgresql з назвою artraise

Інструкція запуску проекту:

git clone https://github.com/makson2006/ArtRaise.git
cd Artraise

#----Активація віртуального середовища----#
python3 -m venv venv
source venv/bin/activate  # Для Linux/MacOS
venv\Scripts\activate     # Для Windows


#----Встановлення залежностей----#
pip install -r requirements.txt

#----Створити бд PostgreSQL з назвою artraise----#
DB_NAME=artraise
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

#----Виконання міграцій----#
python manage.py makemigrations
python manage.py migrate

#----Запуск сервера----#
python manage.py runserver

