from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Usuario, Produto, Pedido

app = Flask(__name__)
CORS(app)

engine = create_engine("sqlite:///database.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

@app.route("/usuarios", methods=["GET"])
def get_usuarios():
    s = Session()
    usuarios = s.query(Usuario).all()
    return jsonify([
        {"id": u.id, "nome": u.nome, "email": u.email,
        "idade": u.idade, "altura": u.altura}
        for u in usuarios   
    ]) 

@app.route("/usuarios/<int:id>", methods=["GET"])
def get_usuarios2(id):
    s = Session()
    u = s.query(Usuario).get(id)
    return jsonify([
        {"id": u.id, "nome": u.nome, "email": u.email,
        "idade": u.idade, "altura": u.altura}
    ]) 
    
@app.route("/usuarios", methods=["POST"])
def add_usuario(): 
    s = Session()
    data = request.json
    u = Usuario(nome=data["nome"],
                email=data["email"],
                idade=data["idade"], 
                altura=data["altura"])
    s.add(u)
    s.commit()
    return jsonify({"message": "Usuário cadastrado com sucesso!"})

@app.route("/usuarios/<int:id>", methods=["PUT"])
def atualizar_usuario(id):
    s = Session()
    usuario = s.query(Usuario).get(id)
    data = request.json
    usuario.nome = data["nome"]
    usuario.email = data["email"]
    usuario.idade = data["idade"]
    usuario.altura = data["altura"]
    s.commit()
    return jsonify({"message": "Usuário atualizado com sucesso!"})   

@app.route("/usuarios/<int:id>", methods=["DELETE"])
def  deletar_usuario(id):
    s = Session()
    usuario = s.query(Usuario).get(id)
    s.delete(usuario)
    s.commit()
    return jsonify({"message": "Usuário deletado com sucesso!"})   



#Parte Produto:
@app.route("/produtos", methods=["GET"])
def get_produtos():
    s = Session()
    produtos = s.query(Produto).all()
    return jsonify([
        {"id": p.id, "nome": p.nome, "Preço": p.preco,
        "Quantidade": p.quantidade}
        for p in produtos   
    ]) 

@app.route("/produtos/<int:id>", methods=["GET"])
def get_produtos2(id):
    s = Session()
    p = s.query(Produto).get(id)
    return jsonify([
        {"id": p.id, "nome": p.nome, "peço": p.preco,
        "quantidade": p.quantidade}
    ]) 

@app.route("/produtos", methods=["POST"])
def add_produtos(): 
    s = Session()
    data = request.json
    p = Produto(nome=data["nome"],
                preco=data["preço"],
                quantidade=data["quantidade"])
    s.add(p)
    s.commit()
    return jsonify({"message": "Produto cadastrado com sucesso!"})

@app.route("/produtos/<int:id>", methods=["PUT"])
def atualizar_produto(id):
    s = Session()
    produtos = s.query(Produto).get(id)
    data = request.json
    produtos.nome = data["nome"]
    produtos.preco = data["preço"]
    produtos.quantidade = data["quantidade"]
    s.commit()
    return jsonify({"message": "Produto atualizado com sucesso!"})  


@app.route("/produtos/<int:id>", methods=["DELETE"])
def  deletar_produtos(id):
    s = Session()
    produtos = s.query(Produto).get(id)
    s.delete(produtos)
    s.commit()
    return jsonify({"message": "Produto deletado com sucesso!"})

#Parte de Pedidos
@app.route("/pedidos", methods=["GET"])
def get_pedidos():
    s = Session()
    pedidos = s.query(Pedido).all()
    return jsonify([
        {"id": p2.id, "usuario": p2.usuario.nome, "produto": p2.produto.nome,
        "Quantidade": p2.quantidade, "total": p2.total}
        for p2 in pedidos   
    ]) 

@app.route("/pedidos/<int:id>", methods=["GET"])
def get_pedidos2(id):
    s = Session()
    pedidos = s.query(Pedido).get(id)
    return jsonify([
        {"id": pedidos.id, "usuario": pedidos.usuario.nome, "produto": pedidos.produto.nome,
        "Quantidade": pedidos.quantidade, "total": pedidos.total}  
    ]) 

@app.route("/pedidos", methods=["POST"])
def add_pedidos(): 
    s = Session()
    data = request.json
    prod_info = s.query(Produto).get(data["produto_id"])
    pedidos = Pedido(
        usuario_id=data["usuario_id"],
        produto_id=data["produto_id"],
        quantidade=data["quantidade"], 
        total=prod_info.preco * data["quantidade"])
    s.add(pedidos)
    s.commit()
    return jsonify({"message": "Pedido criado com sucesso!"})


@app.route("/pedidos/<int:id>", methods=["PUT"])
def modificar_pedidos(id): 
    s = Session()
    data = request.json
    pedidos = s.query(Pedido).get(id)
    prod_info = s.query(Produto).get(data["produto_id"])
    pedidos.usuario_id=data["usuario_id"]
    pedidos.produto_id=data["produto_id"]
    pedidos.quantidade=data["quantidade"]
    pedidos.total=prod_info.preco * data["quantidade"]
    s.commit()
    return jsonify({"message": "Pedido atualizado com sucesso!"})

@app.route("/pedidos/<int:id>", methods=["DELETE"])
def  deletar_pedidos(id):
    s = Session()
    pedidos = s.query(Pedido).get(id)
    s.delete(pedidos)
    s.commit()
    return jsonify({"message": "Pedido deletado com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)

