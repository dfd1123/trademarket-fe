import {ModalStyle} from "@/views/components/common/modal/ModalTemplate";
import { ModalComponentPropsType } from "@/store/modal/types/modal";

const TestModal = ({nonModal, close, resolve} : ModalComponentPropsType) => {
    return (
        <ModalStyle close={close} nonModal={nonModal}>
            TEST 모달쓰!!!
        </ModalStyle>
    );
};

export default TestModal;