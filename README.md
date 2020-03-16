# todo-project
Récupérer et afficher un ensemble de tâches sous format JSON, en utilisant NodeJS et Docker.

# Aide pour utiliser le projet :

Pour cloner le projet, ouvrir une invite de commande Docker et saisir les commandes suivantes :

1°) git clone https://github.com/ronyouyou/todo-project.git (permet de cloner le projet dans l'endroit où vous vous trouvez lors de l'exécution de la commande).

2°) cd todo-project/

3°) docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=rtlry -d mysql:5 
Cette 3ème commande permet de démarrer une instance mysql.
Infos sur les options principales de la commande :
	-p permet de préciser un mappage sur un port
	--name permet de donner un nom à notre container
	-d permet de lancer le container en 'tâche de fond'
	
4°) docker run --name phpmyadmin --link mysql:db -d -p 3333:80 phpmyadmin/phpmyadmin
Cette 4ème commande permet de démarrer une instance phpmyadmin.
Infos sur les options principales de la commande :
	-p permet de préciser un mappage sur un port
	--name permet de donner un nom à notre container
	-d permet de lancer le container en 'tâche de fond'
	--link permet de lier le container avec celui de mysql créé avant.


5°) docker run -it --rm -p 8081:3000 -v $PWD:/todo-project --link mysql:db node:12 bash
Elle permet de lancer une invite commande sur l'image node:12 contenant l'ensemble de notre projet en mode 'développement'.

6°) cd todo-project

Rendu ici, rendez-vous sur PhpMyAdmin(soit 127.0.0.1:3333, ou bien 192.168.99.100:3333 si vous êtes sur Windows).
Connectez vous avec les identifiants (login = root, et le mot de passe correspond à celui défini dans la 3ème commande).
Une fois connecté, créez la base 'ProgWeb' et importez le script sql nommé 'todos.sql' que vous trouverez dans le dossier du projet créé après le clonage depuis github.

Une fois l'ensemble des données importées, retournez dans le terminal de Docker et saisissez la commande suivante :

7°) node index.js

Sur votre navigateur, rendez-vous sur le projet qui est lancé en saisissant l'adresse 127.0.0.1:8081 ou bien 192.168.99.100:8081.

4 utilisations s'offrent à vous :

- la route /todos de type 'get' qui permet d'afficher l'ensemble des tâches de notre todo-list.
- la route /todos de type 'post' qui permet d'ajouter une tâches à notre liste (et donc à la BDD).
- la route /todos/:id qui permet de mettre à jour une tâche par le biais de son id.
- la route /todos/:id qui permet de supprimer une tâche de la liste par le biais de son id.
