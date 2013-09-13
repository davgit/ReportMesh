
function renderReportMesh(params){

    //Setting default params if not supplied
    if (!params){
        params = {}
    }
    if (!params.page_width){
        params.page_width = 210;
    }
    if (!params.page_height){
        params.page_height = 297;
    }
    if (!params.padding){
        params.padding = 5;
    }
    if (!params.padding_top){
        params.padding_top = params.padding;
    }
    if (!params.padding_bottom){
        params.padding_bottom = params.padding;
    }
    if (!params.padding_left){
        params.padding_left = params.padding;
    }
    if (!params.padding_right){
        params.padding_right = params.padding;
    }
    

    var $body = $('body');

    var page_width_css = "width:"+(params.page_width - params.padding_left - params.padding_right)+"mm; ";
    var page_height_css = "height:"+(params.page_height - params.padding_top - params.padding_bottom)+"mm; ";
    var padding_css = "padding: " + params.padding_top + "mm " +
                                params.padding_right + "mm " +
                                params.padding_bottom + "mm " +
                                params.padding_left + "mm ";

    var $page;
    var $page_content;
    var content_height;
    var space_left;

    var page_number = 0;

    var header_html = $('#header').html();
    var footer_html = $('#footer').html();

    var logs = "";


    function create_page(){
        page_number += 1;

        var page_html = "<div><div class='page' style='" + page_width_css +
            page_height_css + padding_css + " '><div class='rm-page-inner'>";

        if (header_html){
            page_html += "<div class='rm-header'>"
                         + _.template(header_html, {page_number:page_number})
                         + "</div>";
        }
        page_html += "<div class='rm-content'></div>";
        if (footer_html){
            page_html += "<div class='rm-footer'>"
                         + _.template(footer_html, {page_number:page_number})
                         + "</div>";
        }
        page_html += "</div></div></div>";
        $page = $(page_html);
        $body.append($page);
        $page_content = $page.find('.rm-content');
        content_height = $page_content.height();
        space_left = content_height;
    }
    
    function add_chunk($chunk){
        $page_content.append($chunk);
        logs += content_height +", " + space_left +", " + $chunk.height() +"<br>";
        if ($chunk.height() <= space_left){
            space_left -= $chunk.height();
        }else if($chunk.height() <= content_height){
            $chunk.remove();
            create_page();
            $page_content.append($chunk);
            space_left = content_height - $chunk.height();
        }else{
            create_page();
            $page_content.append('<h1>Error rendering Chunk. ' +
                'It is to big, therefore were skiped</h1>');
            create_page();
        }
    }

    //Finding and adding chunks

    var $content = $('#reportmesh');
    $content.remove();
    $body.empty();
    create_page();
    $page_content.html('<h1>No content supplied</h1>');
    $content.find('.chunk').each(function(index){
        if (index == 0){
           $page_content.html('');
        }
        add_chunk($(this));
    });

    //create_page();
    //$page_content.html(logs);

}
