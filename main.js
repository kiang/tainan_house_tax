var struc, levels;
$(function() {
  $.getJSON('struc.json', {}, function(r) {
    struc = r;
    var options = '';
    for(k in struc) {
      options += '<option value="' + k + '">' + struc[k]['name'] + '</option>';
    }
    $('#strucBase').html(options).trigger('change');
  });
  $.getJSON('levels.json', {}, function(r) {
    levels = r;
    var options = '';
    for(k in levels) {
      options += '<option value="' + k + '">' + k + '</option>';
    }
    $('#level1').html(options).trigger('change');
  });
  $('#strucBase').change(function() {
    var selected = $(this).val();
    var options = '';
    for(k in struc[selected].app) {
      options += '<option value="' + k + '">' + struc[selected].app[k].options + '</option>';
    }
    $('#strucApp').html(options).trigger('change');
  });
  $('#strucApp').change(function() {
    var base = $('#strucBase').val();
    var selected = $(this).val();
    var options = '';
    for(k in struc[base].app[selected].levels) {
      options += '<option value="' + struc[base].app[selected].levels[k] + '">' + k + '</option>';
    }
    $('#strucLevel').html(options).trigger('change');
  });
  $('#level1').change(function() {
    var selected = $(this).val();
    var options = '';
    for(k in levels[selected]) {
      options += '<option value="' + k + '">' + k + '</option>';
    }
    $('#level2').html(options).trigger('change');
  });
  $('#level2').change(function() {
    var level1 = $('#level1').val();
    var selected = $(this).val();
    var options = '';
    for(k in levels[level1][selected]) {
      options += '<option value="' + levels[level1][selected][k] + '">' + k + '</option>';
    }
    $('#level3').html(options).trigger('change');
  });
  $('.updateResult').change(function() {
    var year = parseInt($('#year').val());
    var month = parseInt($('#month').val());
    var area = parseFloat($('#area').val());
    var strucBase = $('#strucBase').val();
    var strucLevel = parseInt($('#strucLevel').val());
    var taxType = parseFloat($('#taxType').val());
    var level3 = $('#level3').val();
    var rateYear = 105 - year;
    if(month < 7) {
      rateYear -= 1;
    }
    var tax = strucLevel * area * (1 - (rateYear * struc[strucBase].rate / 100)) * (level3 / 100) * (taxType / 100);
    var tax1, tax2;
    tax = parseInt(tax);
    var result = '105 年房屋稅 ' + tax;
    rateYear += 1;
    tax1 = strucLevel * 1.54 * area * (1 - (rateYear * struc[strucBase].rate / 100)) * (level3 / 100) * (taxType / 100);
    tax1 = parseInt(tax1);
    tax2 = strucLevel * area * (1 - (rateYear * struc[strucBase].rate / 100)) * (level3 / 100) * (taxType / 100);
    tax2 = parseInt(tax2);
    if(year > 90 || (year == 90 && month > 6)) {
      result += '<br />106 年房屋稅 ' + tax1 + ' (調漲前 ' + tax2 + ')';
    } else {
      result += '<br />106 年房屋稅 ' + tax2;
    }

    rateYear += 1;
    tax1 = strucLevel * 1.65 * area * (1 - (rateYear * struc[strucBase].rate / 100)) * (level3 / 100) * (taxType / 100);
    tax1 = parseInt(tax1);
    tax2 = strucLevel * area * (1 - (rateYear * struc[strucBase].rate / 100)) * (level3 / 100) * (taxType / 100);
    tax2 = parseInt(tax2);
    if(year > 90 || (year == 90 && month > 6)) {
      result += '<br />107 年房屋稅 ' + tax1 + ' (調漲前 ' + tax2 + ')';
    } else {
      result += '<br />107 年房屋稅 ' + tax2;
    }
    rateYear += 1;
    tax1 = strucLevel * 1.81 * area * (1 - (rateYear * struc[strucBase].rate / 100)) * (level3 / 100) * (taxType / 100);
    tax1 = parseInt(tax1);
    tax2 = strucLevel * area * (1 - (rateYear * struc[strucBase].rate / 100)) * (level3 / 100) * (taxType / 100);
    tax2 = parseInt(tax2);
    if(year > 90 || (year == 90 && month > 6)) {
      result += '<br />108 年以後房屋稅 ' + tax1 + ' (調漲前 ' + tax2 + ')';
    } else {
      result += '<br />108 年以後房屋稅 ' + tax2;
    }

    $('#result').html(result);
  });
})
