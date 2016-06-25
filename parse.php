<?php
$fh = fopen(__DIR__ . '/tainanhousestruc.csv', 'r');
fgetcsv($fh ,2048);
/*
Array
(
    [0] => 構造別代號
    [1] => 構造別名稱
    [2] => 耐用年數（年）
    [3] => 每年折舊率（％）
)
*/
$struc = array();
while($line = fgetcsv($fh ,2048)) {
  if(!empty($line[3])) {
    $struc[$line[0]] = array(
      'name' => $line[1],
      'year' => $line[2],
      'rate' => $line[3],
    );
  }
}

$fh = fopen(__DIR__ . '/tainanhouseapplication.csv', 'r');
fgetcsv($fh ,2048);
/*
Array
(
    [0] => 構造別代號
    [1] => 用途類別代號
    [2] => 用途細類別代號
    [3] => 用途細類別名稱
)
*/
while($line = fgetcsv($fh ,2048)) {
  if(isset($struc[$line[0]])) {
    if(!isset($struc[$line[0]]['app'])) {
      $struc[$line[0]]['app'] = array();
    }
    if(!isset($struc[$line[0]]['app'][$line[1]])) {
      $struc[$line[0]]['app'][$line[1]] = array(
        'options' => '',
      );
    }
    $struc[$line[0]]['app'][$line[1]]['options'] .= $line[3] . ', ';
  }
}

$fh = fopen(__DIR__ . '/tainanhouseprice.csv', 'r');
fgetcsv($fh, 2048);
/*
(
    [0] => 構造別代號
    [1] => 房屋用途類別代號
    [2] => 總層數
    [3] => 房屋標準單價
)
*/

while($line = fgetcsv($fh ,2048)) {
  if(isset($struc[$line[0]]) && isset($struc[$line[0]]['app'][$line[1]])) {
    if(!isset($struc[$line[0]]['app'][$line[1]]['levels'])) {
      $struc[$line[0]]['app'][$line[1]]['levels'] = array();
    }
    $struc[$line[0]]['app'][$line[1]]['levels'][$line[2]] = intval($line[3]);
  }
}

$fh = fopen(__DIR__ . '/tainanhouselevel.csv', 'r');
fgetcsv($fh, 2048);
/*
Array
(
    [0] => 行政區
    [1] => 街路名稱
    [2] => 起迄地點
    [3] => 地段率%
    [4] =>
    [5] =>
    [6] =>
)
*/

$levels = array();
while($line = fgetcsv($fh ,2048)) {
  if(!empty($line[3])) {
    $line[1] = trim(str_replace(array("\n", ' ', "\t", '　'), array('、', '', '', ''), $line[1]));
    $line[2] = trim(str_replace(array("\n", ' ', "\t", '　'), array('、', '', '', ''), $line[2]));
    if(!isset($levels[$line[0]])) {
      $levels[$line[0]] = array();
    }
    if(!isset($levels[$line[0]][$line[1]])) {
      $levels[$line[0]][$line[1]] = array();
    }
    if(!isset($levels[$line[0]][$line[1]][$line[2]])) {
      $levels[$line[0]][$line[1]][$line[2]] = array();
    }
    $levels[$line[0]][$line[1]][$line[2]] = intval($line[3]);
  }
}

file_put_contents(__DIR__ . '/struc.json', json_encode($struc, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
file_put_contents(__DIR__ . '/levels.json', json_encode($levels, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
