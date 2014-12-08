var data = [4, 8, 12, 16, 20, 40];
/*Don’t be misled by the var below; remember that in JavaScript, variables can store functions 
*/
/* 
A scale's input domain is the range of possible input data values.  A scale's output range is the range of possible
output values, commonly used as display values in pixel units. 
This article clearnly articulates what linear scales are, According to this article, it says that they are most common and understandable. 
http://alignedleft.com/tutorials/d3/scales  */

var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0,420]);
/* Linear scales are the most common scale, and a good default choice to map a continuous input domain to a continuous output range. The mapping is linear in that the output range value y can be expressed as a linear function of the input domain value x: y = mx + b. The input domain is typically a dimension of the data that you want to visualize, such as the height of students (measured in meters) in a sample population. The output range is typically a dimension of the desired output visualization, such as the height of bars (measured in pixels) in a histogram.
https://github.com/mbostock/d3/wiki/Quantitative-Scales
*/


d3.select(".chart")
  .selectAll("div")
  .data(data)
  .enter().append("div")
 // don't use attr here. I don't why it does not accepted. 
  .style("width", function(d) { return x(d)+ "px"; })
  .text(function(d) { return d; });