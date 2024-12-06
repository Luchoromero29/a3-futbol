export let dataPlantel2;
export let dataPlayers2;
export let dataPositions2;
export let dataTeam2;

const getDataPlantel2 = async () => {
    return await fetch('../../data/plantel.json')
        .then(response => response.json())
        .then(data => data);
}

const getData2 = async () => {
    dataPlantel2 = await getDataPlantel2();
    dataPlayers2 = dataPlantel2.players
    dataPositions2 = dataPlantel2.positions;
    dataTeam2 = dataPlantel2.team;
}

document.addEventListener("DOMContentLoaded", async () => {
    await getData2();
    console.log(dataTeam2);

    if (dataTeam2) {
        document.getElementById('name-plantel').textContent = dataTeam2.name;
    }
});