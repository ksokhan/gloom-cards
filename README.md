# Gloom Cards App

[![Netlify Status](https://api.netlify.com/api/v1/badges/b036a5dc-1d21-4a1d-9bdb-71b96ee73714/deploy-status)](https://app.netlify.com/sites/gloomcards/deploys)

An app to browse and manage your character ability cards for Gloomhaven.

## Features
- Browse cards by class
- Show cards you've unlocked or hide cards don't use
- Drag and drop to rearrange cards
- Everything saves locally


## Upcoming
- Fix card changes in 2nd printing (https://boardgamegeek.com/thread/1761512/official-second-printing-change-log)
- Currently only showing classes I've unlocked
- Enhancements on cards

## Adding other class ability Cards
- Source images for all ability cards cand be found at:
https://github.com/any2cards/gloomhaven/tree/master/images/character-ability-cards
https://github.com/any2cards/gloomhaven/tree/master/images/character-ability-cards-revised
- Then use automator to rename sequentially
- edit `src/data.js` to add details
