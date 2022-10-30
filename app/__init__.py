from flask import Flask, render_template, jsonify, request
import os 
import requests

BASE_URL = 'https://api.spoonacular.com/recipes'
COOMPLEX_SEARCH = BASE_URL + f"/complexSearch?apiKey={os.getenv('SPOONACULAR_API_KEY')}"
CONF_FILE='conf.py'
CUISINES=['African',
'American',
'British',
'Cajun',
'Caribbean',
'Chinese',
'Eastern European',
'European',
'French',
'German',
'Greek',
'Indian',
'Irish',
'Italian',
'Japanese',
'Jewish',
'Korean',
'Latin American',
'Mediterranean',
'Middle Eastern',
'Nordic',
'Southern',
'Spanish',
'Thai',
'Vietnamese']

def create_app(test_conf=None):

    app = Flask(__name__)
	
    if test_conf is not None: 

        app.config.from_pyfile(CONF_FILE)
    else:     
        app.config.from_mapping(test_conf)
    

    @app.route('/')
    def default(): 
        context={
            'cuisines': CUISINES
        }
        return render_template('page.html', **context)

    @app.route('/search')
    def search():
        query = request.args.get('query')

        response = requests.get(COOMPLEX_SEARCH + f'&cuisine={query}')

           
        return jsonify(response.json())

    return app