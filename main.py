from flask import Flask, render_template, jsonify
import json
import requests
from datetime import datetime, timedelta

app = Flask(__name__)


with open('bank_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

NEWS_API_KEY = '8bbfa6022efa40cc8ebbaeffc9d63589'
NEWS_API_URL = 'https://newsapi.org/v2/everything'


def format_date(date_str):

    date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%S%z')

    return date_obj.strftime('%Y-%m-%d %H:%M')
3

def get_bank_news(bank_name):
    last_month_date = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')

    # Параметры запроса
    params = {
        'q': bank_name,  
        'from': last_month_date,  
        'sortBy': 'publishedAt', 
        'apiKey': '8bbfa6022efa40cc8ebbaeffc9d63589'  # Ваш API ключ
    }

    try:
        response = requests.get(NEWS_API_URL, params=params)
        response.raise_for_status()  
        articles = response.json().get('articles', [])
        for article in articles:
            article['formatted_date'] = format_date(article['publishedAt'])
        return articles
    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return []  
    

@app.route('/')
def index():
    banks = [bank.get("Bank", {}).get("Name") or bank.get("Name") for bank in data if bank.get("Bank") or bank.get("Name")]
    return render_template('index.html', banks=banks)

@app.route('/bank/<name>', methods=['GET'])
def bank_details(name):
    for bank in data:
        bank_data = bank.get("Bank", bank)
        if bank_data.get("Name") == name:
            bank_news = get_bank_news(bank_data.get("Name"))
            return render_template('bank_details.html', bank=bank_data, news=bank_news)

if __name__ == '__main__':
    app.run(debug=True)
