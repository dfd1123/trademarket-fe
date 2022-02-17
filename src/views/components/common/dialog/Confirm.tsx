import { DialogComponentPropsType } from "@/store/modal/types/dialog";
import styled from "styled-components";
import BasicButton from "@/views/components/common/Button";
import DialogTemplete from "@/views/components/common/dialog/DialogTemplete";

const Confirm = ({title, msg, button, resolve}: DialogComponentPropsType) => {
    const handleButtonClick = (value : boolean) => {
        if(resolve) resolve(value);
    };

    return (
        <DialogTemplete>
           {title ? (<strong className="title">{title}</strong>):''}
            <p>{msg}</p>
            <div className="btn-holder">
                <BasicButton className="btn-yes" onClick={() => handleButtonClick(true)}>{button.yes}</BasicButton>
                <BasicButton className="btn-no" onClick={() => handleButtonClick(false)}>{button.no}</BasicButton>
            </div>
        </DialogTemplete>
    );
}

const AlertStyle = styled.div`

`;

export default Confirm;