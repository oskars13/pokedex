
def create_models(db):
    class Types(db.Model):
        __tablename__ = 'Types'
        id = db.Column(db.Integer, primary_key = True)
        id_types = db.Column(db.Integer, nullable = False)
        types = db.Column(db.String)

    class Abilities(db.Model):
        __tablename__ = 'Abilities'
        id = db.Column(db.Integer, primary_key = True)
        id_abilities = db.Column(db.Integer, nullable = False)
        abilities = db.Column(db.String)

    class Pokemon(db.Model):
        __tablename__ = 'Pokemon'
        id = db.Column(db.Integer, primary_key = True)
        poke_name = db.Column(db.String, nullable = False, unique = True)
        poke_image = db.Column(db.String, nullable = False, unique = True)
        id_types = db.Column(db.Integer, db.ForeignKey('Types.id'), unique = True)
        id_abilities = db.Column(db.Integer, db.ForeignKey('Abilities.id'), unique = True)

        type = db.relationship('Types', backref='pokemons')
        ability = db.relationship('Abilities', backref='pokemons')

    return  Pokemon, Types, Abilities