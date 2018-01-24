
function IsDownlineUser(obj) {
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/Get_IsIsdownlineuser",
        type: "POST",
        data: '{"downlineid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                $(obj).parent().find("span").remove();
                $(obj).after('<span class="text-help text-danger">You transfer fund only to downline.</span>');
                $(obj).val('');
                return false;
            }
            else {
                $(obj).parent().find("span").remove();
                //$(obj).after("<span class='data'>" + msg.d + "</span>");
                $(obj).after('<span class="text-help text-success">' + msg.d + '</span>');
                return true;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //            alert(msg);
        }

    });

}
function Get_AutoLegStatus(obj) {
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/Get_AutoLegStatus",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                //$("#pizza_kind").prop('disabled', 'disabled');
                //$("#pizza_kind").removeAttr("disabled");
                $('[id$=ddlPosition]').removeAttr("disabled");
            }
            else {
                var array = msg.d.split("|");
                if (array[1] == "ON") {
                    $("[id$=ddlPosition]").val(array[2])
                    $("[id$=ddlPosition]").prop('disabled', 'disabled');
                } else {
                    $("[id$=ddlPosition]").val('A')
                    $('[id$=ddlPosition]').removeAttr("disabled");
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //            alert(msg);
        }

    });

}
function Get_UserName(obj) {
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/Get_UserName",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='tag tag-default tag-danger'>Username not exists.</span>");
                $(obj).text('');
                return false;
            }
            else {
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='tag tag-default tag-success'>" + msg.d + "</span>");
                return true;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //            alert(msg);
        }

    });

}
function Get_UserName1(obj) {
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/Get_UserName",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                $('[id$=txtsponsorname]').val('Referral not exists.')
                $(obj).val('');
                return false;
            }
            else {
                $('[id$=txtsponsorname]').val(msg.d);
                return true;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //            alert(msg);
        }

    });

}
function CheckPin(obj) {

    $.ajax({
        url: "ajax/jqueryAjax.aspx/CheckPin",
        type: "POST",
        data: '{"Epin":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='data'><img src='../User/assets/img/image005.png'/></span>");
                $(obj).text('');
                return false;
            }
            else {
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='data'> <img src='../User/assets/img/image001.png'/> </span>");
                return true;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //            alert(msg);
        }

    });

}
function GetWalletBal(obj) {
    //var bal = $('[id$=txtcbal]');
    $.ajax({
        url: "ajax/jqueryAjax.aspx/AvailableBalance",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                //bal.val('0');
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='data'>Username not exist.</span>");
                $(obj).text('');
                return false;
            }
            else {
                // bal.val(msg.d);
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='data'>Available balance : " + msg.d + "</span>");
                return true;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //alert(msg);
        }

    });

}

function AvailableFund(obj) {
    var bal = $('[id$=txtcbal]');
    $.ajax({
        url: "ajax/jqueryAjax.aspx/AvailableFund",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                bal.val('0');
            }
            else {
                bal.val(msg.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //alert(msg);
        }

    });

}
function GetInvestmentAmount(obj) {
    var bal = $('[id$=txtAmount]');
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/GetInvestmentAmount",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "!") {
                bal.val('0');
            }
            else {
                bal.val(msg.d);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //            alert(msg);
        }

    });

}

function IsUserExists(obj) {
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/IsUserExists",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "1") {
                $(obj).parent().find("span").remove();
                $(obj).after("<br/><span class='text-danger'>Username Already Exists</span>");
                $(obj).val('');
                return false;
            }
            else {
                $(obj).parent().find("span").remove();
                return true;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);


        },
        failure: function (msg) {
            alert(msg);
        }

    });

}
function IsUserExists1(obj) {
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/IsUserExists",
        type: "POST",
        data: '{"Memberid":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "1") {
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='error'><span class='arrow'></span>Username Already Exists</span>");
                $(obj).text('');
                return false;
            }
            else {
                $(obj).parent().find("span").remove();
                return true;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus);


        },
        failure: function (msg) {
            alert(msg);
        }

    });

}
function IsOperatorExists(obj) {

    if (!isID(obj)) {
        $(obj).parent().find("span").remove();
        $(obj).after("<span class='error'><span class='arrow'></span>field contain only a-z ,0-9 and 4-20 digit long</span>");
        return false;
    }
    $.ajax({
        url: "/ajax/jqueryAjax.aspx/IsOperatorExists",
        type: "POST",
        data: '{"LoginId":"' + $(obj).val() + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (msg) {
            if (msg.d.charAt(0) == "1") {
                $(obj).parent().find("span").remove();
                $(obj).after("<span class='error'><span class='arrow'></span>Login Id Already Exists</span>");
                $(obj).text('');
                return false;
            }
            else {
                $(obj).parent().find("span").remove();
                return true;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //            alert(textStatus);


        },
        failure: function (msg) {
            //            alert(msg);
        }

    });

}

$(document).ready(function () {
    $('[id$=ddlState]').change(function () {
        $('[id$=ddlCity]').html('');
        $('[id$=ddlCity]').append($("<option></option>").val('').html('--Select--'));
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/ajax/jqueryAjax.aspx/BindDistrict",
            data: '{"StateID":"' + $('[id$=ddlState]').val() + '"}',
            dataType: "json",
            success: function (data) {
                $.each(data.d, function (key, value) {
                    $('[id$=ddlCity]').append($("<option></option>").val(value.DistrictId).html(value.DistrictName));
                });
            },
            error: function (result) {
                //alert("Error");
            }
        });
    })
    $(function () {
        if ($('.daymonthpicker').length) {
            $(".daymonthpicker").datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: '-80:+0',
                nextText: "&raquo;",
                prevText: "&laquo;",
                showAnim: "slideDown"
            });
        }
    });
    $(function () {
        if ($('.datepicker').length) {
            $(".datepicker").datepicker({
                nextText: "&raquo;",
                prevText: "&laquo;",
                showAnim: "slideDown"
            });
        }
        //        $('.BeginDate').datepicker({ onSelect: function () {
        //            $('.EndDate').datepicker('option', { minDate: $(this).datepicker('getDate') });
        //        } 
        //        });
        //        $('.EndDate').datepicker({ onSelect: function () {
        //            $('.BeginDate').datepicker('option', { maxDate: $(this).datepicker('getDate') });
        //        } 
        //        });

        //if ($('.BeginDate').length && $('.EndDate').length) {
        //    $(".BeginDate").datepicker({
        //        onClose: function (selectedDate) {
        //            $(".EndDate").datepicker("option", "minDate", selectedDate);
        //        }
        //    }).datepicker("option", "maxDate", $('.EndDate').val());

        //    $(".EndDate").datepicker({
        //        onClose: function (selectedDate) {
        //            $(".BeginDate").datepicker("option", "maxDate", selectedDate);
        //        }
        //    }).datepicker("option", "minDate", $('.BeginDate').val());
        //}
    });
});