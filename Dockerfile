FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
COPY ./start.sh /code/start.sh

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app

#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["./start.sh"]