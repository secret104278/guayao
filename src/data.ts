import guaData from "./guaData.json";

export const SimpleGuaData = new Map<string, string>([
  ["000", "坤"],
  ["100", "艮"],
  ["010", "坎"],
  ["110", "巽"],
  ["001", "震"],
  ["101", "離"],
  ["011", "兌"],
  ["111", "乾"],
]);

export const GuaData = new Map<string, string>([
  ["000000", "坤"],
  ["100000", "剝"],
  ["010000", "比"],
  ["110000", "觀"],
  ["001000", "豫"],
  ["101000", "晉"],
  ["011000", "萃"],
  ["111000", "否"],

  ["000100", "謙"],
  ["100100", "艮"],
  ["010100", "蹇"],
  ["110100", "漸"],
  ["001100", "小過"],
  ["101100", "旅"],
  ["011100", "咸"],
  ["111100", "遯"],

  ["000010", "師"],
  ["100010", "蒙"],
  ["010010", "坎"],
  ["110010", "渙"],
  ["001010", "解"],
  ["101010", "未濟"],
  ["011010", "困"],
  ["111010", "訟"],

  ["000110", "升"],
  ["100110", "蠱"],
  ["010110", "井"],
  ["110110", "巽"],
  ["001110", "恆"],
  ["101110", "鼎"],
  ["011110", "大過"],
  ["111110", "姤"],

  ["000001", "復"],
  ["100001", "頤"],
  ["010001", "屯"],
  ["110001", "益"],
  ["001001", "震"],
  ["101001", "噬嗑"],
  ["011001", "隨"],
  ["111001", "無妄"],

  ["000101", "明夷"],
  ["100101", "賁"],
  ["010101", "既濟"],
  ["110101", "家人"],
  ["001101", "豐"],
  ["101101", "離"],
  ["011101", "革"],
  ["111101", "同人"],

  ["000011", "臨"],
  ["100011", "損"],
  ["010011", "節"],
  ["110011", "中孚"],
  ["001011", "歸妹"],
  ["101011", "睽"],
  ["011011", "兌"],
  ["111011", "履"],

  ["000111", "泰"],
  ["100111", "大畜"],
  ["010111", "需"],
  ["110111", "小畜"],
  ["001111", "大壯"],
  ["101111", "大有"],
  ["011111", "夬"],
  ["111111", "乾"],
]);

const guaDataObj = Object(guaData);
const raw: [string, string][] = [];
for (const key in guaDataObj) {
  raw.push([key, guaDataObj[key]]);
}
export const GuaDetailMap = new Map<string, string>(raw);
