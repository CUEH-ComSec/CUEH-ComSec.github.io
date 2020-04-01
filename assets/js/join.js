$(function() {
    $('#join-form').submit(function() {
        var username = $(this).find('#join-username');
        var email1 = $(this).find('#join-email1');
        var email2 = $(this).find('#join-email2');
        var password = $(this).find('#join-password');
        var confirm_password = $(this).find('#join-confirm-password');
        var gdpr = document.getElementById("gdpr");
        if (!/^[a-zA-Z0-9_-]{5,20}$/.test(username.val())) {
            username.focus();
            return false
        }
        if (!/^[\x00-\xFF]{3,320}$/) {
            email.focus();
            return false
        }
        if (!/^[\x00-\xFF]{6,50}$/.test(password.val())) {
            password.focus();
            return false
        }
        if (password.val() != confirm_password.val()) {
            confirm_password.focus();
            return false
        }
        if (!gdpr.checked) {
            show_alert('warning', "To finish registration you need to accept our Privacy Policy!");
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
                        show_alert('success', '<b>Success!</b> Welcome, ' + res.username + '!');
                        break;
                    case 'a':
                        show_alert('info', '<b>Info!</b> You\'re already logged in. Please wait while you are redirected.');
                        break;
                    case 'u':
                        show_alert('warning', '<b>Warning!</b> This username is already exists.');
                        $('#join-username').focus();
                        break;
                    case 'ev1':
                        show_alert('warning', "<b>Warning!</b> This login ID (1) is not valid. Please use first part of your Coventry University's email &lt;this_part&gt;@uni.coventry.ac.uk");
                        $('#join-email1').focus();
                        break;
                    case 'ev2':
                        show_alert('warning', "<b>Warning!</b> This login ID (2) is not valid. Please use first part of your Coventry University's email &lt;this_part&gt;@uni.coventry.ac.uk");
                        $('#join-email2').focus();
                        break;
                    case 'e1':
                        show_alert('warning', '<b>Warning!</b> This email (1) is already exists.');
                        $('#join-email1').focus();
                        break;
                    case 'e2':
                        show_alert('warning', '<b>Warning!</b> This email (2) is already exists.');
                        $('#join-email2').focus();
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