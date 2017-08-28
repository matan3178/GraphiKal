imgByExt = {
    "xlsx" : "excel",
    "xls" : "excel",
    "docx" : "word",
    "doc" : "word",
    "ppt" : "ppt",
    "pptx" : "ppt",
    "pdf" : "pdf",
    "png" : "image",
    "jpg" : "image",
    "jpeg" : "image"
};
var DIR = "pics/";

function parseGraph(root, nodes, edges) {
    root.parent = 0;

    var queue = [root];

    var id = 1;
    while (queue.length > 0) {
        var v = queue.shift();

        var node = {"id": id, "label": v.name};
        if (v.type === "file") {
            var ext = v.name.split('.').pop();
            Object.assign(node, { "shape": 'image', "image": DIR + imgByExt[ext] + '.png' });
        }

        if (id === 1)
            Object.assign(node, {
                "color" : "green",
                "font" : {
                    "color" : "white",
                    "size" : 36
                }
            });
        nodes.push(node);

        if (v.parent) edges.push({"from": v.parent, "to": id});

        for (var n in v["neighbors"]) {
            v["neighbors"][n].parent = id;

            queue.unshift(v["neighbors"][n]);
        }

        ++id;
    }
}

(function($) {
    $(function () {
        $.get("format/web_format.json").done(function(graph) {
            var nodes = [];
            var edges = [];
            parseGraph(graph, nodes, edges);

            var container = document.getElementById('mynetwork');

            var data = {
                nodes: new vis.DataSet(nodes),
                edges: new vis.DataSet(edges)
            };
            var options = {
                nodes : {
                    font : {
                        face : "Segoe UI"
                    }
                }
            };

            var network = new vis.Network(container, data, options);
        });
    });
})(jQuery);
