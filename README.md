# Bank

# Pré-requis

python3 --version
pip --version

# si ces versions ne sont pas présentes

# Linux

sudo apt update
sudo apt install python3 python3-pip python3-venv -y

# MacOS

installer Homebrew si besoin 

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Puis

brew install python3

# Windows

installe-le via https://python.org/downloads

Coche la case “Add Python to PATH” à l’installation

# SUITE

python -m venv .venv

(en fonction de votre version de python ça peut etre "python" ou "python3")

# sur Windows

.venv\Scripts\activate

# Autre 

source .venv/bin/activate

pip install "fastapi[standard]"

# pour Lancer le serveur 

fastapi dev main.py