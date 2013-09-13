ReportMesh
==========

Simple framework aimed to give better control on reports development by using simple HTML/CSS markup language.

# Basic Layout


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


