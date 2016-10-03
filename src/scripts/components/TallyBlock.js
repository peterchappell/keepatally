import React from 'react'

import FLAGS from '../consts/tallyStrokeFlags'

export default React.createClass({
  getDefaultProps() {
    const emptyArray = Array(5).fill(FLAGS.empty);
    return {
      strokesArray: emptyArray
    }
  },
  render() {
    return (
      <svg viewBox="0 0 300 200" className="tally-block">
        <path className={'tally-stroke tally-stroke-' + FLAGS.REVERSED[this.props.strokesArray[4]]} d="M9.78588614,143.590082 C76.4450366,122.807171 124.965191,105.991081 170.493164,86.9884026 C183.755254,81.453009 195.257698,76.2675162 216.198734,66.5456957 C216.839715,66.2481216 217.286228,66.0407801 218.373047,65.5360555 C219.459555,65.031451 219.459555,65.031451 220.545493,64.5271367 C222.301527,63.7116673 223.606134,63.1061445 224.886049,62.5126515 C255.546953,48.2952686 273.184629,40.6918513 293.459436,33.4823858 C296.58163,32.3721732 298.212663,28.9411302 297.10245,25.8189367 C295.992238,22.6967433 292.561194,21.0657105 289.439001,22.1759231 C268.722228,29.5425461 250.814105,37.2625501 219.837982,51.626099 C218.55565,52.2207134 217.249201,52.8270907 215.491301,53.643427 C214.4049,54.1479561 214.4049,54.1479561 213.31854,54.6524918 C212.232174,55.1570062 211.786124,55.3641325 211.145741,55.6614286 C190.339842,65.3205122 178.947319,70.456451 165.871005,75.9143046 C120.756974,94.7442099 72.5473994,111.452659 6.21411386,132.133973 C3.0505966,133.120291 1.28562761,136.484396 2.2719453,139.647914 C3.25826298,142.811431 6.62236889,144.5764 9.78588614,143.590082 L9.78588614,143.590082 Z"></path>
        <path className={'tally-stroke tally-stroke-' + FLAGS.REVERSED[this.props.strokesArray[0]]} d="M48.8262927,8.12886843 C49.5241469,40.6128505 49.917176,65.2803512 50.1263025,86.4205392 C50.1896641,92.8256371 50.3436883,115.615352 50.4177239,119.868735 C50.6369601,132.463959 50.0978239,125.641493 55.1183926,182.864331 C55.4080154,186.165359 58.3188126,188.606584 61.6198401,188.316962 C64.9208676,188.027339 67.3620935,185.116542 67.0724708,181.815514 C62.0953312,125.087669 62.6276322,131.823639 62.4159065,119.659891 C62.3431839,115.481943 62.1896518,92.7650357 62.1257154,86.3018366 C61.9161203,65.1142766 61.5223541,40.4005142 60.8235245,7.87113157 C60.7523524,4.55818748 58.0089842,1.93021201 54.6960402,2.00138408 C51.3830961,2.07255615 48.7551206,4.81592434 48.8262927,8.12886843 L48.8262927,8.12886843 Z"></path>
        <path className={'tally-stroke tally-stroke-' + FLAGS.REVERSED[this.props.strokesArray[1]]} d="M108.857011,9.14655578 L110.10924,176.343163 C110.134057,179.656779 112.840392,182.322876 116.154007,182.298059 C119.467623,182.273241 122.133721,179.566907 122.108903,176.253291 L120.856674,9.05668361 C120.831857,5.74306804 118.125522,3.07697045 114.811907,3.10178797 C111.498291,3.12660548 108.832193,5.83294021 108.857011,9.14655578 L108.857011,9.14655578 Z"></path>
        <path className={'tally-stroke tally-stroke-' + FLAGS.REVERSED[this.props.strokesArray[2]]} d="M167.702789,9.52066015 C168.407111,19.5808271 170.735022,52.1271864 171.112402,57.7786406 C171.794578,67.9945376 172.070007,73.8337524 172.206094,81.1047254 C172.209782,81.3017625 172.488379,141.396646 173.124367,189.472237 C173.1682,192.785656 175.88979,195.436179 179.203209,195.392346 C182.516627,195.348513 185.16715,192.626923 185.123317,189.313504 C184.48843,141.321119 184.209623,81.1809801 184.203993,80.8801667 C184.063931,73.3968399 183.779781,67.3727451 183.085737,56.979111 C182.70612,51.294158 180.376037,18.7174299 179.673487,8.68257923 C179.442058,5.37696215 176.574715,2.88484083 173.269098,3.11627049 C169.963481,3.34770014 167.471359,6.21504306 167.702789,9.52066015 L167.702789,9.52066015 Z"></path>
        <path className={'tally-stroke tally-stroke-' + FLAGS.REVERSED[this.props.strokesArray[3]]} d="M232.527888,9.35283363 C233.270455,27.0727546 234.864122,63.5376144 234.864707,63.551428 C235.376205,75.6418782 235.574827,81.8860041 235.656932,88.9075331 C235.729166,95.0849576 235.449184,151.066404 235.449184,188.43756 C235.449184,191.751268 238.135475,194.43756 241.449184,194.43756 C244.762892,194.43756 247.449184,191.751268 247.449184,188.43756 C247.449184,151.157137 247.72973,95.062999 247.656111,88.7672227 C247.572297,81.5994929 247.370212,75.2465004 246.853982,63.0442102 C246.852887,63.0183286 245.25936,26.5566873 244.517366,8.85040576 C244.378624,5.53960302 241.582216,2.96813941 238.271413,3.10688104 C234.96061,3.24562266 232.389147,6.04203089 232.527888,9.35283363 L232.527888,9.35283363 Z"></path>
      </svg>
    )
  }
})
