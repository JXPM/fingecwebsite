# git/github
rm -rf .git
git init
git branch -M main
git add .
git commit -m "first commit"
gh repo create fingecwebsite --public
git remote add origin https://github.com/JXPM/fingecwebsite.git
git push --set-upstream origin main

# Supprimer le fichier .env du suivi git
git rm --cached .env
rm '.env'

#create .gitignore
touch backend/.gitignore

#fichier Maj et push
git status
git add .
git commit -m "Ajout des animations & plus"
git push origin main