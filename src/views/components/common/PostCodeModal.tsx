import styled from 'styled-components';
import { ModalComponentPropsType } from '@/store/modal/types/modal';
import DaumPostcode from 'react-daum-postcode';
import { FullScreenModalStyle, ModalStyle } from './modal/ModalTemplate';

const PostCodeModal = ({
  className,
  nonModal,
  close,
  resolve,
}: ModalComponentPropsType) => {
  const onCompletePost = (data: any) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    resolve && resolve(data.address);
  };

  return (
    <PostCodeModalStyle close={close} nonModal={nonModal}>
      <DaumPostcode onComplete={onCompletePost} />
    </PostCodeModalStyle>
  );
};

const PostCodeModalStyle = styled(ModalStyle)``;

export default PostCodeModal;
