# Demo Project

<video width="100%" autoplay loop muted id="chatbot-demo">
<source type="video/mp4" :src="$withBase('/assets/videos/chatbot-demo.mp4')"></source>
</video>

In dit project doorlopen we hoe je een simpele chatbot maakt met behulp van webtechnologiën (HTML, CSS en JavaScript) in combinatie met [RiveScript](https://www.rivescript.com/).

## Projectstructuur Aanmaken

Om onze eigen chatbot te maken, maken we een standaard project aan met een HTML, CSS en JavaScript bestand aan.

```bash
.
├── app.js
├── index.html
└── main.css
```

In het HTML bestand zetten we boilerplate HTML code (in Visual Studio Code kan dit makkelijk met: ! + Enter).
We linken het CSS en JavaScript bestand, en geven de website een titel.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot Demo</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <h1>Chatbot Demo</h1>
    
    <script src="app.js"></script>
</body>
</html>
```

## Chatvenster Maken

Om te kunnen chatten met de bot, moeten we een chatvenster aanmaken. Hiervoor voegen we de volgende code toe in de `<body></body>` van het HTML bestand (Na `<h1>Chatbot Demo</h1>`):

```html
<div class="chat-container">
    <div class="chat-display"></div>
    <form class="chat-form" autocomplete="off">
        <input class="chat-input" type="text" name="chat-input" id="chat-input" autofocus>
        <button type="submit" class="chat-send">Verstuur</button>
    </form>
</div>
```

Nu moeten we nog de basisfunctionaliteit van het chatvenster toevoegen. Dit doen we aan de hand van het `app.js` bestand.

Eerst linken we de nodige HTML-elementen.

```javascript
const sendButton = document.querySelector('.chat-send');
const chatInput = document.querySelector('.chat-input');
const chatDisplay = document.querySelector('.chat-display');
```

Om de input van de gebruiker bij te houden, luisteren we veranderigen in het input veld en slaan we het op in een variabele.

```javascript
let inputValue = '';

chatInput.addEventListener('input', () => {
    inputValue = chatInput.value.trim();
});
```

De tekst moet nu nog getoond worden in het chatvenster wanneer op de 'Verstuur'-knop wordt geklikt. Dit doen we door opnieuw een `eventListener` en `onSend()`-functie toe te voegen.

```javascript
function onSend() {
    if (inputValue.length < 1) return;
    addChat(inputValue, true);

    chatInput.value = '';
    inputValue = '';
}

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    onSend();
});
```

De `onSend()`-functie verloopt als volgt:
1. Stop de functie als er geen input is.
2. Voeg het bericht toe aan het chatvenster via de `addChat`-functie (moeten we nog aanmaken).
3. Reset de input en de opgeslagen input.

Laten we nu de `addChat`-functie aanmaken. Deze moet ervoor zorgen dat de berichten getoond worden in het chatvenster.

```javascript
function addChat(message, isUser = false) {
	const element = document.createElement('div');
    element.innerText = message;
    
	element.classList.add('chat-message');
    isUser && element.classList.add('chat-message--user');
    
    chatDisplay.append(element);

    chatDisplay.scrollTo({
        top: chatDisplay.scrollHeight,
    });
}
```
Aan de `addChat()`-functie moeten we een bericht (`message`) kunnen meegeven en aangeven of het een bericht van de gebruiker of de chatbot is (`isUser`);

Dze functie verloopt als volgt:
1. Maak een nieuw HTML-element aan.
2. Maak de tekst van het element dezelfde als het meegegeven berricht.
3. Voeg de 'chat-message' `class` toe.
4. Voeg de 'chat-message--user' `class` toe inden het een bericht van de gebruiker is.
5. Voeg het element toe aan het chatvenster.
6. Scroll naar beneden.

Om het chatvenster mooier te maken, voegen we volgende CSS toe aan het `main.css` bestand:

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
}

html,
body {
    width: 100%;
    height: 100%;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 2rem;
    background-color: #222;
    color: #eee;
}

.chat-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 600px;
    max-height: calc(100vh - 10rem);
    width: 100%;
    height: 100%;
    background-color: #333;
    margin-top: 2rem;
}

.chat-display {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.chat-message {
    background-color: #222;
    padding: .5rem 1rem;
    margin: .5rem 1rem;
    margin-bottom: 0;
    width: fit-content;
    word-break: break-all;
}

.chat-message:first-child {
    margin-top: 1rem;
}

.chat-message:last-child {
    margin-bottom: 1rem;
}

.chat-message--user {
    background-color: #fff;
    color: #222;
    align-self: flex-end;
}

.chat-form {
    display: flex;
    height: 40px;
}

.chat-input {
    width: 100%;
    border: none;
    font-size: 16px;
    padding: 0 1rem;
}

.chat-input:focus {
    outline: 2px solid #aaa;
    outline-offset: -2px;
}

.chat-send {
    min-width: 100px;
    background-color: #aaa;
    border: none;
    font-size: 16px;
    font-weight: bold;
}
```

