var firebase = require("firebase/app");

var showTally = function(tallyId) {
  var thisTallyRef = firebase.database().ref('tallies/' + tallyId);
  thisTallyRef.on('value', function(thisTallySnapshot) {
    var thisTallyData = thisTallySnapshot.val();
    var isEditable = thisTallyData.owner_id === firebase.auth().currentUser.uid;
    console.log('tally data', thisTallyData);
    console.log('is editable?', isEditable, thisTallyData.owner_id, firebase.auth().currentUser.uid);
    document.querySelector('#tally_title').textContent = thisTallyData.title;
    setupTallyBoard(parseInt(thisTallyData.tally_current, 10), parseInt(thisTallyData.tally_total, 10), tallyId, isEditable);
  });
};

var setupTallyBoard = function(currentVal, totalVal, tallyId, allowEdit) {
  var max = totalVal || currentVal;
  var tallyBlockTemplate = document.querySelector('#tally_block_template');
  var activeBlock;
  // set up the max number of tally boards we'll need
  var talliesContainerEl = document.querySelector('#tallies');
  talliesContainerEl.innerHTML = '';
  var numberOfTallies = Math.ceil(max/5) || 1;
  console.log('max', max, 'numberOfTallies', numberOfTallies, "currentVal", currentVal, "totalVal", totalVal);
  for (var i=0; i < numberOfTallies; i++) {
    var tallyClone = tallyBlockTemplate.cloneNode(true);
    tallyClone.id = '';
    tallyClone.classList.remove('hide');
    talliesContainerEl.appendChild(tallyClone);
  }
  // now set up the strokes
  // TODO: Refactor this. Instead of iterating through all strokes, render the correct number of
  // blocks first and then just get the active one from the last block that's been rendered.
  var allTallyStrokes = document.querySelectorAll('#tallies .tally-stroke');
  for (i=0; i < allTallyStrokes.length; i++) {
    var currentTallyStroke = allTallyStrokes[i];
    var currentTallyParent = currentTallyStroke.parentNode;
    currentTallyStroke.setAttribute('id', 'tally-stroke-' + i);
    if ((i+1) % 5 === 0) {
      // switch the order around to put cross bar on top when full
      currentTallyParent.removeChild(currentTallyStroke);
      currentTallyParent.insertBefore(currentTallyStroke, currentTallyParent.firstChild);
    }
    if (i < currentVal) {
      currentTallyStroke.classList.add('tally-stroke-stroked');
      if ((i+1) % 5 === 0) {
        var nextBlock = allTallyStrokes[i+1];
        if (!nextBlock) {
          tallyClone = tallyBlockTemplate.cloneNode(true);
          tallyClone.id = '';
          tallyClone.classList.remove('hide');
          talliesContainerEl.appendChild(tallyClone);
          allTallyStrokes = document.querySelectorAll('#tallies .tally-stroke');
        }
        activeBlock = allTallyStrokes[i+1].parentNode;
      } else {
        activeBlock = currentTallyParent;
      }
    } else if (i < max) {
      currentTallyStroke.classList.add('tally-stroke-waiting');
    }
  }
  if (currentVal === 0 && totalVal === 0) {
    activeBlock = currentTallyParent;
  }
  // now make the last one/block clickable
  if (allowEdit) {
    activeBlock.classList.add('active');
    activeBlock.addEventListener('click', function(ev) {
      ev.preventDefault();
      var updates = {};
      updates['tallies/' + tallyId + '/tally_current'] = parseInt(currentVal, 10) + 1;
      firebase.database().ref().update(updates);
    });
    document.querySelector('#tally_edit a').setAttribute('href', '/tallies/' + tallyId + '/edit');
    document.querySelector('#tally_edit').classList.remove('hide');
  } else {
    document.querySelector('#tally_edit').classList.add('hide');
  }
};

module.exports = showTally;
