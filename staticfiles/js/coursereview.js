/**
 * Created with PyCharm.
 * User: Abhishek
 * Date: 9/10/13
 * Time: 6:29 PM
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    $('#tabs').carouFredSel({
        circular: false,
        items: 1,
        width: '100%',
        height: 'auto',
        auto: false,
        pagination: {
            container: '#pager',
            anchorBuilder: function (nr) {
                return '<a href="#">' + $(this).find('h3').text() + '</a>';
            }
        }
    });
});

$('[class="badge"]').hover(function () {
    alert("Testing");
    $(this).css("background-color", "yellow");
}, function () {
    $(this).css("background-color", "pink");
});

function dalert(text) {
    //var alertbox = $('#alertbox');
    if (text == 'close') {
        document.getElementById("alertbox").style.display = 'none';
    } else {
        document.getElementById("alertbox").innerHTML = text + "<button type='button' onclick='dalert(\"close\")' class='close'>×</button>";
        document.getElementById("alertbox").style.display = 'block';
    }
}

