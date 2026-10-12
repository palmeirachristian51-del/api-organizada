nova branch com a versão antiga.
# API Organizada — CRUD Usuários, Produtos e Pedidos

Projeto dividido em backend (Flask + SQLAlchemy) e frontend (HTML/JS estático).

## Estrutura

```
backend/
  app.py            # API REST (Flask)
  models.py         # Modelos SQLAlchemy
  requirements.txt  # Dependências Python
frontend/
  pages/            # Páginas HTML
  js/               # Scripts JS (consomem a API)
```

## Como rodar

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py        # API em http://localhost:5000
```

### Frontend
Sirva a pasta `frontend/` com um servidor estático, ex.:
```bash
cd frontend
python -m http.server 8080
```
Abra http://localhost:8080/pages/usuarios.html
