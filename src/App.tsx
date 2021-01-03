import { Button, ButtonGroup, Typography } from "@material-ui/core";
import { GuaData, GuaDetailMap } from "./data";
import React, { useState } from "react";

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
            if (g.type === YaoType.Yang) {
              return { ...g, type: YaoType.Yin, changed: !g.changed };
            } else if (g.type === YaoType.Yin) {
              return { ...g, type: YaoType.Yang, changed: !g.changed };
            }
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
          <div
            onClick={() => onClickYao(i)}
            style={{ background: yao.changed ? "red" : "black", flex: 1 }}
          ></div>
        );
        break;
      case YaoType.Yin:
        yaoDiv = (
          <div
            onClick={() => onClickYao(i)}
            style={{ flex: 1, display: "flex", flexDirection: "row" }}
          >
            <div
              style={{ background: yao.changed ? "red" : "black", flex: 1 }}
            ></div>
            <div style={{ flex: 0.5 }}></div>
            <div
              style={{ background: yao.changed ? "red" : "black", flex: 1 }}
            ></div>
          </div>
        );
        break;
    }
    guaYaoDivs.push(
      <>
        <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
          {yaoDiv}
          <div
            onClick={() => onClickChangeYao(i)}
            style={{ width: "32px", border: "solid", marginLeft: "32px" }}
          ></div>
        </div>
        <div style={{ flex: 0.3 }}></div>
      </>
    );
  });

  const guaYaoKey = `${guaYao[0].type}${guaYao[1].type}${guaYao[2].type}${guaYao[3].type}${guaYao[4].type}${guaYao[5].type}`;
  const guaYaoName = GuaData.get(guaYaoKey);
  const guaYaoDetail = guaYaoName && GuaDetailMap.get(guaYaoName);

  return (
    <div
      style={{
        padding: "16px",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "4px", height: "30%" }}>
        <div
          style={{
            height: "100%",
            paddingLeft: "15%",
            paddingRight: "15%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {guaYaoDivs}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}></div>
        <ButtonGroup>
          <Button onClick={onClickCuo}>錯</Button>
          <Button onClick={onClickZong}>綜</Button>
          <Button onClick={onClickJiao}>交</Button>
        </ButtonGroup>
      </div>
      <div style={{ flex: 1, overflow: "scroll" }}>
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
  );
}

export default App;
