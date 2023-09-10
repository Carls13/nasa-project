const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
    .pipe(parse({
      comment: '#',
      columns: true,
    }))
    .on('data', async (data) => {
      if (isHabitablePlanet(data)) {
       savePlanet(data);
      }
    })
    .on('error', (err) => {
      console.log(err);
      reject(err);
    })
    .on('end', async () => {
      const countPlanetsFound = (await getAllPlanets()).length;
      console.log(`${countPlanetsFound} habitable planets found!`);
      resolve();
    });
  })
  
}

async function getAllPlanets() {
  return await planets.find({});
};

async function savePlanet (data) {
  const planetData = {
    keplerName: data.kepler_name,
  };

  try {
    await planets.updateOne(planetData, planetData, { upsert: true });
  } catch (error) {
    console.error(`Could not save planet ${error}`);
  }
}
 

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};