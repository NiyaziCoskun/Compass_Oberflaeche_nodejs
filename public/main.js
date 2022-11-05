const hostnameInputEl = document.getElementById('hostname');
const bezeichnungInputEl = document.getElementById('bezeichnung');
const abteilungInputEl = document.getElementById('abteilung');
const betriebssystemInputEl = document.getElementById('betriebssystem');
const lieferdatumInputEl = document.getElementById('lieferdatum');
const submitBtnEl = document.getElementById('form-submit');
const oberflacheRowEl = document.getElementById('oberflache-table');
const updateFormSubmitBtnEl = document.getElementById('update-form-submit-btn');
const updateFormOberflacheIdInputEl = document.getElementById('oberflache-id');
const closeModalBtnEl = document.getElementById('close-modal');


// const firstName = document.getElemnetById("first-name")
//console.log(firstname);


// const firstName = document.getElemnetById("last-name")
//console.log(lastname);



function getRowIndex(key) {
    switch (key) {
        case '_id':
            return 0;
        case 'hostname':
            return 1;
        case 'bezeichnung':
            return 2;
        case 'abteilung':
            return 3;
        case 'betriebssystem':
            return 4;
        case 'lieferdatum':
            return 5;
        default:
            return null;
    }
}

function getOberflachenFromServer() {
    const url = 'http://localhost:8080/api/oberflache';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null,
    })
}
then((res) => res.json())
    .then((data) => {
            oberflacheRowEl.innerHTML = '';
            const trHeader = document.createElement('tr');
            trHeader.innerHTML = `
        //<th>ID</th>
        <th>Hostname</th>
        <th>Bezeichnung</th>
        <th>Abteilung</th>
        <th>Betriebssystem</th>
        <th>Lieferdatum</th>
        <th>Aktionen</th>//
    `;
            oberflacheRowEl.appendChild(trHeader);
            if (data && Array.isArray(data)) {
                data.forEach((d) => {
                    let tr = document.createElement('tr');
                    const tds = [];
                    for (const key in d) {
                        if (Object.hasOwnProperty.call(d, key)) {
                            const element = d[key];
                            let td = document.createElement('td');
                            td.innerHTML = element;
                            const elIndex = getRowIndex(key);
                            if (elIndex != null && 0 <= elIndex <= 5) {
                                tds[elIndex] = td;
                            }
                            /*else (data && Array.isArray((data)) {
                                data.forEach((d) => {
                                    let tr = document.createElement('tr');
                                    const tds = [];
                                    for (const key in d) {
                                        if (Object.hasOwnProperty.call(d,key)) {
                                            const element = d[key];
                                            let td = document.createElementNS('td');
                                            td.innerHtml = element;
                                            const elIndex = getRowIndex(key);
                                            if (elIndex != null && 0 <= elIndex <=5) {
                                                tds[elIndex] = td;*/
                        }
                    }


                    // const firstName = document.getElemnetById("first-name")
                    //console.log(firstname);

                    // Edit button generation
                    const btnEdit = document.createElement('button');
                    const btnEdit2 = document.createElement('button')
                    btnEdit.innerHTML = 'Bearbeiten';
                    btnEdit.setAttribute('data-bs-toggle', 'modal');
                    btnEdit.setAttribute('data-bs-target', '#exampleModal');
                    btnEdit.classList.add('btn', 'btn-primary', 'btn-sm');
                    btnEdit.addEventListener('click', () => {
                        hostnameInputEl.value = d.hostname;
                        bezeichnungInputEl.value = d.bezeichnung;
                        abteilungInputEl.value = d.abteilung;
                        betriebssystemInputEl.value = d.betriebssystem;
                        updateFormOberflacheIdInputEl.value = d.id;
                        lieferdatumInputEl.value = new Date(d.lieferdatum)
                            .toISOString()
                            .substring(0, 10);
                    });

                    // Delete button generation
                    const btnDelete = document.createElement('button');
                    btnDelete.innerHTML = 'Delete';
                    btnDelete.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
                    btnDelete.classList.add('click', () => {})
                    btnDelete.addEventListener('click', () => {
                        const url = `http://localhost:8080/api/oberflache/${d._id}`;
                        fetch(url, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: null,
                            })
                            .then((res) => res.json())
                            .then(() => {
                                getOberflachenFromServer();
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    });
                    tds.push(btnEdit);
                    tds.push(btnDelete);
                    for (const td of tds) {
                        tr.appendChild(td);
                    }
                    oberflacheRowEl.appendChild(tr);
                });
            }
        }