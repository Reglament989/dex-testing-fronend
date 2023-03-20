import { useState } from "react";
import classNames from "classnames";

// Components
import Input from "../Input/Input";

// Icons
import { LineIcon, ArrowIcon } from "./icons";

const TokenSelectInput = ({
  name,
  selectedToken,
  disabledToken,
  onTokenSelect,
  tokenList,
  isWithMaxButton = false,
  onMaxHandler,
  backgroundColor = "bg-app-black",
  readOnly,
  isSelectDisabled = false,
  onInput,
}) => {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  const toggleDropDown = () => {
    if (isDropDownOpened) {
      setIsDropDownOpened(false);
    } else {
      setIsDropDownOpened(true);
    }
  };

  const selectHandleClick = content => {
    onTokenSelect?.(content);
    setIsDropDownOpened(false);
  };

  return (
    <div
      className={"flex flex-row items-center w-full h-16 rounded cursor-pointer " + backgroundColor}
    >
      <div className="flex-none">
        <div
          className={(isDropDownOpened ? "rounded-t-md " : "rounded-md ") + backgroundColor}
          onClick={isSelectDisabled ? undefined : toggleDropDown}
        >
          <div className="flex flex-row h-16 px-5 py-5">
            <div className="flex flex-row">
              <img src={selectedToken.url} alt="" style={selectedToken.style} />
              <div className="mx-1 text-base font-medium">{selectedToken.title}</div>
            </div>
            <div
              className={classNames({
                flex: true,
                "opacity-0": isSelectDisabled,
              })}
            >
              <ArrowIcon />
            </div>
          </div>
          <div className="relative">
            {isDropDownOpened && (
              <div className="absolute inset-0 z-10">
                <div className="fixed inset-0 w-full h-full" onClick={toggleDropDown}></div>
                <div className={"flex flex-col w-64 rounded-b-md " + backgroundColor}>
                  {tokenList.map((content, idx) => {
                    const isDisabled = content.id === disabledToken.id;

                    return (
                      <button
                        key={idx}
                        disabled={isDisabled}
                        type="button"
                        className={
                          backgroundColor +
                          " relative flex flex-row items-center justify-start gap-5 px-5 py-3 disabled:opacity-50"
                        }
                        onClick={() => {
                          selectHandleClick(content);
                        }}
                      >
                        <img className="h-6" src={content.url} style={content.style} alt="" />
                        <div className="text-base font-medium hover:text-app-blue">
                          {content.title}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <LineIcon />
      </div>
      <div className={"flex-auto " + backgroundColor}>
        <Input
          name={name}
          className={"w-full " + backgroundColor}
          readOnly={readOnly}
          onInput={onInput}
        />
      </div>
      {isWithMaxButton && !!onMaxHandler && (
        <button type="button" className="flex mx-5 text-blue-500" onClick={onMaxHandler}>
          Max
        </button>
      )}
    </div>
  );
};

export default TokenSelectInput;
