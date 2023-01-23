import { useEffect, useState } from "react";
import {
  DirectList as Container,
  Message,
  Username,
  DirectItem,
  NewMessage,
} from "./Direct.styled";
import toPersian from "utilities/ToPersian";
import textLimit from "utilities/textLimit";
import ErrorImages from "components/Utilities/ErrorImages";
import { useHistory } from "react-router-dom";
const DirectList = () => {
  const [list] = useState([
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 0,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 0,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 0,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 0,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 12,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 10000,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 100,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 2,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
    {
      image: "https://bit.ly/3vXXGNB",
      name: "mmdzov",
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt aut quisquam eveniet, optio ullam facere sint expedita quos veritatis molestias eaque sapiente earum odio. Explicabo repellat quidem ab dolores necessitatibus!",
      newMessageCount: 1,
      datetime: "1:80",
      token: ~~(Math.random() * 99999999),
    },
  ]);

  const [width, setWidth] = useState(window.innerWidth);
  function getWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", () => getWidth());
    // eslint-disable-nexdt-line react-hooks/exhaustive-deps
  }, []);
  const [size, setSize] = useState("");
  useEffect(() => {
    let d = 0;
    if (width < 240) {
      d = (width / 100) * 8;
    } else if (width < 274) {
      d = (width / 100) * 9;
    } else if (width < 299) {
      d = (width / 100) * 10;
    } else if (width < 349) {
      d = (width / 100) * 10.5;
    } else if (width < 388) {
      d = (width / 100) * 11.6;
    } else if (width < 425) {
      d = (width / 100) * 12.3;
    } else if (width < 450) {
      d = (width / 100) * 13;
    } else if (width < 510) {
      d = (width / 100) * 13.4;
    } else if (width < 667) {
      d = (width / 100) * 13.7;
    } else if (width < 789) {
      d = (width / 100) * 14.5;
    } else if (width > 789) {
      d = (width / 100) * 15;
    }
    setSize(~~d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  const history = useHistory();
  return (
    <Container>
      {list?.map((item) => (
        <DirectItem key={item?.token}>
          <div
            onClick={() => history.push(`/preview/profile/${item?.token}`)}
            style={{ cursor: "pointer" }}
          >
            <ErrorImages person width={45} height={45} src={item?.image} sizeIcon="3rem" />
          </div>
          <div style={{ padding: "0 8px" }}>
            <Username>{item?.name}</Username>
            <Message style={{ whiteSpace: "nowrap" }}>
              {textLimit(item?.msg, size)}
            </Message>
          </div>
          <div
            style={{
              height: "auto",
              textAlign: "left",
              position: "absolute",
              left: 5,
            }}
          >
            <div style={{ fontSize: ".9rem", color: "#5f5f5f" }}>
              {toPersian(item?.datetime + "")}
            </div>
            {item?.newMessageCount > 0 ? (
              <NewMessage
                style={{
                  fontSize: item?.newMessageCount > 99 ? ".8rem" : ".9rem",
                }}
              >
                {item?.newMessageCount > 99 ? (
                  <span>99+</span>
                ) : (
                  toPersian(item?.newMessageCount + "")
                )}
              </NewMessage>
            ) : null}
          </div>
        </DirectItem>
      ))}
    </Container>
  );
};

export default DirectList;
