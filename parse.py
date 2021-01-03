import json
from pathlib import Path

rawGuaNames =  ["坤",
  "剝",
  "比",
  "觀",
  "豫",
  "晉",
  "萃",
  "否",
  "謙",
  "艮",
  "蹇",
  "漸",
  "小過",
  "旅",
  "咸",
  "遯",
  "師",
  "蒙",
  "坎",
  "渙",
  "解",
  "未濟",
  "困",
  "訟",
  "升",
  "蠱",
  "井",
  "巽",
  "恆",
  "鼎",
  "大過",
  "姤",
  "復",
  "頤",
  "屯",
  "益",
  "震",
  "噬嗑",
  "隨",
  "無妄",
  "明夷",
  "賁",
  "既濟",
  "家人",
  "豐",
  "離",
  "革",
  "同人",
  "臨",
  "損",
  "節",
  "中孚",
  "歸妹",
  "睽",
  "兌",
  "履",
  "泰",
  "大畜",
  "需",
  "小畜",
  "大壯",
  "大有",
  "夬",
  "乾"]

raw = Path('yiching.txt').read_text()

guas = []
tmpA = ''
for line in raw.splitlines():
    if len(line) > 0 and line[0].isdigit():
        line = line[4:].lstrip()
        guaName = line.split('，')[0]
        guaYao = '，'.join(line.split('，')[1:])
        
        for name in rawGuaNames:
            if name in guaName:
                if tmpA != '':
                    guas.append(tmpA)
                tmpA = ''
                break
    
    if line != '':
        tmpA += f'{line}\n'
    
guas.append(tmpA)

guaDict = {}
for g in guas:
    guaName = g.split('，')[0]
    guaYao = '，'.join(g.split('，')[1:])

    for name in rawGuaNames:
        if name in guaName:
            guaDict[name] = g

print(json.dumps(guaDict,ensure_ascii=False))