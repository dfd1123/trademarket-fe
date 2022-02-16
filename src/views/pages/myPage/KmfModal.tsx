import {ModalStyle} from "@/views/components/common/modal/ModalTemplate";
import { ModalComponentPropsType } from "@/store/modal/types/modal";
import BasicButton from "@/views/components/common/Button";

interface PropsType extends ModalComponentPropsType {
  title: string;
}


const KmfModal = ({nonModal, close, resolve} : PropsType) => {
    return (
        <ModalStyle close={close} nonModal={nonModal}>
            {title}
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

export default KmfModal;