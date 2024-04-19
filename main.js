let data = [
    { depth: 0    , storm_count: 206 },
    { depth: 200    , storm_count: 1167 },
    { depth: 1000   , storm_count: 535 },
    { depth: 2000, storm_count: 178 },
    { depth: 3000  , storm_count: 34 },
    { depth: 4000  , storm_count: 158 },
    { depth: 5000  , storm_count: 3 },
    { depth: 6000  , storm_count: 5 }
  ];


width = 500
height = 700
margin = ({
    'left': 50,
    'right': 50, 
    'top': 50, 
    'bottom': 50
  })

let svg = d3.select('body')
.append('svg')  
.attr('width', width)
.attr('height', height)

let x = d3.scaleLinear()
.domain([0, d3.max(data, d => d.storm_count)])
.range([margin.left, width - margin.right])

let y = d3.scaleBand()
.domain(data.map(d => d.depth))
.range([margin.top, height - margin.bottom])
.padding(0.25)

let rect = svg.selectAll('rect')
    .data(data)
    .join('rect')
        .attr('x', x(0))
        .attr('y', d => y(d.depth))
        .attr('width',d => x(d.storm_count) - x(0))
        .attr('height', d => y.bandwidth())
        .attr('fill', 'darkblue')

let xAxis = d3.axisBottom(x)
let yAxis = d3.axisLeft(y)

svg.append('g')
.attr('transform', `translate(${margin.left})`)
.call(yAxis)
.append('text')
    .attr('fill', 'black')
    .attr('x', height / 2)
    .attr('y', height - 650)
    .text('Storm Counts for Different Bathymetric Values')
.call(g => g.select('.domain').remove())
svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)
.append('text')
    .attr('fill', 'black')
    .attr('x', width / 2)
    .attr('y', 40)
    .text('Storm Count')




