var base_location = "http://mis412.davidrichard.com/product_services/carla";

$(function() {

    // Contact Form
    $("#myForm").submit(function(event){
        event.preventDefault();

        var form_data = {}

        form_data.name = $('#name').val();
        form_data.email = $('#email').val();
        form_data.subject = $('#phone').val();
        form_data.message = $('#message').val();

        
        $.ajax({
            url: 'http://mis412.davidrichard.com/contact_form',
            type: 'POST',
            dataType: 'json',
            data: form_data,
        })
        .done(function(response) {
            console.log(response.payload);
            console.log(response);
            $('.contact_message').html(response.message);
            console.log("success");
            $(".thankyou").show();
            $(".replace").hide();
        })

        .fail(function(response) {
            console.log("error");
        })
        
        .always(function(response) {
            console.log("complete");
        });

    });

    //Dinamic Products
    $.ajax({
            url: base_location,
        })
        .done(function(response) {

            var tabs = "";
            var panel = "";

            for (var i = 0; i < response.categories.length; i++) {
                tabs += build_tab(response.categories[i], i);
                panel = build_panel(response.categories[i], i);

                var products = "";
                for (var j = 0; j < response.categories[i].products.length; j++) {
                    products += build_product(response.categories[i].products[j]);
                };

                $('#product_panels').append(panel);
                $('#category_'+i).append(products);

            };

            $('#product_tabs').append(tabs);

            $('#product_tabs li:first').addClass('active');
            $('#product_panels .tab-pane:first').addClass('active');

        })
        .fail(function() {
            console.log("error");
        });
});
function build_tab(category, index) {

        return '<li role="presentation"><a href="#category_'+index+'" role="tab" data-toggle="tab">'+category.name+'</a></li>'

    }

    function build_panel(category, index) {

        return '<div role="tabpanel" class="tab-pane" id="category_'+index+'"><h1> '+ category.name+' </h1> <div class="intro-text text-center">'+category.description+'</div><br> <div class="col-lg-12 text-center"><img src="'+base_location+'/'+category.image+'"></div></div>'

    }

    function build_product (product) {

        return '<div class="product col-md-3"><h2>'+product.name+'</h2> <img src="'+base_location+'/'+product.image+'"><hr><div class=" col-md-3 desc text-center">'+product.description+'</div><br><a class="price" href="contact.html"><strong>'+product.price+'</strong></a></div>'

    }

    function onScroll(event){
        var scrollPosition = $(document).scrollTop();
        $('.nav li a').each(function () {
            var currentLink = $(this);
            var refElement = $(currentLink.attr("href"));
            if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
                $('ul.nav li a').removeClass("navactive");
                currentLink.addClass("navactive");
            }
            else{
                currentLink.removeClass("navactive");
            }
        });
    
       
        $(function(){
            $('#portfolio').mixitup({
                targetSelector: '.item',
                transitionSpeed: 350
            });
        });

        // $(function() {
        //     $( "#datepicker" ).datepicker();
        // });
    
    };