function rowClick(r) {
	if (r.cells[0].childNodes[1].checked) {
		r.cells[0].childNodes[1].checked = false;
		r.className = "UnselectedRow";
	} else {
		r.cells[0].childNodes[1].checked = true;
		r.className = "SelectedRow";
	}

	chk = document.getElementsByName("chk");
	for (i=0; i < chk.length; i++){
		if (!chk[i].checked) {
			document.getElementById("chkall").checked = false;
			break;
		}
	}

	if (i == chk.length)
		document.getElementById("chkall").checked = true;
}

function selectAll() {
	chk = document.getElementsByName("chk");
	for (i=0; i < chk.length; i++) {
		chk[i].checked = document.getElementById("chkall").checked;
		if (chk[i].checked) chk[i].parentNode.parentNode.className = "SelectedRow";
		else chk[i].parentNode.parentNode.className = "UnselectedRow";
	}
}

function chkClick(chk) {
	chk.checked = !chk.checked;
}
