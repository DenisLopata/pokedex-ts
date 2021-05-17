import React from "react";
import loadingSpinner from "../../content/images/fidgetSpinnerLoader.gif";


interface ILoadingSpinnerProperties {
    width: number;
    height: number;
    subText: string;
}

export const LoadingSpinner = ({width, height, subText}: ILoadingSpinnerProperties) => {

return (
  <div>
<img
              width={width}
              height={height}
              alt="loading..."
              src={loadingSpinner}
            ></img>
            <div>{subText}</div>
</div>
);

};

