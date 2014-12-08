//Show UCLA CS class dependencies (not complete)
$(document).ready(function() {
    var width = $(document).width();
    var height = $(document).height();
    var g = new Graph();
    g.edgeFactory.template.style.directed = true;


    var string = (<%- JSON.stringify(data) %>);
    var data = string.substring(9, string.length);
    data = JSON.parse(data);
    for (var x = 0; x < data.length; x++) {
        g.addEdge("Anaconda",data[x][0]);
        for (var y = 0; y < data[x][1].length; y++) {
            if (data[x][1][y] != null) g.addEdge(data[x][0],data[x][1][y]);
        }
    }
    g.addEdge("Anaconda","1");
    g.addEdge("Anaconda","2");
    g.addEdge("Anaconda","3");
    g.addEdge("1","A");
    g.addEdge("1","B");
    g.addEdge("1","C");
    g.addEdge("2","D");
    g.addEdge("2","E");
    g.addEdge("3","F");
    var layouter = new Graph.Layout.Ordered(g, topological_sort(g));
    var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
});