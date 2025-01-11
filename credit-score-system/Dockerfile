FROM python:3.12

WORKDIR /app

ENV PYTHONUNBUFFERED 1

RUN apt-get update

RUN pip install --upgrade pip

COPY ./requirements.txt /app

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "127.0.0.1:8000"]