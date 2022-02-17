import {ModalStyle} from "@/views/components/common/modal/ModalTemplate";
import { ModalComponentPropsType } from "@/store/modal/types/modal";
import BasicButton from "@/views/components/common/Button";
import styled from 'styled-components';

interface PropsType extends ModalComponentPropsType {
  title: string;
}


const KmfModal = ({title, content, subTitle, subContent, isConfirm, nonModal, close, resolve} : ModalComponentPropsType) => {
    return (
        <ModalStyle className="madal-root" close={close} nonModal={nonModal}>
            <ModalContinerStyle>
                <ModalHeaderStyle>{title}</ModalHeaderStyle>
                <ModalContentStyle>
                    {content}
                </ModalContentStyle>
                {
                    (subTitle && subTitle) && (
                        <ModalSubContentWrapper>
                            <div className="subTitle">{ subTitle}</div>
                            <div className="subContent">{ subContent}</div>
                        </ModalSubContentWrapper>
                    )
                }
                <ModalConfirmStyle>
                    <BasicButton className='cancle' onClick={close}>
                        취소
                    </BasicButton>
                    <BasicButton className="confirm" onClick={() => resolve && resolve(true)}>
                        확인
                    </BasicButton>    
                </ModalConfirmStyle> 
            </ModalContinerStyle>
        </ModalStyle>
    );
};

const RootModalStyle = styled(ModalStyle)`
    .madal-root {
        background-color: rgba(0, 0, 0, 0) !important;
        border-radius: 5px !important;
        border: 1px solid red;
    }
    `;

const ModalContinerStyle = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 300px;
    border-radius: 5px;
`;

const ModalHeaderStyle = styled.div`
    height: 58px;
    background-color: #1574BD;
    color: white;
    border-radius: 5px 5px 0 0;
    padding: 16px;
    display: flex;
    align-items: center;
`;

const ModalContentStyle = styled.div`
    font-size: 14px;
    height: 84px;
    color: #353535;
    padding: 16px;
    display: flex;
    align-items: center;
`;

const ModalSubContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #F4F4F4;
    height: 84px;
    padding: 6px;

    .subTitle {
        font-size: 12px;
        /* margin-bottom: 10px; */
    }

    .subContent {
        font-size: 24px;
    }
`;

const ModalConfirmStyle = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > div {
        width: 76px;
        height: 32px;
        display: flex;
        justify-content: center;
        margin-right: 16px;
        border: 0;
        background-color: #1574BD;
    }

    & .cancle {
        background-color: white;
    }

    & button {
        font-weight: 500;
        font-size: 14px;
    }

    & .confirm button {
        color: white;
    }

    & .cancle button {
        color: black;
    }
`;

export default KmfModal;