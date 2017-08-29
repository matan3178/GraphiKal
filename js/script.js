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
    "jpeg" : "image",
    "txt" : "txt"
};
var DIR = "pics/";

function breakLines(str, lineMaxLen) {
    str = str.trim();
    if (str.length <= lineMaxLen) {
        return str;
    }

    var lineActualLen = str.lastIndexOf(" ", lineMaxLen);
    if (lineActualLen === -1) {
        lineActualLen = lineMaxLen;
    }

    return str.substr(0, lineActualLen) + "\n" + breakLines(str.substr(lineActualLen), lineMaxLen);
}

function parseGET(url)
{
    if(!url || url == '') url = document.location.search;
    if(url.indexOf('?') < 0) return Array();

    url = url.split('?');
    url = url[1];

    var GET = [];
    var params = [];
    var keyval = [];

    if(url.indexOf('#')!==-1)
    {
        anchor = url.substr(url.indexOf('#')+1);
        url = url.substr(0,url.indexOf('#'));
    }

    if(url.indexOf('&') > -1) params = url.split('&');
    else params[0] = url;

    for (var i=0; i<params.length; i++)
    {
        if(params[i].indexOf('=') > -1) keyval = params[i].split('=');
        else { keyval[0] = params[i]; keyval[1] = true; }
        GET[keyval[0]]=keyval[1];
    }

    return (GET);
}

var q = parseGET()['q'];

function parseGraph(root, nodes, edges) {
    root.parent = 0;

    var queue = [root];

    var id = 1;
    while (queue.length > 0) { // BFS YEA
        var v = queue.shift();

        var node = {"id": id, "label": breakLines(v.name, 15)};
        if (v.type === "file") {
            var ext = v.name.split('.').pop();
            Object.assign(node, { "label" : v.name, "shape": 'image', "image": DIR + imgByExt[ext] + '.png', "desc" : v.desc });
        }

        if (id === 1) {
            Object.assign(node, {
                "color": "green",
                "font": {
                    "color": "white",
                    "size": 36
                },
                "label": q ? q : node.label
            });
        }

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

            var container = document.getElementById('graph');

            var nodesDS = new vis.DataSet(nodes);
            var edgesDS = new vis.DataSet(edges);

            var data = {
                nodes: nodesDS,
                edges: edgesDS
            };
            var options = {
                nodes : {
                    font : {
                        face : "Segoe UI"
                    }
                }
            };

            var network = new vis.Network(container, data, options);

            network.on("click", function(p) {
                var $side = $("#side");
                if (p.nodes.length > 0) {
                    var node = nodesDS.get(p.nodes[0]);
                    if (node.shape === 'image') {
                        $side.children("img").prop("src", node.image)
                            .siblings("h3").text(node.label)
                            .siblings("p").text(node.desc);

                        if ($side.is(':hidden')) {
                            $side.animate({width:'toggle'},200);
                        }
                    }
                    else if ($side.is(':visible')) {
                        $side.animate({width:'toggle'},200);
                    }
                }
                else if ($side.is(':visible')) {
                    $side.animate({width:'toggle'},200);
                }
            });
        });

        $("#search").on("focus", function() {
            $("#dark").fadeIn();
        }).on("blur", function() {
            $("#dark").fadeOut();
        });

        $("#x").on('click', function() {
            if ($("#side").is(':visible')) {
                $("#side").animate({width:'toggle'},200);
            }
        });

        if (q) {
            $("#search").val(q);
        }
    });
})(jQuery);
