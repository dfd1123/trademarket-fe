import React, { Attributes, ComponentClass, FunctionComponent, ReactElement } from 'react';

const Component = <P extends {}>({is, props} : {is?: FunctionComponent<P> | ComponentClass<P> | string, props?: any }) : JSX.Element => {
    if(is) return React.createElement(is, props);
    else return (<></>);
}

export default Component;