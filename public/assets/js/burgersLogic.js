$(function () {
    $('.devour').on('click', function(event){
        //event.preventDefault();

        var id = $(this).data('id');
        
        var burgerState = {
            devoured: "1"
        }
        console.log( 'the burger was devoured ', burgerState, id);

        $.ajax("/api/burgers/" + id, {
            type: 'PUT',
            data: burgerState
        }).then(
            function() {
                console.log('the burger was devoured ', burgerState);
                location.reload();
            }
        )

    });

    $('.create-form').on('submit', function(event){
        event.preventDefault();

        let newBurger = {
            burgers_name: $('#burg').val().trim(),
            devoured: 0
        };

        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(
            function() {
                console.log('created a burger');
                location.reload();
            }
        )

    });

});