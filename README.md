ReportMesh
==========

Simple framework aimed to give better control on reports development by using simple HTML/CSS markup language.

# Basic Layout
==========

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
    	This is a content that will always stay in one peace 
      and will never be splitted across multiple pages.
		</div>

		<div class='chunk'>
    	This is a secont content block that will always stay in one peace 
      and will never be splitted across multiple pages.
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
