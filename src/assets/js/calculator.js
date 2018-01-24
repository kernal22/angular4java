
function changeProfit(now,max,deposit){
	var r = 251;
	var v = Math.round(now*100/max);
	var n = Math.round(r*v/100);
	$('#change_profit circle[stroke-dasharray]').attr('stroke-dasharray',n+','+r);
}
function changeRoi(now,max,deposit){
	var r = 251;
	var v = Math.round(now*100/max);
	var n = Math.round(r*v/100);
	$('#change_roi circle[stroke-dasharray]').attr('stroke-dasharray',n+','+r);
}
function calculator() { 
	var plan = $("#calc_modal").attr('data-plan-content');
	var deposit = $("#deposit").val();
	var percent = [172, 268, 600, 1700, 320, 960];
	var minMoney = [10, 800, 2000, 200, 10000, 5000];
	var maxMoney = [6000, 50000, 30000, 25000, 50000, 30000];
	var referral = 8;
	var principal = ['Back', 'Include'];
	var totalPercent;
	if (plan == "plan_1") {
		$("#p_min").html('$' + minMoney[0]);
		$("#p_max").html('$' + maxMoney[0]);
		$("#p_principal").html(principal[0]);
		if (deposit < minMoney[0]) {
			$("#deposit").val(minMoney[0]);
			deposit = minMoney[0];
		}
		if (deposit > maxMoney[0]) {
			$("#deposit").val(maxMoney[0]);
			deposit = maxMoney[0];
		}
		totalPercent = percent[0];
		changePercent(totalPercent, percent[0]);
		changeProfit(((totalPercent / 100) * deposit).toFixed(2), ((totalPercent / 100) * maxMoney[0]).toFixed(2) + maxMoney[0], deposit);
		changeRoi((((totalPercent / 100) * deposit) / 100 * referral).toFixed(2), (((totalPercent / 100) * maxMoney[0]) / 100 * referral).toFixed(2), deposit);
		$("#roi").html((totalPercent).toFixed(2));
		$("#profit").html(((totalPercent / 100) * deposit).toFixed(2));
		$("#referral").html((deposit / 100 * referral).toFixed(2));
		$("#calc_slider").slider("option", "min", minMoney[0]);
		$("#calc_slider").slider("option", "max", maxMoney[0]);
		$("#calc_slider").slider("option", "value", $("#deposit").val());
	};
	if (plan == "plan_2") {
		$("#p_min").html('$' + minMoney[1]);
		$("#p_max").html('$' + maxMoney[1]);
		$("#p_principal").html(principal[0]);
		if (deposit < minMoney[1]) {
			$("#deposit").val(minMoney[1]);
			deposit = minMoney[1];
		}
		if (deposit > maxMoney[1]) {
			$("#deposit").val(maxMoney[1]);
			deposit = maxMoney[1];
		}
		totalPercent = percent[1];
		changePercent(totalPercent, percent[1]);
		changeProfit(((totalPercent / 100) * deposit).toFixed(2), ((totalPercent / 100) * maxMoney[1]).toFixed(2) + maxMoney[1], deposit);
		changeRoi((((totalPercent / 100) * deposit) / 100 * referral).toFixed(2), (((totalPercent / 100) * maxMoney[1]) / 100 * referral).toFixed(2), deposit);
		$("#roi").html((totalPercent).toFixed(2));
		$("#profit").html(((totalPercent / 100) * deposit).toFixed(2));
		$("#referral").html((deposit / 100 * referral).toFixed(2));
		$("#calc_slider").slider("option", "min", minMoney[1]);
		$("#calc_slider").slider("option", "max", maxMoney[1]);
		$("#calc_slider").slider("option", "value", $("#deposit").val());
	};
	if (plan == "plan_3") {
		$("#p_min").html('$' + minMoney[2]);
		$("#p_max").html('$' + maxMoney[2]);
		$("#p_principal").html(principal[1]);
		if (deposit < minMoney[2]) {
			$("#deposit").val(minMoney[2]);
			deposit = minMoney[2];
		}
		if (deposit > maxMoney[2]) {
			$("#deposit").val(maxMoney[2]);
			deposit = maxMoney[2];
		}
		totalPercent = percent[2];
		changePercent(totalPercent, percent[2]);
		changeProfit(((totalPercent / 100) * deposit).toFixed(2), ((totalPercent / 100) * maxMoney[2]).toFixed(2) + maxMoney[2], deposit);
		changeRoi((((totalPercent / 100) * deposit) / 100 * referral).toFixed(2), (((totalPercent / 100) * maxMoney[2]) / 100 * referral).toFixed(2), deposit);
		$("#roi").html((totalPercent).toFixed(2));
		$("#profit").html(((totalPercent / 100) * deposit).toFixed(2));
		$("#referral").html((deposit / 100 * referral).toFixed(2));
		$("#calc_slider").slider("option", "min", minMoney[2]);
		$("#calc_slider").slider("option", "max", maxMoney[2]);
		$("#calc_slider").slider("option", "value", $("#deposit").val());
	};
	if (plan == "plan_4") {
		$("#p_min").html('$' + minMoney[3]);
		$("#p_max").html('$' + maxMoney[3]);
		$("#p_principal").html(principal[1]);
		if (deposit < minMoney[3]) {
			$("#deposit").val(minMoney[3]);
			deposit = minMoney[3];
		}
		if (deposit > maxMoney[3]) {
			$("#deposit").val(maxMoney[3]);
			deposit = maxMoney[3];
		}
		totalPercent = percent[3];
		changePercent(totalPercent, percent[3]);
		changeProfit(((totalPercent / 100) * deposit).toFixed(2), ((totalPercent / 100) * maxMoney[3]).toFixed(2) + maxMoney[3], deposit);
		changeRoi((((totalPercent / 100) * deposit) / 100 * referral).toFixed(2), (((totalPercent / 100) * maxMoney[3]) / 100 * referral).toFixed(2), deposit);
		$("#roi").html((totalPercent).toFixed(2));
		$("#profit").html(((totalPercent / 100) * deposit).toFixed(2));
		$("#referral").html((deposit / 100 * referral).toFixed(2));
		$("#calc_slider").slider("option", "min", minMoney[3]);
		$("#calc_slider").slider("option", "max", maxMoney[3]);
		$("#calc_slider").slider("option", "value", $("#deposit").val());
	};
	if (plan == "plan_5") {
		$("#p_min").html('$' + minMoney[4]);
		$("#p_max").html('$' + maxMoney[4]);
		$("#p_principal").html(principal[1]);
		if (deposit < minMoney[4]) {
			$("#deposit").val(minMoney[4]);
			deposit = minMoney[4];
		}
		if (deposit > maxMoney[4]) {
			$("#deposit").val(maxMoney[4]);
			deposit = maxMoney[4];
		}
		totalPercent = percent[4];
		changePercent(totalPercent, percent[4]);
		changeProfit(((totalPercent / 100) * deposit).toFixed(2), ((totalPercent / 100) * maxMoney[4]).toFixed(2) + maxMoney[4], deposit);
		changeRoi((((totalPercent / 100) * deposit) / 100 * referral).toFixed(2), (((totalPercent / 100) * maxMoney[4]) / 100 * referral).toFixed(2), deposit);
		$("#roi").html((totalPercent).toFixed(2));
		$("#profit").html(((totalPercent / 100) * deposit).toFixed(2));
		$("#referral").html((deposit / 100 * referral).toFixed(2));
		$("#calc_slider").slider("option", "min", minMoney[4]);
		$("#calc_slider").slider("option", "max", maxMoney[4]);
		$("#calc_slider").slider("option", "value", $("#deposit").val());
	};
	if (plan == "plan_6") {
		$("#p_min").html('$' + minMoney[5]);
		$("#p_max").html('$' + maxMoney[5]);
		$("#p_principal").html(principal[1]);
		if (deposit < minMoney[5]) {
			$("#deposit").val(minMoney[5]);
			deposit = minMoney[5];
		}
		if (deposit > maxMoney[5]) {
			$("#deposit").val(maxMoney[5]);
			deposit = maxMoney[5];
		}
		totalPercent = percent[5];
		changePercent(totalPercent, percent[5]);
		changeProfit(((totalPercent / 100) * deposit).toFixed(2), ((totalPercent / 100) * maxMoney[5]).toFixed(2) + maxMoney[5], deposit);
		changeRoi((((totalPercent / 100) * deposit) / 100 * referral).toFixed(2), (((totalPercent / 100) * maxMoney[5]) / 100 * referral).toFixed(2), deposit);
		$("#roi").html((totalPercent).toFixed(2));
		$("#profit").html(((totalPercent / 100) * deposit).toFixed(2));
		$("#referral").html((deposit / 100 * referral).toFixed(2));
		$("#calc_slider").slider("option", "min", minMoney[5]);
		$("#calc_slider").slider("option", "max", maxMoney[5]);
		$("#calc_slider").slider("option", "value", $("#deposit").val());
	};
}
// (function($) {
// 	$(document).ready(function() {
// 		$('.calc_link').click(function() {
// 			var selectPlan = $(this).attr('data-plan');
// 			var namePlan = $(this).find('.plan_head').html();
// 			$('#calc_modal').arcticmodal({
// 				closeOnEsc: true,
// 				closeOnOverlayClick: true,
// 				openEffect: {
// 					type: 'fade'
// 				},
// 				closeEffect: {
// 					type: 'fade'
// 				},
// 				overlay: {
// 					css: {
// 						background: '#000',
// 						opacity: .7
// 					}
// 				},
// 				beforeOpen: function(data, el) {
// 					var minMoney = [10, 800, 2000, 200, 10000, 5000];
// 					if (selectPlan == "plan_1") { $("#deposit").val(minMoney[0]); };
// 					if (selectPlan == "plan_2") { $("#deposit").val(minMoney[1]); };
// 					if (selectPlan == "plan_3") { $("#deposit").val(minMoney[2]); };
// 					if (selectPlan == "plan_4") { $("#deposit").val(minMoney[3]); };
// 					if (selectPlan == "plan_5") { $("#deposit").val(minMoney[4]); };
// 					if (selectPlan == "plan_6") { $("#deposit").val(minMoney[5]); };
// 					$("#calc_modal").attr('data-plan-content', selectPlan);
// 					$("#plan_title").html(namePlan);
// 					$("#calc_slider").slider({
// 						range: "max",
// 						slide: function( event, ui ) {
// 							$("#deposit" ).val(ui.value);
// 							calculator();
// 						}
// 					});
// 					calculator();
// 				},
// 				afterOpen: function(data, el) {
// 					$("#calc_modal").addClass("visible");
// 				},
// 				afterClose: function(data, el) {
// 					$("#calc_modal").removeClass("visible");
// 					$("#calc_slider").slider("destroy");
// 				},
// 			});
// 		});
// 	});
// } )( jQuery );