## RiveScript Toevoegen

Nu kunnen we een RiveScript bestand aanmaken. Dit doen we door gebruik te maken van de `.rive` bestandsextensie. we maken `demo.rive` aan.

Ons project ziet er nu als volgt uit:

```bash
.
├── app.js
├── demo.rive
├── index.html
└── main.css
```

In `demo.rive` kunnen we nu simpele chatbot logica gebruiken.

Eerst voegen we de versie van RiveScript toe:

```javascript rivescript
! version = 2.0
```

Vervolgens kunnen we aan de logica beginnen. RiveScript heeft simpele syntax: tekst voorafgaand van een `+` dient als trigger, tekst voorafgaand van een `-` dient als antwoord op een trigger. Triggers worden in lowercase getypt en zonder leestekens. Als de gebruiker toch de trigger typt, maar met hoofdletters en leestekens, zal deze toch getriggerd worden.

In een trigger kan je ook wildcards gebruiken (zoals `*`). Dit wil zeggen dat op de plaats van `*` gelijk welk woord kan ingevoerd worden.

Dit wordt duidelijk aan de hand van een voorbeeld:

```javascript rivescript
! version = 2.0

+ hallo chatbot
- Hallo gebruiker!
```

In dit voorbeeld zal 'Hallo gebruiker!' geantwoord worden als de gebruiker 'hallo chatbot', 'Hallo, Chatbot!' of dergelijke verstuurd.

Bij dit voorbeeld zal ook een error verschijnen als de input niet matcht met de trigger. Hiervoor kunnen we dus een wildcard gebruiken om zo een standaard antwoord te geven als de gebruiker iets anders verstuurd.

```javascript rivescript
! version = 2.0

+ hallo chatbot
- Hallo gebruiker!

+ *
- Dat heb ik niet begrepen...
```

Nu we de basislogica van onze chatbot hebben, kunnen we deze implementeren in onze website. Hiervoor bestaat een library: rivescript-js.
Om deze toe te voegen, linken we het in ons html document (`index.html`) door de volgende tag toe te voegen in de `<head></head>`:

```html
<script src="https://unpkg.com/rivescript@latest/dist/rivescript.min.js"></script>
```

Vervolgens moeten we het implementeren in `app.js`.

Eerst moeten we de chatbot initialiseren. Eerst moeten we hem te instantiëren. Hierna kunnen we ons RiveScript-bestand (`demo.rive`) linken. Als dat gebeurt is, moeten we alle triggers en antwoorden verwerken en sorteren, anders zal de chatbot niet werken.

```javascript
let bot = new RiveScript();

initializeBot();

async function initializeBot() {
    try {
        await bot.loadFile("demo.rive");
        bot.sortReplies();

        console.log("De chatbot is geïnitialiseerd!");
    } catch (error) {
        console.log(error);
    }
}
```

Als dit gebeurt is, is onze chatbot klaar om te gebreuken. We kunnen nu een input laten verwerken, waarna we een antwoord zullen krijgen. Dit kunnen we doen door de volgende code toe te voegen in de `onSend()`-functie:

```javascript
const reply = await bot.reply('local-user', inputValue);
addChat(reply);
```

Omdat we de reactie van de bot een `Promises` is, moeten we de functie `async` maken.

De `onSend()`-functie ziet er nu als volgt uit:

```javascript
async function onSend() {
    if (inputValue.length < 1) return;
    addChat(inputValue, true);
    
    const reply = await bot.reply('local-user', inputValue);
    addChat(reply);

    chatInput.value = '';
    inputValue = '';
}
```

## Demo

Nu zou je het volgende resultaat moeten bekomen:

<iframe src="https://thomvand26.github.io/chatbot-demo/" width="100%" height="500px" style="border: none"></iframe>

Proficiat, je hebt nu een chatbot gemaakt! 🎉  
Deze chatbot kan je nu aanpassen en verbeteren zoals je zelf wil.

De code van deze demo kan je terugvinden op [de GitHub repo van de demo](https://github.com/thomvand26/chatbot-demo).
