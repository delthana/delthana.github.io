/*, ________________________
//|.----------------------.|
//||                      ||
//||       ______         ||
//||     .;;;;;;;;.       ||
//||    /;;;;;;;;;;;\     ||
//||   /;/`    `-;;;;; . .||
//||   |;|__  __  \;;;|   ||
//||.-.|;| e`/e`  |;;;|   ||
//||   |;|  |     |;;;|'--||
//||   |;|  '-    |;;;|   ||
//||   |;;\ --'  /|;;;|   ||
//||   |;;;;;---'\|;;;|   ||
//||   |;;;;|     |;;;|   ||
//||   |;;.-'     |;;;|   ||
//||'--|/`        |;;;|--.||
//||;;;;    .     ;;;;.\;;||
//||;;;;;-.;_    /.-;;;;;;||
//||;;;;;;;;;;;;;;;;;;;;;;||
//||;;;;;;;;;;;;;;;;;;;;;;||
//'------------------------' */

window.addEventListener('load', function() {
  initAllPages()

  var waveElem = document.querySelector('.dynasty-hero-wave')
  var videoElem = document.querySelector('.team-hero-video')
  if (waveElem != null) {
    initHomePage(waveElem)
  } else if (videoElem != null) {
    initTeamPage()
  } else {
    initPricingPage()
  }
})

function initAllPages() {
  document.querySelector('#menu-close').onclick = togglePage.bind(
    null,
    'content'
  )
  document.querySelector('#menu-link').onclick = togglePage.bind(null, 'menu')
}

function initHomePage(waveElem) {
  initWave(waveElem, 160, 100) // wave + bg physics
  // TODO: this causes performance problems, maybe re-enable later
  // jiggle()
}

function initTeamPage() {
  // random shuffle employee list
  // https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
  var employees = document.querySelector('.employee-roster')
  for (var i = employees.children.length; i >= 0; i--) {
    employees.appendChild(employees.children[Math.random() * i | 0])
  }
}

// draws splines for /pricing inside `svg#cone`
function initPricingPage() {
  var RPM = 2 // Rotations per minute
  var CURVE_CONTROL = 0.2 // Curve control point 20% of the way right
  var CURVE_END = 0.5 // Curve endpoing 50% of the way right
  var SPREAD_PX = 2 // Pixels between top and bottom line, right half of page

  var svg = document.querySelector('#cone')
  var lines = document.querySelectorAll('path.cone')

  tick()

  function tick() {
    var width = svg.width.baseVal.value
    var height = svg.height.baseVal.value

    var rotation = (new Date().getTime() / 1000 / 60 * RPM) % 1.0
    for (var i = 0; i < lines.length; i++) {
      var radians = (rotation + i / lines.length) * 2 * Math.PI
      var t = Math.cos(radians)
      var tdepth = Math.sin(radians)
      var y1 = height * (0.5 + 0.5 * t)
      var y2 = height * 0.5 + SPREAD_PX * 0.5 * t

      // Start point, curve control point, curve endpoint, endpoint
      var sp = [0, y1].join(' ')
      var ccp = [width * CURVE_CONTROL, y2].join(' ')
      var cep = [width * CURVE_END, y2].join(' ')
      var ep = [width, y2].join(' ')
      var d = ['M', sp, 'C', ccp, ccp, cep, 'L', ep].join(' ')

      lines[i].setAttribute('d', d)
      lines[i].setAttribute('stroke-width', 2 - tdepth * 0.5)
      lines[i].setAttribute('opacity', 0.8 - tdepth * 0.2)
    }
    window.requestAnimationFrame(tick)
  }
}

// TODO: add spring motion on y-scroll
// like — http://chrisarasin.com/physics-scrolling/
function jiggle() {
  var ovals = document.querySelectorAll('ellipse.oval')

  for (var i = 0; i < ovals.length; i++) {
    var oval = ovals[i]
    const cx = 600 + i * 10 + Math.sin(new Date().getTime() / 500 + i) * 5
    const cy = 500
    oval.setAttribute('cx', cx)
    oval.setAttribute('cy', cy)
  }

  window.requestAnimationFrame(jiggle)
}

// show or hide menu
function togglePage(page) {
  document.querySelector('#page-nav').style.display =
    page === 'menu' ? 'block' : 'none'
  document.querySelector('#page-content').style.display =
    page === 'content' ? 'block' : 'none'
}
