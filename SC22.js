

var S = [];
var delt_L = [];
var delt_a = [];
var delt_b = [];
var W_dlin_r = [];

function App_data() {
	
	shL1 = document.getElementById('SHL1').value;
	sha1 = document.getElementById('SHa1').value;
	shb1 = document.getElementById('SHb1').value;

	smL1 = document.getElementById('SML1').value;
	sma1 = document.getElementById('SMa1').value;
	smb1 = document.getElementById('SMb1').value;

	lvL1 = document.getElementById('LVL1').value;
	lva1 = document.getElementById('LVa1').value;
	lvb1 = document.getElementById('LVb1').value;

	var SH_SM = Math.sqrt( Math.pow(shL1-smL1, 2) + Math.pow(sha1-sma1, 2) + Math.pow(shb1-smb1, 2) );
	var SM_LV = Math.sqrt( Math.pow(smL1-lvL1, 2) + Math.pow(sma1-lva1, 2) + Math.pow(smb1-lvb1, 2) );
	var SH_LV = Math.sqrt( Math.pow(shL1-lvL1, 2) + Math.pow(sha1-lva1, 2) + Math.pow(shb1-lvb1, 2) );

	var St = ((SH_SM/SH_LV + (1 - SM_LV/SH_LV))/2);

	//console.log( St );

	var dop_w = document.getElementById('dopusk').value;
	
	var StL = Number(lvL1) - (lvL1-shL1) * (1-St) ;
	
	var Sta = Number(lva1) - (lva1-sha1) * (1-St) ;

	var Stb = Number(lvb1) - (lvb1-shb1) * (1-St) ;

	//console.log(StL, Sta, Stb);

	var St_SM = Math.sqrt( Math.pow(StL-smL1, 2) + Math.pow(Sta-sma1, 2) + Math.pow(Stb-smb1, 2) );
	//console.log('St_SM = ' + St_SM);
	if ( (St_SM/SH_LV) >= (dop_w/100) ) {
		alert('Слишком большое отклонение (' + (St_SM/SH_LV)*100 +'%)')
	} else {
		S[S.length] = St;
		//console.log( S );
		delt_L[delt_L.length] = (StL - smL1)/SH_LV;
		delt_a[delt_a.length] = (Sta - sma1)/SH_LV;
		delt_b[delt_b.length] = (Stb - smb1)/SH_LV;
		W_dlin_r[W_dlin_r.length] = SM_LV/SH_LV; 



		var summ = 0;
		var	sumL = 0;
		var	suma = 0;
		var	sumb = 0;
		var W_dlin = 0;
		for (var i = 0 ; i <= S.length - 1; i++) {
			summ += S[i];
			sumL += delt_L[i];
			suma += delt_a[i];
			sumb += delt_b[i];
			W_dlin += W_dlin_r[i];
		}
		W = summ / S.length;
		dL = sumL / delt_L.length;
		//console.log( 'сумма L = ' + sumL );
		//console.log( 'dL = ' + dL );
		dA = suma / delt_a.length;
		dB = sumb / delt_b.length;
		W_dl = W_dlin / W_dlin_r.length;
		//console.log( W );
		return S, W, dL, dA, dB, delt_L, delt_a, delt_b, W_dl, W_dlin_r
	}
}

function Raschet() {
	var shL2 = document.getElementById('SHL2');
	var sha2 = document.getElementById('SHa2');
	var shb2 = document.getElementById('SHb2');

	var smL2 = document.getElementById('SML2').value;
	var sma2 = document.getElementById('SMa2').value;
	var smb2 = document.getElementById('SMb2').value;

	var lvL2 = document.getElementById('LVL2').value;
	var lva2 = document.getElementById('LVa2').value;
	var lvb2 = document.getElementById('LVb2').value;

	var shL3 = document.getElementById('SHL3').value;
	var sha3 = document.getElementById('SHa3').value;
	var shb3 = document.getElementById('SHb3').value;

	var smL3 = document.getElementById('SML3');
	var sma3 = document.getElementById('SMa3');
	var smb3 = document.getElementById('SMb3');

	var lvL3 = document.getElementById('LVL3').value;
	var lva3 = document.getElementById('LVa3').value;
	var lvb3 = document.getElementById('LVb3').value;
	//console.log('asdasfa')
	
	var ddL = dL * Math.sqrt(Math.pow(lvL3 - shL3, 2) + Math.pow(lva3 - sha3, 2) + Math.pow(lvb3 - shb3, 2));
	var dda = dA * Math.sqrt(Math.pow(lvL3 - shL3, 2) + Math.pow(lva3 - sha3, 2) + Math.pow(lvb3 - shb3, 2));
	var ddb = dB * Math.sqrt(Math.pow(lvL3 - shL3, 2) + Math.pow(lva3 - sha3, 2) + Math.pow(lvb3 - shb3, 2));
	console.log('dL = '+ddL+'  dA = '+ dda+'  dB = '+ ddb);
	var d2L = dL * Math.sqrt(Math.pow(lvL2 - smL2, 2) + Math.pow(lva2 - sma2, 2) + Math.pow(lvb3 - smb2, 2))/W_dl;
	var d2a = dA * Math.sqrt(Math.pow(lvL2 - smL2, 2) + Math.pow(lva2 - sma2, 2) + Math.pow(lvb3 - smb2, 2))/W_dl;
	var d2b = dB * Math.sqrt(Math.pow(lvL2 - smL2, 2) + Math.pow(lva2 - sma2, 2) + Math.pow(lvb3 - smb2, 2))/W_dl;
	console.log('dL = '+ddL+'  dA = '+ dda+'  dB = '+ ddb);

	if (!document.getElementById('deltaL').checked) {
		ddL = 0;
		d2L = 0;
	};
	if (!document.getElementById('deltaa').checked) {
		dda = 0;
		d2a = 0;
	};
	if (!document.getElementById('deltab').checked) {
		ddb = 0;
		d2b = 0;
	};

	var asdL = (Number(lvL2) - ((lvL2-smL2) / (1-W)) ).toFixed(2);
	var asda = (Number(lva2) - ((lva2-sma2) / (1-W)) ).toFixed(2);
	var asdb = (Number(lvb2) - ((lvb2-smb2) / (1-W)) ).toFixed(2);

	var adsL = (Number(lvL3) - (lvL3-shL3) * (1-W) ).toFixed(2);
	var adsa = (Number(lva3) - (lva3-sha3) * (1-W) ).toFixed(2);
	var adsb = (Number(lvb3) - (lvb3-shb3) * (1-W) ).toFixed(2);

	

	//console.log(ddL);
	shL2.value = (Number(asdL) + d2L/(1-W)).toFixed(2);
	sha2.value = (Number(asda) + d2a/(1-W)).toFixed(2);
	shb2.value = (Number(asdb) + d2b/(1-W)).toFixed(2);

	smL3.value = (Number(adsL) - Number(ddL)).toFixed(2);
	sma3.value = (Number(adsa) - Number(dda)).toFixed(2);
	smb3.value = (Number(adsb) - Number(ddb)).toFixed(2);
}
function Reset_w() {
	S = [];
	delt_L = [];
	delt_a = [];
	delt_b = [];
	W_dlin_r = [];
	return S, delt_L, delt_a, delt_b, W_dlin_r
	//console.log('reset' + S)
	}
	var set_f = [];	
