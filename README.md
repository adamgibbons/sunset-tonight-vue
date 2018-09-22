# sunset-tonight-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Work
- [x] Get geolocation from browser
- [x] Determine sunset time
- [x] Convert sunset time to unix timestamp
- [x] Query weather api
- [ ] Format + pipe weather api response to sunset algorithm
- [ ] Update view with response from sunset algorithm

## Notes

#### Factors in a good sunset
- Mid to high level clouds
- 30 to 70 percent cloud coverage
- Clean air
- Lower humidity
- Calm winds
- high visibility

#### Darksky api
```
GET https://api.darksky.net/forecast/<key>/<lat>,<lon>,<unix-timestamp>
```

#### Forecast data:
```
{
  "summary": "Mostly Cloudy",
  "precipIntensity": 0.0165,
  "precipProbability": 0.24,
  "humidity": 0.55,
  "pressure": 1006.18,
  "windSpeed": 6.78,
  "windGust": 12.05,
  "cloudCover": 0.72,
  "visibility": 6.03,
  "ozone": 259.23
}
```
