# hydra
projet hydra pour un cours de mt2i

Permet de générer des bulletins météo aléatoires et de les afficher
3 micro services :
- genere : genere des bulletins aléatoires lorsque qu'appelé par /add puis les envoit à 'stock:'
- stock : stock les bulletins reçus dans un tableau, renvoie les bulletins à affiche quand ils sont demandés
- affiche : demande les bulletins à stock quand appelé par /show puis affiche à l'utilisateur ce qu'il a reçu

-> Pour lancer le test : lancer en node séparément : affiche/stock/bulletin/genere
-> localhost:{n°de port de bulletin}/v1/html

Si pc perso à la fac : ports bloqués donc partage de connexion mobile.
