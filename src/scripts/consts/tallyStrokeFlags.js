const FLAGS = {
  empty: 0,
  complete: 1,
  waiting: -1
}

const flagsReversed = {}
for(var key in FLAGS){
  flagsReversed[FLAGS[key]] = key
}

FLAGS['REVERSED'] = flagsReversed

export default FLAGS
