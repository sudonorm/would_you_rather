import random
from datetime import timedelta
import datetime

from fastapi import FastAPI
from fastapi import Request, Response
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

import json
import os 
import pathlib
import requests

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):

    date_today = datetime.date.today()
    raw_response = requests.get("https://raw.githubusercontent.com/sudonorm/would_you_rather/main/app/static/data/categories.json")
    categories = json.loads(raw_response.text)
    
    context = {"request": request, "year":date_today.year, "categories": ["Select a category..."] + categories["all"]}
    response = templates.TemplateResponse("page/index.html", context)
    return response