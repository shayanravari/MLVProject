document.addEventListener('DOMContentLoaded', function () {
    const paramSlider = document.getElementById('param');
    const paramValue = document.getElementById('param-value');
    const plotDiv = document.getElementById('plot');

    function updatePlot(param) {
        // Example code to update the plot (using D3.js or Plotly)
        // For now, just show the value
        plotDiv.innerHTML = 'Model parameter (C): ' + param;
    }

    paramSlider.addEventListener('input', function () {
        const param = paramSlider.value;
        paramValue.textContent = param;
        updatePlot(param);
    });

    // Initial plot
    updatePlot(paramSlider.value);
});

function updatePlot(param) {
    // Clear previous plot
    plotDiv.innerHTML = '';

    // Generate synthetic dataset
    const data = [];
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 10;
        const y = param * x + (Math.random() * 10 - 5);
        data.push({ x: x, y: y });
    }

    // Set dimensions and margins for the plot
    const margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = 600 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Append SVG object to the plot div
    const svg = d3.select('#plot').append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set x and y scales
    const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 10 * param]).range([height, 0]);

    // Add axes
    svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));

    // Add data points
    svg.selectAll('circle').data(data).enter().append('circle')
       .attr('cx', d => x(d.x))
       .attr('cy', d => y(d.y))
       .attr('r', 3)
       .style('fill', '#69b3a2');
}