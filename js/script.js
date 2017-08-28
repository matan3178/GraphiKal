(function($) {
    $(function () {
        var DIR = "pics/";

        var nodes = new vis.DataSet([
            {id: 1, label: 'Java', color: "green", font: {
                color: "#fff",
                size: 32,
                face: "Segoe UI"
            }},
            {id: 2, label: 'Java\nTutorials'},
            {id: 3, label: 'Advanced\nJava Tutorials'},
            {id: 4, label: 'Generics.pdf' ,shape: 'image', image: DIR + 'pdf.png'},
            {id: 5, label: 'Streams.docx' ,shape: 'image', image: DIR + 'word.png'},
            {id: 6, label: 'Inheritance.ppt' ,shape: 'image', image: DIR + 'ppt.png'},
            {id: 7, label: 'Some\nSecret Project'},
            {id: 8, label: 'Project-Image.png' ,shape: 'image', image: DIR + 'image.png'},
            {id: 9, label: 'Team1.xlsx' ,shape: 'image', image: DIR + 'excel.png'}
        ]);

        var edges = new vis.DataSet([
            {from: 1, to: 2},
            {from: 2, to: 3},
            {from: 3, to: 4},
            {from: 3, to: 5},
            {from: 2, to: 6},
            {from: 1, to: 7},
            {from: 7, to: 8},
            {from: 7, to: 9}
        ]);

        var container = document.getElementById('mynetwork');

        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};

        var network = new vis.Network(container, data, options);
    });
})(jQuery);