function iter_reset()  {
		return set_f = []		
	}

function iter_plus()	{
	if (set_f.length < 1) {
		set_f[0] = document.getElementById('SHL4').value;
		set_f[1] = document.getElementById('SHa4').value;
		set_f[2] = document.getElementById('SHb4').value;
		set_f[3] = document.getElementById('apparat_1').value;
		//console.log(set_f)
	} else {
		
		let set_fL = Number(document.getElementById('SHL4').value);		
		let set_fa = Number(document.getElementById('SHa4').value);
		let set_fb = Number(document.getElementById('SHb4').value);
		let set_fW = Number(document.getElementById('apparat_1').value);
		console.log( '==========' );
		set_f[0] = (set_f[0] * set_f[3] + set_fL * set_fW) / (Number(set_f[3]) + Number(set_fW));
		set_f[1] = (set_f[1] * set_f[3] + set_fa * set_fW) / (Number(set_f[3]) + Number(set_fW));
		set_f[2] = (set_f[2] * set_f[3] + set_fb * set_fW) / (Number(set_f[3]) + Number(set_fW));
		set_f[3] = Number(set_f[3]) + Number(set_fW);
	}
	
	document.getElementById('SML4').value = (Number(set_f[0])).toFixed(2);
	document.getElementById('SMa4').value = (Number(set_f[1])).toFixed(2);
	document.getElementById('SMb4').value = (Number(set_f[2])).toFixed(2);
	console.log( set_f[3] );
	console.log(set_f[3]/document.getElementById('apparat_all').value);
	if (Number(set_f[3])/Number(document.getElementById('apparat_all').value) <= 1) {
	//shL2.value = (Number(lvL2) - ((lvL2-smL2) / (1-W))).toFixed(2);
	document.getElementById('LVL4').value = (Number(document.getElementById('SML4').value) + (document.getElementById('SHL2').value - document.getElementById('SML4').value) / (1 - set_f[3]/document.getElementById('apparat_all').value) ).toFixed(2);
	document.getElementById('LVa4').value = (Number(document.getElementById('SMa4').value) + (document.getElementById('SHa2').value - document.getElementById('SMa4').value) / (1 - set_f[3]/document.getElementById('apparat_all').value) ).toFixed(2);
	document.getElementById('LVb4').value = (Number(document.getElementById('SMb4').value) + (document.getElementById('SHb2').value - document.getElementById('SMb4').value) / (1 - set_f[3]/document.getElementById('apparat_all').value) ).toFixed(2);
	}
	
	}

function lvl_down() 	{
	document.getElementById('LVL2').value = document.getElementById('LVL1').value;
	document.getElementById('LVa2').value = document.getElementById('LVa1').value;
	document.getElementById('LVb2').value = document.getElementById('LVb1').value;
	document.getElementById('LVL3').value = document.getElementById('LVL1').value;
	document.getElementById('LVa3').value = document.getElementById('LVa1').value;
	document.getElementById('LVb3').value = document.getElementById('LVb1').value
	}   
function shr_up() 	{
	document.getElementById('SHL3').value = document.getElementById('SML4').value;
	document.getElementById('SHa3').value = document.getElementById('SMa4').value;
	document.getElementById('SHb3').value = document.getElementById('SMb4').value;
	Raschet()
	} 


document.getElementById('trbtn').onclick = App_data;
document.getElementById('trbtn2').onclick = Raschet;
document.getElementById('trbtn3').onclick = Reset_w;
document.getElementById('inter_p').onclick = iter_plus;
document.getElementById('iter_res').onclick = iter_reset;
document.getElementById('but_ac_1').onclick = lvl_down;
document.getElementById('but_ac_2').onclick = shr_up

















