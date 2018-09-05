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

