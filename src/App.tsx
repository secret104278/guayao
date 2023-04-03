import { GuaData, GuaDetailMap } from "./data";
import { isMobileOnly } from "react-device-detect";
import { useWindowSize, useOrientation } from "react-use";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import styles from "./App.module.css";
import Divider from "@material-ui/core/Divider";
import { useState } from "react";

enum YaoType {
  Yin = 0,
  Yang,
}

type Yao = {
  type: YaoType;
  changed: boolean;
};

type GuaYao = [Yao, Yao, Yao, Yao, Yao, Yao];

function App() {
  const { width, height } = useWindowSize();
  const { angle } = useOrientation();
  const isPortrait = isMobileOnly && height > width;

  const [fontSize, setFontSize] = useState<number>(1.4);

  const [guaYao, setGuaYao] = useState<GuaYao>([
    { type: YaoType.Yang, changed: false },
    { type: YaoType.Yang, changed: false },
    { type: YaoType.Yang, changed: false },
    { type: YaoType.Yang, changed: false },
    { type: YaoType.Yang, changed: false },
    { type: YaoType.Yang, changed: false },
  ]);

  const onClickYao = (i: number) => {
    setGuaYao((oldGua) => {
      return oldGua.map((g, j): Yao => {
        if (j === i) {
          if (g.type === YaoType.Yang) {
            return { type: YaoType.Yin, changed: false };
          } else if (g.type === YaoType.Yin) {
            return { type: YaoType.Yang, changed: false };
          }
        }
        return g;
      }) as GuaYao;
    });
  };

  const onClickChangeYao = (i: number) => {
    setGuaYao((oldGua) => {
      return oldGua.map((g, j): Yao => {
        if (j === i) {
          return { ...g, changed: !g.changed };
        }
        return g;
      }) as GuaYao;
    });
  };

  const onClickBian = () => {
    setGuaYao((oldGua) => {
      return oldGua.map((g): Yao => {
        if (g.changed) {
          return g.type === YaoType.Yin
            ? { ...g, type: YaoType.Yang }
            : { ...g, type: YaoType.Yin };
        }
        return g;
      }) as GuaYao;
    });
  };

  const onClickJiao = () => {
    setGuaYao((oldGua) => {
      return [...oldGua.slice(3), ...oldGua.slice(0, 3)] as GuaYao;
    });
  };

  const onClickCuo = () => {
    setGuaYao((oldGua) => {
      return oldGua.map(
        (g): Yao =>
          g.type === YaoType.Yang
            ? { ...g, type: YaoType.Yin }
            : { ...g, type: YaoType.Yang }
      ) as GuaYao;
    });
  };

  const onClickZong = () => {
    setGuaYao((oldGua) => {
      return [oldGua[5], oldGua[4], oldGua[3], oldGua[2], oldGua[1], oldGua[0]];
    });
  };

  const guaYaoDivs: JSX.Element[] = [];

  const guaYaoText = ["上爻", "五爻", "四爻", "三爻", "二爻", "初爻"];

  guaYao.forEach((yao, i) => {
    let yaoDiv: JSX.Element;
    switch (yao.type) {
      case YaoType.Yang:
        yaoDiv = (
          <Button
            className={yao.changed ? styles.yangChanged : styles.yang}
            onClick={() => onClickYao(i)}
          />
        );
        break;
      case YaoType.Yin:
        yaoDiv = (
          <ButtonBase className={styles.yin} onClick={() => onClickYao(i)}>
            <div className={yao.changed ? styles.innerChanged : styles.inner} />
            <div className={styles.space} />
            <div className={yao.changed ? styles.innerChanged : styles.inner} />
          </ButtonBase>
        );
        break;
    }
    guaYaoDivs.push(
      <>
        <div className={styles.yaoContainer}>
          {yaoDiv}
          <Button
            color="default"
            onClick={() => onClickChangeYao(i)}
            className={styles.yaoChanged}
          >
            {guaYaoText[i]}
          </Button>
        </div>
        <div className={styles.yaoSpace}></div>
      </>
    );
  });

  const guaYaoKey = `${guaYao[0].type}${guaYao[1].type}${guaYao[2].type}${guaYao[3].type}${guaYao[4].type}${guaYao[5].type}`;
  const guaYaoName = GuaData.get(guaYaoKey);
  const guaYaoDetail = guaYaoName && GuaDetailMap.get(guaYaoName);

  const guaGraph = (
    <div className={styles.guaYaoWrap}>
      <div className={styles.gua}>{guaYaoDivs}</div>
    </div>
  );

  const guaTitle = <Typography variant="h4">{guaYaoName}</Typography>;
  const guaMenu = (
    <>
      <ButtonGroup
        color="default"
        variant="text"
        aria-label="text primary button group"
        orientation={!isMobileOnly || isPortrait ? "horizontal" : "vertical"}
        style={{ padding: "4px" }}
      >
        <Button onClick={onClickBian}>變卦</Button>
        <Button onClick={onClickCuo}>錯卦</Button>
        <Button onClick={onClickZong}>綜卦</Button>
        <Button onClick={onClickJiao}>交卦</Button>
      </ButtonGroup>
      <ButtonGroup
        color="default"
        size="small"
        aria-label="outlined primary button group"
        orientation={!isMobileOnly || isPortrait ? "horizontal" : "vertical"}
      >
        <Button onClick={() => setFontSize((s) => s + 0.2)}>＋</Button>
        <Button onClick={() => setFontSize((s) => s - 0.2)}>－</Button>
      </ButtonGroup>
    </>
  );

  const lines = guaYaoDetail?.trim().split("\n");

  const guaText = (
    <div className={styles.guaText}>
      {lines?.map((line, i) => (
        <>
          <Typography
            variant="body1"
            style={{
              fontSize: `${fontSize}rem`,
              marginBottom: "0.15em",
              marginTop: "0.15em",
              marginLeft: "0.65em",
            }}
          >
            {line}
          </Typography>
          {i !== lines?.length ? <Divider variant="middle" /> : null}
        </>
      ))}
    </div>
  );

  if (isPortrait)
    return (
      <div className={styles.app}>
        <div className={styles.root}>
          {guaGraph}
          <div className={styles.mmiddle}>
            {guaTitle}
            <div className={styles.fillSpace}></div>
            {guaMenu}
          </div>
          {guaText}
        </div>
      </div>
    );
  if (isMobileOnly)
    return (
      <div className={styles.app}>
        <div className={styles.root} style={{ flexDirection: "row" }}>
          <div
            className={styles.dmiddle}
            style={{
              marginLeft:
                angle === 90 ? "calc(env(safe-area-inset-left))" : undefined,
              flexWrap: "nowrap",
            }}
          >
            {guaTitle}
            {guaMenu}
          </div>
          <div
            style={{
              width: "240px",
            }}
          >
            {guaGraph}
          </div>
          {guaText}
        </div>
      </div>
    );
  else
    return (
      <div className={styles.app}>
        <div className={styles.root} style={{ flexDirection: "row" }}>
          <div
            style={{
              flexDirection: "column",
              width: isMobileOnly ? undefined : "260px",
              overflow: "scroll",
            }}
          >
            {guaGraph}
            <div className={styles.dmiddle}>
              {guaTitle}
              {guaMenu}
            </div>
          </div>
          {guaText}
        </div>
      </div>
    );
}

export default App;
