# NightSkyManager - backend

Sample requests:

### ConstellationsController

POST http://localhost:3000/constellations/
{
    "name": "Scorpius",
    "description": null,
    "link": null,
    "related": []
}

GET http://localhost:3000/constellations/

GET http://localhost:3000/constellations/1

PUT http://localhost:3000/constellations/1
{
    "name": "Scorpius",
    "description": "Description",
    "link": null,
    "related": []
}

DELETE http://localhost:3000/constellations/1

### StarController

POST http://localhost:3000/stars
{
    "name": "Bellatrix",
    "description": null,
    "link": null,
    "related": []
}

GET http://localhost:3000/stars

GET http://localhost:3000/stars/1

PUT http://localhost:3000/stars/1
{
    "name": "Bellatrix",
    "description": "Description",
    "link": "Link",
    "related": [1]
}

DELETE http://localhost:3000/stars/1
