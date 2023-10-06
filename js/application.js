//This function is to update the total cost of the item
var calculateNewCost = function(e){
    
    var qty = $(e).val();
    var price = parseFloat($(e).parent().prev()[0].innerHTML.substring(1));

    var newCost = qty * price;
    if (!qty) {
        newCost = 0;
    }

    $(e).parent().next().html(newCost.toFixed(2));
}

//This function is to update the GRAND TOTAL of all the items in the cart
var calculateGrandTotal = function(){
    var grandTotal = 0;
    $('.cost').each(function(){
        grandTotal += parseFloat($(this).text()) || 0;
    })



    $('#grandTotal').html('$'+grandTotal.toFixed(2));
}

//Add item to cart
var addItemToCart = function(){
    var item = $('#item').val();
    var price = $('#price').val();

    if (!item || !price) {
        return;
    }

    $('tbody').append("<tr>"+
                '<th scope="row item">'+item+'</th>'+
                '<td class="unit-price">$'+price+'</td>'+
                '<td class="qty"><input type="number"></input></td>'+
                '<td class="cost"></td>'+
                '<td><button class="btn btn-xs remove"><i>Remove</i></button></td>'+
              '</tr>');

    $('#item').val('');
    $('#price').val('');
}

// remove item from cart
var removeItemFromCart = function(e){
    $(this).parent().parent().remove();
    calculateGrandTotal();
}

// clear cart
var clearCart = function(){
    $('.item').val('');
    $('.price').val('');
    $('.qty').val('');
    $('.cost').html('');
}


//Event Handlers
$(document).ready(function() {
    calculateGrandTotal();
    $('#add').on('click', addItemToCart);

    $('tbody').on('click', '.remove', removeItemFromCart)

    $('tbody').on('change', '.qty input', function () {
        calculateNewCost(this);
        calculateGrandTotal();
    })
});
