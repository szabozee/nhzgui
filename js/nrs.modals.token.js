var NRS = (function(NRS, $, undefined) {
	$("#generate_token_modal").on("show.bs.modal", function(e) {
		$("#generate_token_website").val("http://");
		$("#generate_token_token").html("").hide();
	});

	NRS.forms.generateToken = function($modal) {
		var url = $.trim($("#generate_token_website").val());

		if (!url || url == "http://") {
			return {
				"error": i18n.t("js.websitereq")
			};
			$("#generate_token_token").html("").hide();
		} else {
			return {};
		}
	}

	NRS.forms.generateTokenComplete = function(response, data) {
		$("#generate_token_modal").find(".error_message").hide();

		if (response.token) {
			$("#generate_token_token").html(i18n.t("js.thegeneratedtoken") + data.website.escapeHTML() + i18n.t("js.is") + response.token.escapeHTML() + "</textarea>").show();
		} else {
			$.growl(i18n.t("js.nogentoken"), {
				"type": "danger"
			});
			$("#generate_token_modal").modal("hide");
		}
	}
	
	return NRS;
}(NRS || {}, jQuery));