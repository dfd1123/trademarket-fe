import {ModalStyle} from "@/views/components/common/modal/ModalTemplate";
import { ModalComponentPropsType } from "@/store/modal/types/modal";
import BasicButton from "@/views/components/common/Button";

const TestModal = ({nonModal, close, resolve} : ModalComponentPropsType) => {
    return (
        <ModalStyle close={close} nonModal={nonModal}>
            TEST 모달쓰!!!
            <div>
                <BasicButton onClick={close}>
                    취소
                </BasicButton>
                <BasicButton onClick={() => resolve && resolve(true)}>
                    확인
                </BasicButton>    
            </div> 
        </ModalStyle>
    );
};

export default TestModal;