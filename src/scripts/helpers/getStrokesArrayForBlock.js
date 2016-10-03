import FLAGS from '../consts/tallyStrokeFlags'

const getStrokes = function(blockIndex, count, total) {
  var strokesArray = Array(5).fill(FLAGS.empty);
  var totalCountForBlock = (blockIndex+1)*5
  console.log(blockIndex, count, total, totalCountForBlock)
  if (count && count >= totalCountForBlock) {
    return strokesArray.fill(FLAGS.complete)
  }
  if (total && total >= totalCountForBlock) {
    strokesArray.fill(FLAGS.waiting)
  }
  if (total && blockIndex+1 < Math.ceil(total/5) && blockIndex+1 > Math.ceil(count/5)) {
    return strokesArray
  }
  if (total) {
    strokesArray.fill(FLAGS.waiting,0,5-(totalCountForBlock-total))
  }
  if (count) {
    strokesArray.fill(FLAGS.complete,0,5-(totalCountForBlock-count))
  }
  return strokesArray
}

export default getStrokes
