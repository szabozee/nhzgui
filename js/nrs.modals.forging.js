var NRS = (function(NRS, $, undefined) {
	NRS.forms.errorMessages.startForging = {
		"5": "You cannot forge. Either your balance is 0 or your account is too new (you must wait a day or so)."
	};

	NRS.forms.startForgingComplete = function(response, data) {
		if ("deadline" in response) {
			$("#forging_indicator").addClass("forging");
			$("#forging_indicator span").html("Forging");
			NRS.isForging = true;
			$.growl(i18n.t("js.forgingstartsuc"), {
				type: "success"
			});
		} else {
			NRS.isForging = false;
			$.growl(i18n.t("js.noforgestarterror"), {
				type: 'danger'
			});
		}
	}

	
	
	NRS.forms.stopForgingComplete = function(response, data) {
		if ($("#stop_forging_modal .show_logout").css("display") == "inline") {
			NRS.logout();
			return;
		}

		$("#forging_indicator").removeClass("forging");
		$("#forging_indicator span").html("Not forging");

		NRS.isForging = false;

		if (response.foundAndStopped) {
			$.growl(i18n.t("js.forgingstopsuc"), {
				type: 'success'
			});
		} else {
			$.growl(i18n.t("js.werentforging"), {
				type: 'danger'
			});
		}
	}

	
	
	$("#forging_indicator").click(function(e) {
		e.preventDefault();

		i18n.t("js.msgsenthtml")
				
		if (NRS.downloadingBlockchain) {
			$.growl(i18n.t("js.noforgebcdown"), {
				"type": "danger"
			});
		} else if (NRS.state.isScanning) {
			$.growl(i18n.t("js.noforgebcrescan"), {
				"type": "danger"
			});
		} else if (!NRS.accountInfo.publicKey) {
			$.growl(i18n.t("js.noforgepublickey"), {
				"type": "danger"
			});
		} else if (NRS.accountInfo.effectiveBalanceNHZ == 0) {
			if (NRS.lastBlockHeight >= NRS.accountInfo.currentLeasingHeightFrom && NRS.lastBlockHeight <= NRS.accountInfo.currentLeasingHeightTo) {
				$.growl(i18n.t("js.noforgeleasedout"), {
					"type": "danger"
				});
			} else {
				$.growl(i18n.t("js.noforgebalance"), {
					"type": "danger"
				});
			}
		} else if ($(this).hasClass("forging")) {
			$("#stop_forging_modal").modal("show");
		} else {
			$("#start_forging_modal").modal("show");
		}
	});

	return NRS;
}(NRS || {}, jQuery));