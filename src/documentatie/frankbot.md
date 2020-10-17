# Frankbot

In dit laatste project over chatbots, heb ik door gebruik te maken van [React](https://reactjs.org/), [RiveScript](https://www.rivescript.com/) en de [Open Weather API](https://openweathermap.org/api) een chatbot gemaakt die meer info geeft over het huidige weer, geïnspireerd door Frank Deboosere.

## Demo van Frankbot

Hieronder kan je zelf Frankbot uittesten.

<iframe src="https://thomvand26.github.io/frankbot/" width="100%" height="500px" style="border: none"></iframe>

## Triggers

Frankbot reageert op de volgende triggers:

### Algemeen

|Trigger|Antwoord|
|--|--|
|hallo|Begroeting|
|doei|Afscheidsbericht|

### Weer
|Trigger|Antwoord|
|--|--|
|weer|Huidige weersvoorspelling|
|graden/warm/koud/temperatuur|Huidige temperatuur|
|wind/waaien|Huidige windsnelheid|
|regen|Gevallen regen in het afgelopen uur|

### Locatie
|Trigger|Antwoord|
|--|--|
|in|Om de locatie te veranderen (standaard: Gent)|
|ja/nee|Om de lokatie te bevestigen|

## Uitleg bij code

In dit onderdeel, zal ik dit project kort overlopen. Aangezien het voornamelijk over de functionaliteit gaat, ga ik het niet hebben over de styling.

### Basis

Ik ben begonnen met een React app te maken aan de hand van het commando `yarn create react-app`. Hierna heb ik enkele basiselementen verwijderd en de mappenstructuur aangepast.
Ook voeg ik de volgende packages toe: `node-sass`, `classnames` en `rivescript`.

Mijn mappenstructuur ziet er dan zo uit:

```bash
.
├── node_modules
│   └── ...
├── public
│   └── ...
├── src
│   ├── app
│   │   ├── _scss
│   │   │   └── ...
│   │   ├── assets
│   │   │   └── frank-deboosere.jpg
│   │   ├── components
│   │   │   ├── ChatDisplay
│   │   │   │   └── index.jsx
│   │   │   └── index.js
│   │   ├── config
│   │   │   └── index.js
│   │   ├── rivescript
│   │   ├── services
│   │   │   ├── chatbot.service.js
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   └── app.scss
│   ├── index.css
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

In `index.js` (in de `src`-map) heb ik nu de volgende code staan:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.jsx';

ReactDOM.render(
	<React.StrictMode>
        <App />
	</React.StrictMode>,
	document.getElementById('root')
);
```

In `App.jsx` (in de `app`-map) heb ik nu de volgende code staan:

```jsx
import React from 'react';
import './app.scss';

import Frank from './assets/frank-deboosere.jpg';

function App() {
	return (
		<div className="app">
			<header className="appHeader container">
				<div className="inner">
					<img src={Frank} alt="Frank Deboosere" />
					<h1>Frankbot</h1>
				</div>
			</header>
			<main className="appMain container fullHeight">
				<div className="inner fullHeight">
				</div>
			</main>
		</div>
	);
}

export default App;
```

In `app.scss` (in de `app`-map) link ik alle scss-bestanden die in de `_scss`-map staan.


## RiveScript

In de `rivescript`-map maak ik een nieuw bestand aan genaamd `brain.rive`.

```bash
rivescript
└── brain.rive
```

Hierin staat de logica van de frankbot. Deze ziet er als volgt uit:

```javascript rivescript
! version = 2.0


// Substitutions

! sub temp      = temperatuur
! sub dag       = hallo
! sub salut     = doei
! sub tot later     = doei
! sub tot ziens     = doei
! sub totziens      = doei
! sub fijne dag nog       = doei


// Triggers en antwoorden

+ (hallo|*hallo|hallo*|*hallo*){weight=1}
- Hallo! Probeer zoektermen met daarin weer, 'temperatuur', 'wind' of 'regen' om meer te weten te komen over het weer op dit moment.

+ * in *{weight=10}
- <set location=<star2>>Wil je het weer in <get location> weten?

+ ja
% (in *|* in *)
- <call>getWeather <get location></call>

+ nee
% (in *|* in *)
- Ok.

+ (weer|*weer|weer*|*weer*){weight=9}
- <call>getWeather <get location></call>

+ (temperatuur|*temperatuur|temperatuur*|*temperatuur*)
- <call>getWeather <get location> temperatuur</call>

+ (graden|*graden|graden*|*graden*)
- <call>getWeather <get location> temperatuur</call>

+ (warm|*warm|warm*|*warm*)
- <call>getWeather <get location> temperatuur</call>

+ (koud|*koud|koud*|*koud*)
- <call>getWeather <get location> temperatuur</call>

+ (wind|*wind|wind*|*wind*)
- <call>getWeather <get location> wind</call>

+ (waaien|*waaien|waaien*|*waaien*)
- <call>getWeather <get location> wind</call>

+ (regen|*regen|regen*|*regen*)
- <call>getWeather <get location> regen</call>

+ (doei|*doei|doei*|*doei*)
- Tot later! Hopelijk zie ik je snel weer, met meer weer!

+ *
- Dat heb ik niet begrepen...
- Oei, dat heb ik niet verstaan...
- Vraag me iets over het weer.
```

|Code|Uitleg|
|--|--|
|`! sub dag = hallo`|Met substitutions kan je woorden gelijkstellen aan elkaar. Bij 'dag' wordt ook 'hallo' getriggerd en vice versa.|
|`+ (weer|*weer|weer*|*weer*)`|Deze trigger zal getriggerd worden bij elke zin waar 'weer' in voorkomt. Ongeacht wat er voor of na staat.|
|`{weight=9}`|Aan triggers kunnen we een `weight` (of 'gewicht') meegeven. Zo kunnen we bepalen welke trigger voorang krijgt wanneer er meerdere tegelijkertijd worden getriggerd. Hoger gewicht = meer voorrang.|
|`<set location=<star2>>`|Met `<set variabele=waarde>` kunnen we waarden aan variabelen toewijzen binnen het RiveScript-bestand. Met `<star>` kan je de waarde van een wildcard gebruiken. `<star2>` zal dus de waarde krijgen van wat er op de plaats van de 2e wildcard staat.|
|`<get location>`|Hiermee kunnen we de waarde van een variabele weergeven/gebruiken.|
|`% (in *|* in *)`|Met `%` kan je de volgorde van triggers bepalen. De trigger die erboven staat zal pas getriggerd worden als de vorige trigger de woorden bevat die na `%` staan (in dit geval 'in').|
|`<call>getWeather</call>`|Met `<call></call>` kunnen we een functie oproepen binnen RiveScript. Deze kan in het bestand zelf gedefinieerd staan of achteraf gelinkt worden aan het RiveScript-bestand.|


## De chatbot

Het RiveScript-bestand wordt gelinkt aan de chatbot. Dit doe ik door een store aan te maken (met een React context en context provider), waar alle componenten aan kunnen.

In `chatbot.service.js` (in de `services`-map) staat volgende code:

```jsx
import {
	default as React,
	useContext,
	createContext,
	useState,
	useEffect,
} from 'react';
import RiveScript from 'rivescript';
import { openWeatherConfig } from '../config';

import Brain from '../rivescript/brain.rive';

// De context
const ChatbotContext = createContext();

// De hook
const useChatbot = () => useContext(ChatbotContext);

// De context provider
const ChatbotProvider = ({ children }) => {
	// De instantie van de chatbot
	const [bot, setBot] = useState();
	// De 'addToDisplay'-functie (gelinkt vanuit het 'ChatDisplay'-component)
	const [addToDisplay, setAddToDisplay] = useState();

	// Wanneer dit component geïnitialiseerd wordt:
	useEffect(() => {
		// Instantieer de chatbot en voeg deze toe aan de 'bot'-state
		setBot(new RiveScript());
	}, []);

	// Wanneer de chatbot wel/niet geïnstantieerd wordt,
	// en/of wanneer de 'addToDisplay'-functie gelinkt wordt:
	useEffect(() => {
		// Voer volgende code niet uit als de bot niet geïnstantieerd of de 'addToDisplay'-functie niet gelinkt is
		if (!bot || !addToDisplay) return;

		// Voeg de functie 'getWeather' toe aan het RiveScript-bestand
		bot.setSubroutine('getWeather', getWeather);
	}, [bot, addToDisplay]);

	// Wanneer de chatbot wel/niet geïnstantieerd wordt:
	useEffect(() => {
		// Initialiseer de chatbot als deze nog niet geïnstantieerd is
		if (!bot) return;
		initializeBot();
	}, [bot]);

	// Initialiseer de chatbot
	async function initializeBot() {
		try {
			// Laad het RiveScript bestand
			await bot.loadFile(Brain);

			// Verwerk en sorteer de triggers en antwoorden
			bot.sortReplies();

			// Voeg de variabele 'location', met bijbehorende waarde 'gent' toe aan het RiveScript-bestand
			bot.setUservar('local-user', 'location', 'gent');

			console.log('De chatbot is geïnitialiseerd!');
		} catch (error) {
			console.log(error);
		}
	}

	// Verwerk een input door de bot
	function reply(input) {
		return bot.reply('local-user', input);
	}

	// Verkrijg het weer via de Open Weather API
	async function getWeather(rs, args) {
		// Verkrijg het weer via de Open Weather API
		const fetchUrl = `${openWeatherConfig.baseURL}weather?q=${args[0]}&units=metric&lang=nl&APPID=${openWeatherConfig.ApiKey}`;
		const response = await fetch(fetchUrl);
		const data = await response.json();

		// Het laatst te geven bericht
		let finalResponse = '';

		// Genereer antwoorden die bij het tweede argument passen (met de verkregen data)
		switch (args[1]) {
			case 'temperatuur':
				finalResponse = `Het is nu ${parseInt(data.main.temp)}°C in ${data.name}.`;
				break;
			case 'wind':
				finalResponse = `Er zijn momenteel windsnelheden van ${parseInt(data.wind.speed)} meter per seconde in ${data.name}.`;
				break;
			case 'regen':
				if (data.rain) {
					finalResponse = `Het voorbije uur heeft het ${parseInt(data.rain.rain['1h'])}mm/m² geregend in ${data.name}.`;
				} else {
					finalResponse = `Het voorbije uur heeft het niet geregend in ${data.name}.`;
				}
				break;

			// Genereer een antwoord als er geen tweede argument is
			default:
				// Voeg direct een bericht toe aan het chatvenster (niet via een antwoord in het RiveScript-bestand)
				addToDisplay.callback(
					`De weersvoorspelling voor vandaag is ${data.weather[0].description} in ${data.name}.`
				);
				// Voeg direct knoppen toe aan het chatvenster
				addToDisplay.callback(
					<>
						<button
							className="chatButton"
							onClick={() => sayAsUser('temperatuur')}
						>
							Temperatuur
						</button>
						<button className="chatButton" onClick={() => sayAsUser('wind')}>
							Wind
						</button>
						<button className="chatButton" onClick={() => sayAsUser('regen')}>
							Regen
						</button>
					</>
				);
				break;
		}

		// Geef het laats te geven bericht terug (als antwoord) aan het RiveScript-bestand
		return finalResponse;
	}

	// Verstuur een bericht in naam van de gebruiker
	async function sayAsUser(message) {
		// Voeg het bericht toe aan het chatvenster
		addToDisplay.callback(message.trim(), true);

		// Verwerk het bericht door de chatbot en krijg een gepast antwoord
		const replyFromBot = await reply(message);

		// Voeg het antwoord toe aan het chatvenster
		addToDisplay.callback(replyFromBot.trim());
	}

  // Maak bepaalde functies/variabelen beschikbaar in de context provider
	const exports = {
		setAddToDisplay,
		reply,
		botReady: !!bot,
	};

  // Geef de context provider terug
	return (
		<ChatbotContext.Provider value={exports}>
			{children}
		</ChatbotContext.Provider>
	);
};

export { ChatbotContext, ChatbotProvider, useChatbot };
```

In `index.js` (in de `services`-map) staat volgende code:

```javascript
export * from './chatbot.service';
```

En in `index.js` (in de `src`-map):

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.jsx';
import { ChatbotProvider } from './app/services';

ReactDOM.render(
	<React.StrictMode>
		<ChatbotProvider>
			<App />
		</ChatbotProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
```

Om de Open Weather API te kunnen gebruiken, plaats ik in het `.env`-bestand de base URL van deze API en de API key die ik krijg bij het maken van een account op [de website](https://openweathermap.org/api).

Dit ziet er zo uit:

```
REACT_APP_OPEN_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/
REACT_APP_OPEN_WEATHER_API_KEY=*mijn geheime API key*
```

Ik maak het mezelf makkelijker door een configuratiebestand te maken. In `index.js` (in de `config`-map) staat het volgende:

```javascript
export const openWeatherConfig = {
  baseURL: process.env.REACT_APP_OPEN_WEATHER_BASE_URL,
  ApiKey: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
};
```

Hierna kan ik de chatbot gebuiken in al mijn componenten.

Ik maak een component aan om het chatvenster weer te geven.

In `index.js` (in de `ChatDisplay`-map) staat volgende code:

```jsx
import React, { useRef } from 'react';
import { useState } from 'react';
import { default as classNames } from 'classnames';
import { useEffect } from 'react';
import { useChatbot } from '../../services';

export default () => {
    // De inputwaarde van de gebruiker
    const [inputValue, setInputValue] = useState('');
    // Alle berichten die in het chatvenster komen
	const [messages, setMessages] = useState([]);
    // De referentie naar het chatvenster
	const chatDisplayRef = useRef(null);
    // Functionaliteit van de chatbot
	const { reply: botReply, setAddToDisplay, botReady } = useChatbot();

    // Wanneer de chatbot wel/niet geïnitialiseerd wordt:
	useEffect(() => {
        // Voer volgende code niet uit als de bot niet geïnitialiseerd is
        if (!botReady) return;

        // Link de 'addToDisplay' functie in aan de chatbot service (store)
		setAddToDisplay({ callback: addToDisplay });
	}, [botReady]);

    // Wanneer er bericht bijkomen:
	useEffect(() => {
        // Voer volgende code niet uit als het chatvenster nog niet bestaat is
		if (!chatDisplayRef.current) return;

        // Scroll naar beneden (naar het nieuwste bericht)
		chatDisplayRef.current.scrollTo({
			top: chatDisplayRef.current.scrollHeight,
		});
	}, [messages]);

	// Voeg een bericht toe aan het chatvenster
	function addToDisplay(message, isUser = false) {
        // Voer volgende code niet uit als het bericht een lege string is
        if (message === '') return;
        
        // Voeg een bericht toe aan de 'messages'-state
		setMessages((prev) => [
			...prev,
			{
				message,
				isUser,
			},
		]);
	}

	// Verstuur het bericht
	async function send() {
		// Voer volgende code niet uit als er geen input is
		if (inputValue.trim().length < 1) {
			setInputValue('');
			return;
		}

		// Voer volgende code niet uit als er geen input is
		sayAsUser(inputValue);

		// Reset de input in het de 'inputValue' state (en dus ook het inputveld)
		setInputValue('');
	}

	// Verstuur een bericht in naam van de gebruiker
	async function sayAsUser(message) {
		// Voeg het bericht toe aan het chatvenster
		addToDisplay(message.trim(), true);

		// Verwerk het bericht door de chatbot en krijg een gepast antwoord
		const reply = await botReply(message);

		// Voeg het antwoord toe aan het chatvenster
		addToDisplay(reply.trim());
	}

	// Luister naar veranderingen van het inputveld
	function onInputChange(e) {
		// Verwijder de witruimte van de input en sla deze op
		setInputValue(e.target.value);
	}

	// Luister naar het klikken op de 'Verstuur'-knop (en het drukken op de Enter-toets)
	function onSubmit(e) {
		// Voorkom dat het scherm ververst wordt
		e.preventDefault();

		// Verstuur de opgeslagen input
		send();
	}

	return (
		<div className="chatContainer">
			<div className="chatDisplay" ref={chatDisplayRef}>
				{messages.map((messageObject, index) => (
					<div
						key={`message-${index}`}
						className={classNames(
							'chatMessage',
							`${messageObject.isUser && 'chatMessage--user'}`
						)}
					>
						{messageObject.message}
					</div>
				))}
			</div>
			<form className="chatForm" autoComplete="off" onSubmit={onSubmit}>
				<input
					className="chatInput"
					type="text"
					name="chatInput"
					id="chatInput"
					onChange={onInputChange}
					value={inputValue}
					autoFocus
				/>
				<button type="submit" className="chatSend">
					Verstuur
				</button>
			</form>
		</div>
	);
};
```

Om het component makkelijker te kunnen aanspreken, plaats ik het volgende in het `index.js`-bestand (in de `components`-map):
```javascript
export {default as ChatDisplay} from './ChatDisplay';
```

Het component plaats ik in `App.jsx` zodat het getoond wordt op het scherm. `App.jsx` (in de `app`-map) ziet er nu zo uit:

```jsx
import React from 'react';
import './app.scss';

import Frank from './assets/frank-deboosere.jpg';
import { ChatDisplay } from './components';

function App() {
	return (
		<div className="app">
			<header className="appHeader container">
				<div className="inner">
					<img src={Frank} alt="Frank Deboosere" />
					<h1>Frankbot</h1>
				</div>
			</header>
			<main className="appMain container fullHeight">
				<div className="inner fullHeight">
					<ChatDisplay />
				</div>
			</main>
		</div>
	);
}

export default App;
```

Dit is zowat de belangrijkste code om Frankbot te laten werken.
De volledige code van dit project kan je terugvinden op [de GitHub repo van Frankbot](https://github.com/thomvand26/frankbot).
