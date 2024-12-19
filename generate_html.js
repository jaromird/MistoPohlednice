const fs = require("fs");

// Načtení JSON dat
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// HTML šablona
const htmlTemplate = (obce) => `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Místopisné pohlednice</title>
    <style>
        img.thumbnail {
            width: 200px;
            height: auto;
            border: 1px solid #ccc;
            margin: 5px;
            cursor: pointer;
        }
        img.thumbnail:hover {
            border-color: #000;
        }
        .card {
            display: inline-block;
            text-align: center;
            margin: 10px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Místopisné pohlednice</h1>
    </header>
    <main>
        <section id="towns">
            <h2>Seznam obcí</h2>
            <ul>
            ${obce.map(obec => `
                <li>
                    <h3>${obec.nazev}</h3>
                    <ul>
                    ${obec.motivy.map(motiv => `
                        <li>
                            <h4>${motiv.nazev}</h4>
                            ${motiv.pohlednice.map(pohlednice => `
                            <div class="card">
                                <a href="${pohlednice.front}">
                                    <img src="${pohlednice.front}" alt="Líc ${pohlednice.nazev}" class="thumbnail">
                                </a>
                                <p><strong>${pohlednice.nazev}</strong></p>
                                <a href="${pohlednice.back}">Rub</a> | 
                                <a href="${pohlednice.info}">Informace</a>
                            </div>
                            `).join("")}
                        </li>
                    `).join("")}
                    </ul>
                </li>
            `).join("")}
            </ul>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Místopisné pohlednice</p>
    </footer>
</body>
</html>
`;

            

// Vygeneruj HTML obsah
const htmlContent = htmlTemplate(data.obce);

// Ulož do souboru
fs.writeFileSync("index.html", htmlContent, "utf-8");
console.log("HTML stránka byla vygenerována do index.html");
