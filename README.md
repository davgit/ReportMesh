ReportMesh
==========

Simple HTML/CSS framework aimed to give full controll on content spliting across pages when generating PDF reports.
By using [underscore.js](http://underscorejs.org/) gives a power to generate dynamic headers and footers for pages depending on pag number.

# Basic Setup


ReportMesh requires Jquery and Underscore.js. Here is a starting layout:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Demo</title>  
  <link rel="stylesheet" href="reportmesh.css" type="text/css">   
</head>
<body>
  <div id='reportmesh'>
    <div class='chunk'>
      <p>This is a content that will always stay in one peace 
      and will never be splitted across multiple pages.</p>
    </div>
    <div class='chunk'>
      <p style='height:15mm'>This is a secont content block that will always stay in one peace 
      and will never be splitted across multiple pages.</p>
    </div>
    <div class='chunk'>
      <p style='height:15mm'>This is a third content block that will always stay in one peace 
      and will never be splitted across multiple pages.</p>
    </div>  
  </div>

  <script type='text/html' id='header'>
    <p>This is a header of a page. Page number: <%= page_number %></p>		
  </script>

  <script type='text/html' id='footer'>
    <p>This is a footer of a page. Page number: <%= page_number %></p>		
  </script>

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
  <script type="text/javascript" src="http://documentcloud.github.com/underscore/underscore-min.js"></script>
  <script src="reportmesh.js"></script>
  <script>
    renderReportMesh();
  </script>
</body>
</html>
```

Rules are simple. Body element has to contain one element with `id='reportmesh'`. This element has to contain child elements with `class='mesh'`. Everything else will be stripped out of the DOM tree. 

Optionally your report pages can have header and footer. They have to be marked with id's `header` and `footer`. The most exciting part here is that they are [underscore.js](http://underscorejs.org/) templates and both of them receives variable `page_number`. It means that you can just display that number or you can get absolutely wild by creating custom headers and footers for every page of your report. 
**NOTE:** Do not use img tags in header and footer. Use html blocks and style them with css to use images. ReportMesh needs to know exact height of every element in header and footer before it loads. If you use `<img>` tags in footer or header template ReportMesh will fail and you will get a real Report-Mess instead. :)

You have to include `jquery`, `underscore` and `reportmesh` JavaScript libraries and finally you have to render your starting layout by calling `renderReportMesh();`. And this is what it gets rendered in to:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Demo</title>  
  <link rel="stylesheet" href="reportmesh.css" type="text/css">   
</head>
<body>

  <div class='page' style='width:200mm; height:287mm; padding: 5mm 5mm 5mm 5mm'>
    <div class='chunk'>
      <p>This is a content that will always stay in one peace 
      and will never be splitted across multiple pages.</p>
    </div>
    <div class='chunk'>
      <p style='height:15mm'>This is a secont content block that will always stay in one peace 
      and will never be splitted across multiple pages.</p>
    </div>
  </div>

  <div class='page' style='width:200mm; height:287mm; padding: 5mm 5mm 5mm 5mm'>
	  <div class='chunk'>
      <p style='height:15mm'>This is a third content block that will always stay in one peace 
      and will never be splitted across multiple pages.</p>
	  </div>  
  </div>	

</body>
</html>
```

Since we are using default rendering, which is A4 layout, the third chunk has been transfered in to separate page because it is not enough space for it on a first one. 

Now convert it to a real a real pdf file by using phantomjs (linux platform) like this:

'phantomjs phantom_htmltopdf_a4.js source_url_or_html_file destination_pdf'

#Options

`renderReportMesh({});` function takes one object argument with possible parameters:

- `page_width` - number defining page width in mm, default = 297
- `page_height` - number defining page height in mm, default = 210
- `padding` - number defining page padding in mm, default = 5
- `padding_top` - number defining page top padding in mm, default = `padding`
- `padding_right` - number defining page right padding in mm, default = `padding`
- `padding_bottom` - number defining page bottom padding in mm, default = `padding`
- `padding_left` - number defining page left padding in mm, default = `padding`

Eg. to generate pdf report in US letter layout with 3mm page padding
render your layout like this:

`renderReportMesh({page_width:215.9, page_height:279.4, padding:3});`

Then render it like this:

`phantomjs phantom_htmltopdf_letter.js source_url_or_html_file destination_pdf'

If you take time to investigate files `phantom_htmltopdf_letter.js` and `phantom_htmltopdf_letter.js` will see that they containt pretty basic config once again defining page dimensions. So if you need to generate pdfs in other than A4 or letter format make your self a `phantom_htmltopdf_whatever.js` file and use it for rendering.

#Restrictions and advices

- Try to avoid styling chunk elements, this can cause unpredictable results.
- Content in chunk elements needs to have height. If you float something, do not forget to add element width style `clear:both` at the end of your chunk element. Keep this in mind when position something with absolute positioning.
- Do not use `<img>` elements in header and footer templates. Use css property background-image instead. 







