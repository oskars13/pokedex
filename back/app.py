from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models.models import create_models

db_uri = r'C:\Users\oskar\Desktop\pokedex\back\database\pokedex.db'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_uri}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
cors = CORS(app, origins='http://localhost:5173')

_pokemon, _types, _abilities = create_models(db)
with app.app_context():
        db.create_all()

@app.route('/', methods = ['GET'])
def root():
    return jsonify({'hello':'world'})


@app.route('/pokemon/add', methods = ['POST'])
def add_pokemon():
    data = request.json

    data_name = data['name']
    data_image = data['image']
    data_types = data['types']
    data_abilities = data['abilities']

    pokemon = _pokemon(poke_name = data_name, poke_image = data_image)
    db.session.add(pokemon)
    db.session.commit()
    primary_key = pokemon.id

    for type in data_types:
        _type = _types(id_types = primary_key, types = type)
        db.session.add(_type)
    
    for ability in data_abilities:
         _ability = _abilities(id_abilities = primary_key, abilities = ability)
         db.session.add(_ability)

    pokemon = db.session.get(_pokemon, primary_key)
    pokemon.id_types = pokemon.id
    pokemon.id_abilities = pokemon.id
    db.session.commit()

    return jsonify({'status': f'pokemon {data_name.upper()} succesfully added to database'})

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 1313, debug = True)



