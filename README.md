# Gloom Cards App
An app to browse and manage your character ability cards for Gloomhaven.

## Features
- Browse cards by class
- Show cards you've unlocked or hide cards don't use
- Drag and drop to rearrange cards
- Everything saves locally


## Upcoming
- Currently only showing classes I've unlocked
- Enhancements on cards

## Adding other class ability Cards
- Pdfs are located in `public/cards/Advanced Classes`
- Converting pdf cards to png (poppler required on mac): `pdftoppm -r 200 -jpeg -e SK\ Cards.pdf sun`
- Then use automator to rename sequentially
- edit `src/data.js` to add details
