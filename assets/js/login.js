$(function() {
    $('#login-form').submit(function() {
        var username = $(this).find('#login-username');
        var password = $(this).find('#login-password');
        if (!username.val()) {
            username.focus();
            return false
        }
        if (!password.val()) {
            password.focus();
            return false
        }
        $.ajax({
            method: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(res) {
                switch (res.status) {
                    case 'o':
                        show_alert('success', '<b>Success!</b> Hello, ' + res.username + '! Please wait while you are redirected.');
                        if (location.pathname == '/login') {
                            location.replace('/');
                        } else {
                            location.reload(0);
                        }
                        break;
                    case 'a':
                        show_alert('info', '<b>Info!</b> You\'re already logged in. Please wait while you are redirected.');
                        if (location.pathname == '/login') {
                            location.replace('/');
                        } else {
                            location.reload(0);
                        }
                        break;
                    case 'd':
                        show_alert('info', '<b>Info!</b> HOPR has ended!');
                        break;
                    case 'x':
                        show_alert('danger', '<b>Failure!</b> This username or password is wrong.');
                        $('#login-password').focus();
                        break;
                    default:
                        show_alert('danger', '<b>Error!</b> Please try again.')
                }
            },
            error: function() {
                show_alert('danger', '<b>Error!</b> Please try again.')
            }
        });
        return false
    });
});
