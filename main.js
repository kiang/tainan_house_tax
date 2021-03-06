var struc, levels;
var thisYear = new Date().getFullYear() - 1911;
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
    var year = parseInt($('#year').val()); //年
    if(year > thisYear) {
      year = thisYear;
      $('#year').val(thisYear);
    }
    var month = parseInt($('#month').val()); //月
    var area = parseFloat($('#area').val());
    var strucBase = $('#strucBase').val();
    var strucLevel = parseInt($('#strucLevel').val()); //標準單價
    var taxType = parseFloat($('#taxType').val()); //房屋稅類型
    var level3 = $('#level3').val(); //街路等級調整率(地段率)
    var rateYear = 105 - year;
    if(month < 7) {
      rateYear -= 1;
    }
    var tax = getTax(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
    var showDetail = $('#showDetail').prop('checked');
    if(!isNaN(tax)) {
      var result = '105 年房屋稅 ' + tax;
      if(showDetail) {
        result += getDetail(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
      }

      rateYear += 1;
      tax = getTax(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
      if(year > 90 || (year == 90 && month > 6)) {
        result += '<br />106 年房屋稅 ' + parseInt(tax * 1.54) + ' (調漲前 ' + tax + ')';
        if(showDetail) {
          result += getDetail(strucLevel * 1.54, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      } else {
        result += '<br />106 年房屋稅 ' + tax;
        if(showDetail) {
          result += getDetail(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      }

      rateYear += 1;
      tax = getTax(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
      if(year > 90 || (year == 90 && month > 6)) {
        result += '<br />107 年房屋稅 ' + parseInt(tax * 1.65) + ' (調漲前 ' + tax + ')';
        if(showDetail) {
          result += getDetail(strucLevel * 1.65, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      } else {
        result += '<br />107 年房屋稅 ' + tax;
        if(showDetail) {
          result += getDetail(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      }
      rateYear += 1;
      tax = getTax(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
      if(year > 90 || (year == 90 && month > 6)) {
        result += '<br />108 年房屋稅 ' + parseInt(tax * 1.81) + ' (調漲前 ' + tax + ')';
        if(showDetail) {
          result += getDetail(strucLevel * 1.81, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      } else {
        result += '<br />108 年房屋稅 ' + tax;
        if(showDetail) {
          result += getDetail(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      }
      rateYear += 1;
      tax = getTax(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
      if(year > 90 || (year == 90 && month > 6)) {
        result += '<br />109 年房屋稅 ' + parseInt(tax * 1.81) + ' (調漲前 ' + tax + ')';
        if(showDetail) {
          result += getDetail(strucLevel * 1.81, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      } else {
        result += '<br />109 年房屋稅 ' + tax;
        if(showDetail) {
          result += getDetail(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      }

      rateYear += 1;
      tax = getTax(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
      if(year > 90 || (year == 90 && month > 6)) {
        result += '<br />110 年房屋稅 ' + parseInt(tax * 1.81) + ' (調漲前 ' + tax + ')';
        if(showDetail) {
          result += getDetail(strucLevel * 1.81, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      } else {
        result += '<br />110 年房屋稅 ' + tax;
        if(showDetail) {
          result += getDetail(strucLevel, area, rateYear, struc[strucBase].rate, level3, taxType);
        }
      }

      $('#result').html(result);
    } else {
      $('#result').html('');
    }
  });
})

function getTax(strucLevel, area, rateYear, rate, level3, taxType) {
  return parseInt(strucLevel * area * (1 - (rateYear * rate / 100)) * (level3 / 100) * (taxType / 100));
}

function getDetail(strucLevel, area, rateYear, rate, level3, taxType) {
  strucLevel = parseInt(strucLevel);
  return '<br /><small>' + strucLevel + '[標準單價] X ' + area + '[面積] X (1 - (' + rateYear + '[折舊年數] X ' + rate + ' / 100[折舊率])) X (' + level3 + ' / 100)[街路等級調整率] X (' + taxType + ' / 100)[房屋稅稅率]</small>';
}
