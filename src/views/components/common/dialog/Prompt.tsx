import { useState } from "react";
import { DialogComponentPropsType } from "@/store/modal/types/dialog";
import styled from "styled-components";
import BasicButton from "@/views/components/common/Button";
import TextInput from "@/views/components/common/input/TextInput";
import DialogTemplete from "@/views/components/common/dialog/DialogTemplete";

const Prompt = ({title, msg, value, button, resolve}: DialogComponentPropsType) => {
    const [input, setInput] = useState<string | number>(value ?? '');
    const handleButtonClick = (value : string | number | boolean) => {
        if(resolve) resolve(value);
    };

    return (
        <DialogTemplete>
           {title ? (<strong className="title">{title}</strong>):''}
            <p>{msg}</p>
            <div>
                <TextInput value={input} onChange={setInput} />
            </div>
            <div className="btn-holder">
                <BasicButton className="btn-yes" onClick={() => handleButtonClick(input)}>{button.yes}</BasicButton>
                <BasicButton className="btn-no" onClick={() => handleButtonClick(false)}>{button.no}</BasicButton>
            </div>
        </DialogTemplete>
    );
}

const AlertStyle = styled.div`

`;

export default Prompt;