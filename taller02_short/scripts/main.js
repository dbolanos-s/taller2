/**
 * @file main.js
 * @description Main JavaScript file for the Coffee Sales Dashboard.
 */

// Formateador de moneda USD
const fmtUSD = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

let loadData = () => {

    try {
        fetch('https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml')
            .then(response => response.text())
            .then(xml => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xml.trim(), 'application/xml');
                return doc;
            })
            .then(doc => {
                const items = doc.getElementsByTagName('row');
                const tbody = document.getElementById('transacciones');
                const limit = Math.min(20, items.length);

                for (let i = 0; i < limit; i++) {
                    const date   = items[i].getElementsByTagName('Date')[0].textContent;
                    const coffee = items[i].getElementsByTagName('coffee_name')[0].textContent;
                    const money  = parseFloat(items[i].getElementsByTagName('money')[0].textContent);

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${date}</td>
                        <td>${coffee}</td>
                        <td>${fmtUSD.format(money)}</td>
                    `;
                    tbody.appendChild(tr);
                }
            })

    } catch (err) {
        console.error(err);
    }

}

window.addEventListener('DOMContentLoaded', loadData);