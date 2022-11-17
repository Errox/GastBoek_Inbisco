# GastBoek_Inbisco
Gastboek_inbisco is a application that allows users to leave a message on the guestbook application.


# Commentaar
Voor dit project heb ik gekozen om voor C# ASP.Net als back end en React als front-end te gebruiken. Nu had ik zelf nog nooit met React gewerkt, dus vond ik het een goede uitdaging om daar een verrandering in te maken. Voor het bouwen van de backend heb ik gebruik gemaakt van het Entity framework samen met het Identity framework. De backend is opgezet als API (voor zowel de data als Identity server) om de data te presenteren. Als database heb ik gekozen voor SQLite omdat ik inmemorydatabase niet voor elkaar kreeg in ASP.net core 6.

 De frontend is opgezet met React en maakt gebruik van de API om de data te presenteren. De frontend is opgezet binnen visual studio 2022. Tijdens het bouwen van de front-end zijn er af en toe keuzes gemaakt die niet de beste keuze waren, maar ik heb geprobeerd om de code zo netjes mogelijk te houden. Bij het gebruik van de applicatie is bijvoorbeeld te zien dat na een actie (Zoals het posten van een nieuwe comment, het opslaan van een aangepaste comment en het verwijderen van een comment) dat de gebruiker niet terug gestuurd wordt naar de home page. Ik heb het idee omdat ik gebruik gemaakt heb van Components in plaats van dynamic functions kon ik niet zomaar useNavigate toepassen om de gebruiker terug te sturen naar de home page. 

 In de folder diagrammen is de ERD terug terug vinden.

 In de folder Postman is een Postman collection te vinden voor de Backend API.


## Description about application
Maak een gastenboek waarin bezoekers van een website wat gegevens en een berichtje kunnen achterlaten. 

Op de hoofdpagina is een lijst te zien met alle berichten, gesorteerd op datum met de nieuwste bovenaan. 

Het moet mogelijk zijn berichten te plaatsen, updaten en te verwijderen. 

Een bericht bestaat minimaal uit naam, e-mail en een geschreven bericht. 



