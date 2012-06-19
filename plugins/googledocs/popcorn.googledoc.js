// PLUGIN: GOOGLE DOCS

(function ( Popcorn ) {

/**
 * Google docs popcorn plug-in Shows a public google document. Options parameter
 * will need
 * 
 * @param title
 *            title of the google document. Example: 'Document about the
 *            population growth in the last 50 years.'
 * @param type
 *            type of the google document. Options: 'document', 'spreadsheet',
 *            'presentation', 'form' , 'drawing'
 * @param start
 *            is the time that you want this plug-in to execute. If start is not
 *            specified, it will be for the all duration of the video
 * @param end
 *            is the time that you want this plug-in to stop executing
 * @param target
 *            is the id of the document element that the iframe needs to be
 *            attached to. The target element must exist on the DOM
 * @param src
 *            is the url of the document that we want to display. This field is
 *            optional only if the field identifier is set.
 * @param id
 *            is the identifier of the document that we want to display. This field is
 *            optional only if the field src is set.
 * @param preview
 *            indicates if we should show the previsualization or not. This
 *            parameter is optional and is set to true by default.
 * @param width
 *            width of the google docs object when embedded
 * @param height
 *            height of the google docs object when embedded
 * 
 * @param {Object}
 *            options
 * 
 * Example: var p = Popcorn('#video') .googledoc({ } )
 * 
 */
  Popcorn.plugin( "googledoc", {
      manifest: {
        about: {
          name: "Google Docs Plugin",
          version: "0.1",
          author: "Jose David Baena",
          website: "http://josedab.com.com/"
        },
        options: {
          start: {
            elem: "input",
            type: "number",
            label: "In"
          },
          end: {
            elem: "input",
            type: "number",
            label: "Out"
          },
          href: {
            elem: "input",
            type: "url",
            label: "anchor URL",
            "default": "http://mozillapopcorn.org/wp-content/themes/popcorn/images/for_developers.png",
            optional: true
          },
          target: "image-container",
          src: {
            elem: "input",
            type: "url",
            label: "Source URL",
            "default": "http://mozillapopcorn.org/wp-content/themes/popcorn/images/for_developers.png"
          },
          text: {
            elem: "input",
            type: "text",
            label: "Text",
            optional: true
          }
        }
      }
      ,
      _setup: function( options ) {
        
        
        function createDocument (htmlElem, options) {
        // TODO Different types of publication
        /*
        https://docs.google.com/document/pub?id=1t8M4vzoy9pdjoiJ0Dq8CVgBRQ2lGBIWz6UJL_k9bVpM
        <iframe src="https://docs.google.com/document/pub?id=1t8M4vzoy9pdjoiJ0Dq8CVgBRQ2lGBIWz6UJL_k9bVpM&amp;embedded=true"></iframe>
        */
        options.url = 'https://docs.google.com/document/pub?id=' + options.id;
        htmlElem.src = options.url;

        };

        function createSpreadsheet (htmlElem, options) {
            // https://docs.google.com/spreadsheet/pub?key=0AjOfr6eosPR_dEx5YXNJczBhYXRzSUJIU0NuS1NzUWc&output=html
            // <iframe width='500' height='300' frameborder='0' src='https://docs.google.com/spreadsheet/pub?key=0AjOfr6eosPR_dEx5YXNJczBhYXRzSUJIU0NuS1NzUWc&output=html&widget=true'></iframe>
            
            options.url = 'https://docs.google.com/spreadsheet/pub?key=' + options.id;

            htmlElem.src = options.url + '&output=html&widget=true';
            
        };

        function createCalendar (htmlElem, options) {
            // TODO Different types of publication
            
            
        };

        function createForm (htmlElem, options) {
            // <iframe src="https://docs.google.com/spreadsheet/viewform?formkey=dEx5YXNJczBhYXRzSUJIU0NuS1NzUWc6MQ" frameborder="0" width="480" height="389" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

            options.url = 'https://docs.google.com/spreadsheet/viewform?formkey=' + options.id;

            htmlElem.src = options.url;
            htmlElem.allowfullscreen = true;
            htmlElem.mozallowfullscreen = true;
            htmlElem.webkitallowfullscreen = true;
            
        };

        function createDrawing (htmlElem, options) {
            // <img src="https://docs.google.com/drawings/pub?id=1zxmvwG1WNbymsq1Ndnk8Jr-SCoI3zczAVTNfMzTDOvE&amp;w=1058&amp;h=1069">

            htmlElem = document.createElement( "img" );
            htmlElem.src = 'https://docs.google.com/drawings/pub?id=' + options.id + '&amp;w=' + options.width + '&amp;h=' + options.height;
        };

        // Example: 
        // https://docs.google.com/spreadsheet/pub?key=0AjOfr6eosPR_dEx5YXNJczBhYXRzSUJIU0NuS1NzUWc&output=pdf
        // https://docs.google.com/spreadsheet/pub?key=0AjOfr6eosPR_dEx5YXNJczBhYXRzSUJIU0NuS1NzUWc&output=html
        function getOutputUrlForFormat (url,format) {
            var result = url;
            if (result.indexOf("output") < 0) {
                result = result + "&output=" + format;
            } 
            else {
                result = result.replace(/output=[^&]+/,'ouput=' + format);
            }
            return result;
        }

        var htmlElement = document.createElement( "iframe" ),
            target = document.getElementById( options.target );
        
        // Check for the options.preview
        htmlElement.width = options.width;
        htmlElement.height= options.height;
        htmlElement.frameborder = 0;
        
        switch (options.type) {
        case 'document':
            // Redefine the url adding the embedded parameter
            createDocument(htmlElement, options);
            break;
        case 'spreadsheet':
            createSpreadsheet(htmlElement, options);
            break;
        case 'calendar':
            createCalendar(htmlElement, options);
            break;
        case 'drawing':
            createDrawing(htmlElement, options);
            break;
        case 'form':
            createForm(htmlElement, options);
            break;
        
        default:
            break;
        }
        
        if ( !target && Popcorn.plugin.debug ) {
          throw new Error( "target container doesn't exist" );
        }
        
        options._container = htmlElement;
        options._container.style.display = "none";
        
        // add the widget's div to the target div
        target && target.appendChild( options._container );
        
      },

      /**
       * @member gdoc
       * The start function will be executed when the currentTime
       * of the video  reaches the start time provided by the
       * options variable
       */
      start: function( event, options ) {
        options._container.style.display = "inline";
      },
      /**
       * @member gdoc
       * The end function will be executed when the currentTime
       * of the video  reaches the end time provided by the
       * options variable
       */
      end: function( event, options ) {
        options._container.style.display = "none";
      },
      _teardown: function( options ) {
        document.getElementById( options.target ) && document.getElementById( options.target ).removeChild( options._container );
      }
  });
})( Popcorn );
