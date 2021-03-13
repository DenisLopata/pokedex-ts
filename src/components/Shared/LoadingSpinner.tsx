import React from "react";
import loadingSpinner from "../../content/images/fidgetSpinnerLoader.gif";


interface ILoadingSpinnerProperties {
    width: number;
    height: number;
}

export const LoadingSpinner = ({width, height}: ILoadingSpinnerProperties) => {

return (
<img
              width={width}
              height={height}
              alt="loading..."
              src={loadingSpinner}
            ></img>

);

};

