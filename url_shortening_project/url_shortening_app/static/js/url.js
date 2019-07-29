$(document).ready(function(){

    $(document).on('click', '#url-add-btn', function(){
        let url = $('#url-input').val();
        add_url(url);
        
    }); // create shorterened button


    $(document).on('click', '.edit', function(){
        if($(this).attr('data-id') == '1'){
            let original_url = $(this).parents('.parent-block').find('.shorter_url').attr('data-original-url');
            let url_id = $(this).parents('.parent-block').find('.shorter_url').attr('data-url-id');
            $(this).attr('data-id', '2');
            $(this).parents('.parent-block').find('.shorter_url').html('<input type="text" class="form-control edit-url-input" value="'+original_url+'" placeholder="name@example.com">')
            $(this).html('<button class="btn btn-primary btn-sm url-save-btn">Save</button>');
        }
        else{
            let original_url = $(this).parents('.parent-block').find('.shorter_url').attr('data-original-url');
            let shortened_url = $(this).parents('.parent-block').find('.shorter_url').attr('data-shortened-url');
            $(this).attr('data-id', '1');
            $(this).parents('.parent-block').find('.shorter_url').html('<a href="'+ original_url +'" target="_blank">'+ shortened_url +'</a>')
            $(this).html('<i class="fas fa-edit"></i> Edit');
        }
    }); // url edit button


    $(document).on('click', '.url-save-btn', function(){
        let url_id = $(this).parents('.parent-block').find('.shorter_url').attr('data-url-id');
        let new_url = $(this).parents('.parent-block').find('.shorter_url').find('.edit-url-input').val();
        console.log(url_id, new_url)
        edit_url(url_id, new_url)
    }); // update url save button


    $(document).on('click', '.view', function(){
        if($(this).attr('data-id') == '1'){
            let url_id = $(this).parents('.parent-block').find('.shorter_url').attr('data-url-id');
            $(this).attr('data-id', '2');
            $(this).html('<i class="fas fa-eye"></i> View shortened url');
            view_url(url_id, $(this))
        }
        else{
            let shortened_url = $(this).parents('.parent-block').find('.shorter_url').attr('data-shortened-url');
            $(this).parents('.parent-block').find('.url-link-block').html(shortened_url);
            $(this).attr('data-id', '1');
            $(this).html('<i class="fas fa-eye"></i> View Original url');
        }
    }); // view url button


    $(document).on('click', '.delete', function(){
        let url_id = $(this).parents('.parent-block').find('.shorter_url').attr('data-url-id');
        delete_url(url_id)
    }); // delete url button


    function add_url(url){
        $('#url-list-block').hide();
         $.ajax({
            url: "/get-create-url",
            type: "POST",
            dataType: "html",
            data: {url: url},
            success: function(data) {
                $('#url-list-block').html(data);
                $('#url-list-block').show();
                $('#url-input').val('');
            },
            error: function(data, textStatus, jqXHR) {
                $('#url-list-block').show();
            }
        });
    } // add url


    function view_url(url_id, element){
        // $('#internalDeliveryScheduleUnableToSearchTypesHelpText').hide();
        // $('#delivery_schedule_table_filter_status_loader').show();
        // $('#url-list-block').hide();
     
         $.ajax({
            url: "/get-create-url",
            type: "GET",
            dataType: "json",
            data: {url_id: url_id},
            success: function(data) {
                console.log("----",data)
                element.parents('.parent-block').find('.url-link-block').html(data.original_url);
                // $('#url-list-block').show();
                // console.log(data)
                // $('#delivery_schedule_table_filter_status_loader').hide();
            },
            error: function(data, textStatus, jqXHR) {
                // $('#url-list-block').show();
                // $('#delivery_schedule_table_filter_status_loader').hide();
                // $('#internalDeliveryScheduleProjectSearchTypesHelpText').hide();
                // $('#internalDeliveryScheduleUnableToSearchTypesHelpText').show();
            }
        });
    }  // get url


    function edit_url(url_id, new_url){
         $.ajax({
            url: "/update-url",
            type: "POST",
            dataType: "html",
            data: {url_id: url_id, new_url: new_url},
            success: function(data) {
                $('#url-list-block').html(data);
                $('#url-list-block').show();
            },
            error: function(data, textStatus, jqXHR) {
            }
        });
    } // update url


    function delete_url(url_id){
        $.ajax({
           url: "/delete-url",
           type: "POST",
           dataType: "html",
           data: {url_id: url_id},
           success: function(data) {
               $('#url-list-block').html(data);
               $('#url-list-block').show();
           },
           error: function(data, textStatus, jqXHR) {
           }
       });
    } // delete url
   
});