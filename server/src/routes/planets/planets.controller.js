const { getAllPlanets } = require("../../models/planets.model");

function htppGetAllPlanets(req, res) {
    return res.status(200).json(getAllPlanets());
};

module.exports = {
    htppGetAllPlanets,
}