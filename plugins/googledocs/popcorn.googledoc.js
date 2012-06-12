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
 * @param identifier
 *            is the
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
 * Example: var p = Popcorn('#video') .googledoc({ start: 5, // seconds end: 15, //
 * seconds type: 'document', src:
 * 'http://www.drumbeat.org/sites/default/files/domain-2/drumbeat_logo.png',
 * text: 'DRUMBEAT', target: 'imagediv' } )
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
      },
      createDocument: function (htmlElem, options) {
          // TODO Different types of publication
      },
      createSpreadsheet: function (htmlElem, options) {
          // TODO Different types of publication
      },
      createCalendar: function (htmlElem, options) {
          // TODO Different types of publication
      },
      createForm: function (htmlElem, options) {
          // TODO Different types of publication
      }
      ,
      _setup: function( options ) {
        var htmlElement = document.createElement( "iframe" ),
            target = document.getElementById( options.target );
        
        // TODO
        // Check for the options.preview
        
        // Cheap check format of the google docs url
        // We are accepting http and https.
        if (options.src.indexOf("docs.google.com") < 10) {
            
            htmlElement.src = options.src;
            htmlElement.width = options.width;
            htmlElement.height= options.height;
            
        } else {
            
            throw new Error(
                    "Url for google docs should have the form https://docs.google.com...");
        }
        
        /*
        switch (options.type) {
        case 'document':
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
        */
        if ( !target && Popcorn.plugin.debug ) {
          throw new Error( "target container doesn't exist" );
        }
        
        options._container = htmlElement;
        options._container.style.display = "none";
        
        // add the widget's div to the target div
        target && target.appendChild( options._container );
        
      },

      /**
       * @member image
       * The start function will be executed when the currentTime
       * of the video  reaches the start time provided by the
       * options variable
       */
      start: function( event, options ) {
        options._container.style.display = "inline";
      },
      /**
       * @member image
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
