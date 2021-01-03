import { GuaData, GuaDetailMap } from "./data";

import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import styles from "./App.module.css";
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
      return oldGua.map(
        (g, j): Yao => {
          if (j === i) {
            if (g.type === YaoType.Yang) {
              return { type: YaoType.Yin, changed: false };
            } else if (g.type === YaoType.Yin) {
              return { type: YaoType.Yang, changed: false };
            }
          }
          return g;
        }
      ) as GuaYao;
    });
  };

  const onClickChangeYao = (i: number) => {
    setGuaYao((oldGua) => {
      return oldGua.map(
        (g, j): Yao => {
          if (j === i) {
            return { ...g, changed: !g.changed };
          }
          return g;
        }
      ) as GuaYao;
    });
  };

  const onClickBian = () => {
    setGuaYao((oldGua) => {
      return oldGua.map(
        (g): Yao => {
          if (g.changed) {
            return g.type === YaoType.Yin
              ? { ...g, type: YaoType.Yang }
              : { ...g, type: YaoType.Yin };
          }
          return g;
        }
      ) as GuaYao;
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
          <IconButton
            color="default"
            onClick={() => onClickChangeYao(i)}
            className={styles.yaoChanged}
          >
            <StarIcon />
          </IconButton>
        </div>
        <div className={styles.yaoSpace}></div>
      </>
    );
  });

  const guaYaoKey = `${guaYao[0].type}${guaYao[1].type}${guaYao[2].type}${guaYao[3].type}${guaYao[4].type}${guaYao[5].type}`;
  const guaYaoName = GuaData.get(guaYaoKey);
  const guaYaoDetail = guaYaoName && GuaDetailMap.get(guaYaoName);

  return (
    <div className={styles.app}>
      <div className={styles.root}>
        <div className={styles.guaYaoWrap}>
          <div className={styles.gua}>{guaYaoDivs}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Typography variant="h4">{guaYaoName}</Typography>
          <div className={styles.fillSpace}></div>
          <ButtonGroup variant="text" color="default" size="large">
            <Button onClick={onClickBian}>變卦</Button>
            <Button onClick={onClickCuo}>錯卦</Button>
            <Button onClick={onClickZong}>綜卦</Button>
            <Button onClick={onClickJiao}>交卦</Button>
          </ButtonGroup>
        </div>
        <div style={{ flex: 1, overflow: "scroll", margin: "8px" }}>
          <Typography variant="body1" gutterBottom>
            {guaYaoDetail?.split("\n").map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default App;
