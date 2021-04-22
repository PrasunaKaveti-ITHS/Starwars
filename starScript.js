let peoples = [];
let next = 'http://swapi.dev/api/people/?page=1';
let previous;

function prevBtnOnClick() {

    if (previous == null) {
        document.getElementsByName("prev-btn").disabled = true;
    }
    else {
        document.getElementById("myList").textContent = charactersList(previous);
        document.getElementById("detailsList").textContent = '';
        document.getElementById("planetList").textContent = '';
    }
}

function nextBtnOnClick() {

    if (next == null) {
        document.getElementsByName("next-btn").disabled = true;
    }
    else
        document.getElementById("myList").textContent = charactersList(next);
    document.getElementById("detailsList").textContent = '';
    document.getElementById("planetList").textContent = '';
}

function charactersList(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {

            next = data.next;
            previous = data.previous;
            peoples = data.results;
            //To count page numbers
            count = data.count;
            pageNo = next.slice(-1);
            pageNo--;
            document.getElementById("pageNumber").innerHTML = ' ' + pageNo + " / " + Math.round(count / 10) + ' ';

            for (let i = 0; i < peoples.length; i++) {

                const character = peoples[i];
                let str = character.name;
                const divElement = document.createElement('div');
                const pElement = document.createElement('p');

                let detailsElement = document.getElementById('detailsList');


                let listElement = document.getElementById('myList');
                pElement.className = "myHover";
                pElement.innerText = str;

                pElement.addEventListener('click', function () {

                    pElement.style.background = '#444444';
                    pElement.style.color = '#ffffff';

                    document.getElementById("detailsList").textContent = '';

                    const name = character.name;
                    const height = character.height;
                    const mass = character.mass;
                    const hair_color = character.hair_color;
                    const skin_color = character.skin_color;
                    const eye_color = character.eye_color;
                    const birth_year = character.birth_year;
                    const gender = character.gender;
                    const home_world = character.homeworld;

                    getPlanetList(home_world);

                    const h2TagName = document.createElement('h2');
                    const pTagHeight = document.createElement('p');
                    const pTagMass = document.createElement('p');
                    const pTagHair = document.createElement('p');
                    const pTagSkin = document.createElement('p');
                    const pTagEye = document.createElement('p');
                    const pTagBirthYear = document.createElement('p');
                    const pTagGender = document.createElement('p');


                    const h2NameNode = document.createTextNode(name);
                    const pHeightNode = document.createTextNode('Height : ' + height);
                    const pMassNode = document.createTextNode('Mass : ' + mass);
                    const pHairNode = document.createTextNode('Hair color : ' + hair_color);
                    const pSkinNode = document.createTextNode('Skin color : ' + skin_color);
                    const pEyeNode = document.createTextNode('Eye color : ' + eye_color);
                    const pBirthYearNode = document.createTextNode('Birth_year : ' + birth_year);
                    const pGenderNode = document.createTextNode('Gender : ' + gender);

                    h2TagName.appendChild(h2NameNode);
                    pTagHeight.appendChild(pHeightNode);
                    pTagMass.appendChild(pMassNode);
                    pTagHair.appendChild(pHairNode);
                    pTagSkin.appendChild(pSkinNode);
                    pTagEye.appendChild(pEyeNode);
                    pTagBirthYear.appendChild(pBirthYearNode);
                    pTagGender.appendChild(pGenderNode);

                    detailsElement.appendChild(h2TagName);
                    detailsElement.appendChild(pTagHeight);
                    detailsElement.appendChild(pTagMass);
                    detailsElement.appendChild(pTagHair);
                    detailsElement.appendChild(pTagSkin);
                    detailsElement.appendChild(pTagEye);
                    detailsElement.appendChild(pTagBirthYear);
                    detailsElement.appendChild(pTagGender);
                });

                divElement.appendChild(pElement);

                listElement.appendChild(pElement);
            }
            pElement.style.background = '';
            pElement.style.color = '';
        });
}

charactersList(next);

function getPlanetList(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const name = data.name;
            const rotation_period = data.rotation_period;
            const orbital_period = data.orbital_period;
            const diameter = data.diameter;
            const climate = data.climate;
            const gravity = data.gravity;
            const terrain = data.terrain;

            let planetListElement = document.getElementById('planetList');
            document.getElementById("planetList").textContent = '';

            const h2TagName = document.createElement('h2');
            const pTagRotationPeriod = document.createElement('p');
            const pTagOrbitPeriod = document.createElement('p');
            const pTagDiameter = document.createElement('p');
            const pTagClimate = document.createElement('p');
            const pTagGravity = document.createElement('p');
            const pTagTerrain = document.createElement('p');

            const h2NameNode = document.createTextNode(name);
            const pRotationPeriodNode = document.createTextNode(' Rotation period: ' + rotation_period);
            const pOrbitPeriodNode = document.createTextNode('Orbital period: ' + orbital_period);
            const pDiameterNode = document.createTextNode('Diameter : ' + diameter);
            const pClimateNode = document.createTextNode('Climate : ' + climate);
            const pGravityNode = document.createTextNode('Gravity : ' + gravity);
            const pTerrainNode = document.createTextNode('Terrain : ' + terrain);

            h2TagName.appendChild(h2NameNode);
            pTagRotationPeriod.appendChild(pRotationPeriodNode);
            pTagOrbitPeriod.appendChild(pOrbitPeriodNode);
            pTagDiameter.appendChild(pDiameterNode);
            pTagClimate.appendChild(pClimateNode);
            pTagGravity.appendChild(pGravityNode);
            pTagTerrain.appendChild(pTerrainNode);

            planetListElement.appendChild(h2TagName);
            planetListElement.appendChild(pTagRotationPeriod);
            planetListElement.appendChild(pTagOrbitPeriod);
            planetListElement.appendChild(pTagDiameter);
            planetListElement.appendChild(pTagClimate);
            planetListElement.appendChild(pTagGravity);
            planetListElement.appendChild(pTagTerrain);
        });
}