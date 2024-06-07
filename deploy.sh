echo "Log_dir : $LOG_DIR"
mkdir -p "./log/LogDirS" || { echo "Echec lors de la création du dossier pour les logs"; exit 1;}
touch "./log/LogDirS/deploy.log"
exec > >(tee -i "./log/LogDirS/deploy.log") || { echo "Echec lors de la création du fichier pour les logs"; exit 1;}
exec 2>&1
echo "Deployement du projet..."

docker-compose down
docker rmi masterclass_devops-backend masterclass_devops-front
docker-compose build
docker-compose up -d