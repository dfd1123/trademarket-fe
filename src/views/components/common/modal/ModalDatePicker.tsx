import { useState } from "react";
import {ModalStyle} from "@/views/components/common/modal/ModalTemplate";
import { ModalComponentPropsType } from "@/store/modal/types/modal";
import BasicButton from "@/views/components/common/Button";
import Calendar from "@/views/components/common/Calendar";

interface PropsType extends ModalComponentPropsType {
    initialFocusedDate?: string;
}

const ModalDatePicker = ({initialFocusedDate, nonModal, close, resolve} : PropsType) => {
    const [date, setDate] = useState(null);
    return (
        <ModalStyle close={close} nonModal={nonModal}>
            <Calendar orientation="portrait" initialFocusedDate={initialFocusedDate} onChange={setDate} />
            <div>
                <BasicButton onClick={close}>
                    취소
                </BasicButton>
                <BasicButton onClick={() => resolve && resolve(date)}>
                    확인
                </BasicButton>    
            </div> 
        </ModalStyle>
    );
};

export default ModalDatePicker;