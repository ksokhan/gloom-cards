# Gloom Cards App
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
- Pdfs are located in `public/cards/Advanced Classes`
- Install poppler. On mac, with homebrew you can `brew install poppler`
- Converting pdf cards to png (poppler required): `pdftoppm -r 200 -jpeg -e SK\ Cards.pdf sun`
- Then use automator to rename sequentially
- edit `src/data.js` to add details
