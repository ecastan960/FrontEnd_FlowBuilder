let graph = new joint.dia.Graph;

  let paper = new joint.dia.Paper({
    el: document.getElementById('paper'),
        width: 2000,
        height: 600,
        gridSize: 1,
        model: graph,
        restrictTranslate: {
            x: 50,
            y: 50,
            width: 1900,
            height: 500
        }
  });

  

  // this._cell.getCelula().subscribe(data => {
  //   this.cell = [];
  //   data.forEach((element:any) => {
  //     this.cell.push({
  //       id: element.payload.doc.id,
  //       ...element.payload.doc.data(),
  //     })
  //   } );
  //   // console.log(this.cell);
  //   // console.log(this.cell[0]['cells']);
  //   // console.log(this.cell[0]['cells'][0]);
  //   graph.addCells([this.cell[0]['cells'][0],this.cell[0]['cells'][1],this.cell[0]['cells'][2]])
  // });
    
    // console.log(this.cell[0]['cells']);
  //   graph.addCells([this.cell[0],this.cell[1],this.cell[2]])

  // });

  var standard = joint.shapes.standard;
  let rect = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 100, height: 30 },
    attrs: { rect: { fill: 'blue' }, text: { text: 'Estado_1', fill: 'white' } }
  });

  let rect2 = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 100, height: 30 },
    attrs: { rect: { fill: 'orange' }, text: { text: 'Estado_2', fill: 'white' } }
});
  rect2.
  rect2.translate(300);

  var borderedImage = new standard.BorderedImage();
  borderedImage.resize(150, 100);
  borderedImage.position(225, 410);
  borderedImage.attr('root/tabindex', 9);
  borderedImage.attr('root/title', 'joint.shapes.standard.BoarderedImage');
  borderedImage.attr('label/text', 'Bordered\nImage');
  borderedImage.attr('border/rx', 5);
  borderedImage.attr('image/placeholderURL', 'https://i1.wp.com/collectible506.com/wp-content/uploads/2017/08/BareHandedBladeCatch.png?resize=474%2C337');
  borderedImage.addTo(graph);

  var embeddedImage = new standard.EmbeddedImage();
  embeddedImage.resize(150, 100);
  embeddedImage.position(425, 340);
  embeddedImage.attr('root/tabindex', 10);
  embeddedImage.attr('root/title', 'joint.shapes.standard.EmbeddedImage');
  embeddedImage.attr('label/text', 'Embedded\nImage');
  embeddedImage.attr('body/fill', '#fe854f');
  embeddedImage.attr('body/fillOpacity', 0.5);
  embeddedImage.attr('body/stroke', '#fe854f');
  embeddedImage.attr('image/xlinkHref', 'https://i1.wp.com/collectible506.com/wp-content/uploads/2017/08/BareHandedBladeCatch.png?resize=474%2C337');
  embeddedImage.addTo(graph);

  var Header = joint.dia.Element.define('custom.Header', {

    markup: [{
        tagName: 'rect',
        selector: 'body'
    }, {
        tagName: 'rect',
        selector: 'header'
    }, {
        tagName: 'text',
        selector: 'caption'
    }, {
        tagName: 'text',
        selector: 'description'
    }, {
        tagName: 'image',
        selector: 'icon'
    }],
    attrs: {
        body: {
            fitRef: true,
            fill: 'white',
            stroke: 'gray',
            strokeWidth: 3
        },
        header: {
            fill: 'gray',
            stroke: 'none',
            height: 20,
            refWidth: '100%'
        },
        caption: {
            refX: '50%',
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: 'sans-serif',
            y: 15,
            textWrap: {
                text: 'Header',
                height: 0
            },
            fill: '#fff'
        },
        description: {
            refX: '50%',
            refX2: 15,
            refY: 25,
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: 'sans-serif',
            textWrap: {
                text: 'Here is a description spread on multiple lines. Obviously wrapped automagically.',
                width: -40,
                height: -25
            },
            fill: '#aaa'
        },
        icon: {
            x: 3,
            y: 22,
            width: 30,
            height: 40,
            xlinkHref: 'http://placehold.it/30x40'
        }
    }
});

var header = (new Header())
    .size(200,140)
    .position(420,40)
    .addTo(graph)
    .addPort({
      group: 'main',
      attrs: { body: { shape: 'hexagon' }}
    });

  var link = new joint.dia.Link({
    source: { id: rect.id },
    target: { id: rect2.id }
  });

  console.log(rect);
  console.log(rect2);
  console.log(link);
  console.log(typeof rect);
  this._cell.agregarCelula(rect.toJSON());
  
  var m1 = new joint.shapes.devs.Model({
    position: { x: 50, y: 50 },
    size: { width: 90, height: 90 },
    inPorts: ['in1','in2'],
    outPorts: ['out'],
    ports: {
        groups: {
            'in': {
                attrs: {
                    '.port-body': {
                        fill: '#16A085'
                    }
                }
            },
            'out': {
                attrs: {
                    '.port-body': {
                        fill: '#E74C3C'
                    }
                }
            }
        }
    },
    attrs: {
        '.label': { text: 'Model1', 'ref-x': .5, 'ref-y': .2 },
        rect: { fill: '#2ECC71' }
    }
});
graph.addCell(m1);

var m2 = new joint.shapes.devs.Model({
    position: { x: 50, y: 50 },
    size: { width: 90, height: 90 },
    inPorts: ['in1','in2'],
    outPorts: ['out'],
    ports: {
        groups: {
            'in': {
                attrs: {
                    '.port-body': {
                        fill: '#16A085'
                    }
                }
            },
            'out': {
                attrs: {
                    '.port-body': {
                        fill: '#E74C3C'
                    }
                }
            }
        }
    },
    attrs: {
        '.label': { text: 'Model2', 'ref-x': .5, 'ref-y': .2 },
        rect: { fill: '#2ECC71' }
    }
});
graph.addCell(m2);



  graph.addCells([rect, rect2,borderedImage,embeddedImage, link]);
  var jsonObject = graph.toJSON();
  console.log(jsonObject);
  // const output = JSON.stringify(jsonObject);

  // console.log(output);
  // this._cell.agregarCelula(jsonObject);
  