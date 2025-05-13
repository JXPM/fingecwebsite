# git/github
rm -rf .git
git init
git branch -M main
git add .
git commit -m "first commit"
gh repo create fingecwebsite --public
git remote add origin https://github.com/JXPM/fingecwebsite.git
git push --set-upstream origin main


# 1. Initialisation d'un projet Node si ce n'est pas déjà fait
npm init -y

# 2. Installation des dépendances principales (depuis package.json)
npm install react react-dom next

# 3. TypeScript et types
npm install -D typescript @types/react @types/node

# 4. TailwindCSS + PostCSS + Autoprefixer
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. ESLint
npm install -D eslint eslint-config-next

# 6. Pour la configuration de Biome
npm install -D @biomejs/biome

# 7. Formulaires
npm install react-hook-form

# 8. chatbot ou une API AI
npm install openai

# 9. Autres dépendances de style ou UI
npm install @headlessui/react @heroicons/react

# 10. Supprime et recrée les fichiers de build
rm -rf .next out

# 11. Lancer le projet en dev
npm run dev


# Supprimer le fichier .env du suivi git
git rm --cached .env
rm '.env'

#create .gitignore
touch backend/.gitignore

#fichier Maj et push
git status
git add .
git commit -m "implementation et ajout des emails"
git push origin main