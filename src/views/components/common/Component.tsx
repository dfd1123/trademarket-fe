import React, { Attributes, ComponentClass, FunctionComponent, ReactElement } from 'react';

const Component = <P extends {}>({is, props} : {is : FunctionComponent<P> | ComponentClass<P> | string, props?: Attributes & P | null }) : JSX.Element => {
    console.log(React.createElement(is))
    if(is) return React.createElement(is);
    else return (<>awdaw</>);
}

export default Component;