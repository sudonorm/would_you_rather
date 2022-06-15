import random
from datetime import timedelta
import datetime

from fastapi import Depends
from fastapi import FastAPI, Form
from fastapi import Request, Response
from fastapi.responses import HTMLResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel
import json
import os 
import pathlib


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):

    date_today = datetime.date.today()
    with open("general.json", "r") as f:
        questions = json.load(f)
    print(questions)
    context = {"request": request, "year":date_today.year, "questionIDs": ["Select a question number..."] + list(questions.keys())}
    response = templates.TemplateResponse("page/index.html", context)
    return response

# @app.post("/get_question/")
# def get_question(request: Request, category: str = Form(...)):
#     pass