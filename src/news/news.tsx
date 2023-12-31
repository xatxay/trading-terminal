import {
  formatDate,
  handleClick,
  useExtractData,
  useGetPrice,
} from "../utils/utils";
import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
import {
  ButtonContainer,
  ButtonSize,
  HeaderContainer,
  ImageContainer,
  NewsBody,
  NewsContainer,
  NewsHeadlineStyle,
  NewsImage,
  NewsText,
  NewsVideo,
  Percentage,
  Time,
} from "./newsStyle";
import "../news/imageModal.css";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import "../openPosition/chopper.css";
import chopperNews from "../loginPage/chopperNews.png";

ReactModal.setAppElement("#root");

const NewsButtons: React.FC<{
  coin: string;
  percentage?: number;
  addLogMessage: (message: string) => void;
}> = ({ coin, percentage, addLogMessage }) => {
  const navigate = useNavigate();
  const tradeInfo = {
    buy: "Buy",
    sell: "Sell",
    firstPositionSize: localStorage.getItem("firstPositionSize") || 500,
    secondPositionSize: localStorage.getItem("secondPositionSize") || 1000,
  };
  return (
    <ButtonContainer>
      <ButtonSize
        onClick={async () =>
          handleClick(
            "/submitOrder",
            addLogMessage,
            navigate,
            tradeInfo.sell,
            coin,
            tradeInfo.secondPositionSize
          )
        }
      >
        ${tradeInfo.secondPositionSize}
      </ButtonSize>
      <ButtonSize
        onClick={async () =>
          handleClick(
            "/submitOrder",
            addLogMessage,
            navigate,
            tradeInfo.sell,
            coin,
            tradeInfo.firstPositionSize
          )
        }
      >
        ${tradeInfo.firstPositionSize}
      </ButtonSize>
      <ButtonSize middle>
        {coin}{" "}
        {percentage !== undefined && (
          <Percentage positive={percentage > 0}>{percentage}%</Percentage>
        )}
      </ButtonSize>
      <ButtonSize
        primary
        onClick={async () =>
          handleClick(
            "/submitOrder",
            addLogMessage,
            navigate,
            tradeInfo.buy,
            coin,
            tradeInfo.firstPositionSize
          )
        }
      >
        ${tradeInfo.firstPositionSize}
      </ButtonSize>
      <ButtonSize
        primary
        onClick={async () =>
          handleClick(
            "/submitOrder",
            addLogMessage,
            navigate,
            tradeInfo.buy,
            coin,
            tradeInfo.secondPositionSize
          )
        }
      >
        ${tradeInfo.secondPositionSize}
      </ButtonSize>
    </ButtonContainer>
  );
};

const NewsHeadline: React.FC<{ addLogMessage: (message: string) => void }> = ({
  addLogMessage,
}) => {
  const messages = useExtractData();
  const { ticker, percentage } = useGetPrice(addLogMessage);
  const [tickerPercentage, setTickerPercentage] = useState<{
    [key: string]: number;
  }>({});
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>("");

  const openModal = (img: string) => {
    setActiveImage(img);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log("closing modal");
    setModalIsOpen(false);
  };

  const onImageClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    event.stopPropagation();
    closeModal();
  };

  useEffect(() => {
    setTickerPercentage((prev) => ({ ...prev, [ticker]: percentage }));
  }, [ticker, percentage]);

  if (messages.length === 0) {
    return (
      <div className="chopperNewsPos">
        <img src={chopperNews} alt="chopper news" className="chopperNews" />
      </div>
    );
  }

  return (
    <div>
      {messages.map((message) => (
        <NewsContainer key={message._id}>
          <HeaderContainer>
            <NewsHeadlineStyle>{message.title.toUpperCase()}</NewsHeadlineStyle>
            <Time>{formatDate(message.time)}</Time>
          </HeaderContainer>
          <NewsText>
            <NewsBody
              as="a"
              href={message.link ? message.link : message.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {message.newsHeadline}
            </NewsBody>
          </NewsText>
          <ImageContainer>
            {message.video ? (
              <NewsVideo controls src={message.video} />
            ) : message.image ? (
              <NewsImage
                src={message.image}
                alt="News"
                onClick={() => message.image && openModal(message.image)}
              />
            ) : null}
          </ImageContainer>
          {message.suggestions && message.suggestions.length > 0 ? (
            message.suggestions.map((sugguest) => (
              <NewsButtons
                key={sugguest}
                coin={sugguest || "N/A"}
                percentage={tickerPercentage[sugguest]}
                addLogMessage={addLogMessage}
              />
            ))
          ) : (
            <NewsButtons coin="N/A" addLogMessage={addLogMessage} />
          )}
        </NewsContainer>
      ))}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        shouldCloseOnOverlayClick={true}
        className="modal"
        overlayClassName="overlay"
      >
        {activeImage && (
          <img
            src={activeImage}
            alt="Full Screen"
            onClick={onImageClick}
            className="image"
          />
        )}
      </ReactModal>
    </div>
  );
};

export { NewsHeadline };
